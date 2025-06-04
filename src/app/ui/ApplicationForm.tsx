'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export default function AppForm() {
    const inputsSchema = z.object({
        title: z.string().min(1, 'This is required'),
        company: z.string().min(1, 'This is required'),
        status: z.enum(['applied', 'interview', 'offer', 'rejected']),
        dateApplied: z.string().datetime(),
        notes: z.string(),
        resumeUrl: z.string().min(1, 'This is required'),
    })

    type Inputs = z.infer<typeof inputsSchema>

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(inputsSchema),
        defaultValues: {
            title: '',
            company: '',
            status: 'applied',
            dateApplied: new Date().toISOString(),
            notes: '',
            resumeUrl: '/',
        }
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => {

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('title')} type='text' />
            <input {...register('company')} type='text' />
            <select {...register('status')}>
                <option value='applied'>Applied</option>
                <option value='interview'>Interview</option>
                <option value='offer'>Offer</option>
                <option value='rejected'>Rejected</option>
            </select>
            <input type='date' {...register('dateApplied')} />
            <textarea {...register('notes')} placeholder='Type notes here' />
            <input name='resume' type='file' />
        </form>
    )
}