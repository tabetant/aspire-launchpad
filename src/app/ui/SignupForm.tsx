'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@/db/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignupForm() {
    const router = useRouter();
    const inputsSchema = z.object({
        email: z.string().email('Invalid Email Addres'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
    });

    type Inputs = z.infer<typeof inputsSchema>;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<Inputs>({
        resolver: zodResolver(inputsSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { email, password } = data;
        const { error } = await supabase().auth.signUp({
            email,
            password
        });
        if (error) {
            // error message
        }
        router.push('/emailver');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type='email' placeholder='Enter your email address' />
            <p>{errors.email?.message}</p>
            <input type='password' placeholder='Enter your password' />
            <p>{errors.password?.message}</p>
            <Link className='hover:text-purple:500' href='/login'>Already a member? Log In!</Link>
        </form>
    )
}
