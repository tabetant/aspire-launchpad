'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@/db/client'
import Link from 'next/link'

export default function LoginForm() {
    const inputsSchema = z.object({
        email: z.string().email('Invalid Email Address'),
        password: z.string().min(8, 'Password are at least 8 characters'),
    })

    type Inputs = z.infer<typeof inputsSchema>;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(inputsSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { email, password } = data;
        const { error } = await supabase().auth.signInWithPassword({
            email,
            password
        });
        if (error) {
            // error message
        }
        // success action + message
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type='email' placeholder='Enter email address' />
            <p>{errors.email?.message}</p>
            <input type='password' placeholder='Enter password' />
            <p>{errors.password?.message}</p>
            <Link className='hover:text-purple-500' href='/signup'>Not a member? Sign Up!</Link>
        </form>
    )
}