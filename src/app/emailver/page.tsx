import Link from 'next/link'

export default function EmailVerPage() {
    return (
        <>
            <h1 className='text-5xl text-center'>
                Verify your email then log in!
            </h1>
            <Link className='text-center text-3xl hover:text-purple-500' href='/login'>Log In</Link>
        </>
    )
}