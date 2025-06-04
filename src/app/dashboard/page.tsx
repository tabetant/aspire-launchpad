'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { supabase } from '@/db/client';

export default function Dashboard() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        supabase().auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                router.push('/login');
            } else {
                setEmail(session.user.email as string);
            }
        })
        setLoading(false);
    }, [])

    if (loading) return <p>Loading...</p>;

    return (
        <h1>Welcome to the dashboard</h1>
    )
}