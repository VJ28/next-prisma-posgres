import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import React from 'react';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const ComponentWithAuth = (props: P) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const authenticateToken = async () => {
        try {
          await fetch('/api/authenticate', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token }),
          });
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false); // Token is invalid or expired
        }
      };

      authenticateToken();
    }, [router]);

    if (isAuthenticated === null) {
      return <div className="text-center text-gray-500">Loading...</div>; //Add a Loader
    }

    if (!isAuthenticated) {
      return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
          <div className="p-6 bg-white rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-red-600">Please login to proceed further</h2>
            <p className="mt-3 text-gray-600">You must be logged in to access this page.</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
              onClick={() => router.push('/login')}
            >
              Go to Login
            </button>
          </div>
        </div>
      );
    }
    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
