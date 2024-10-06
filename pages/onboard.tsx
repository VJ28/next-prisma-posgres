import Link from "next/link";
import InputForm from "../components/InputForm";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Page(){
    const [error, setError] = useState('');
    const router = useRouter()

    const handleSignup = async (email, password, e: React.FormEvent) => {
        e.preventDefault();
        console.log(email, password);
        try {
          const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
    
          const data = await res.json();
    
          if (res.ok) {
            router.push('/login');
          } else {
            setError(data.error || 'An error occurred');
          }
        } catch (err) {
          setError('An error occurred');
        }
      };

    return (
        <div className="h-5/6 flex items-center justify-center bg-gray-100 mt-6">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h1 className="mb-6 text-2xl font-bold text-gray-800">Sign Up.</h1>
                <InputForm btnText="Create" onClick={handleSignup} />
                {error && (
                <div className="mt-4 text-red-500 text-sm">
                    {error}
                </div>
                )}
            </div>
        </div>
    )
}