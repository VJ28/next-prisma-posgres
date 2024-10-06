import { useRouter } from "next/router";
import InputForm from "../components/InputForm";
import { useState } from 'react';

export default function Page(){

    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (email: string, password: string, e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
        
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                router.push({
                    pathname: '/dashboard',
                    query: { id: data.id },
                });
            } else {
                setError(data.error);
            }
        } 
        catch (err) {
            setError('An error occurred');
        }
    };

    return (
        <div className="h-4/5 flex items-center justify-center bg-gray-100 mt-6">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h1 className="mb-6 text-2xl font-bold text-gray-800">Please log in to continue.</h1>
            <InputForm btnText="Login" onClick={handleLogin} />
            {error && (
            <div className="mt-4 text-red-500 text-sm">
                {error}
            </div>
            )}
        </div>
        </div>
    )
}