import { useRouter } from 'next/router';
import {useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import withAuth from '../lib/withAuth';

const Dashboard = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [plaidResponse, setPlaidResponse] = useState<any | null>(null);

  const router = useRouter();
  const { id } = router.query;

  const fetchLinkToken = async () => {
    const response = await fetch('/api/create-link-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })
    });
    const { link_token } = await response.json();
    setLinkToken(link_token);
  };

  useEffect(() => {
    fetchLinkToken();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (public_token, metadata) => {
      const response = await fetch('/api/exchange-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ public_token }),
      });

      const data = await response.json();
      console.log('Plaid access token:', data);
      alert('Account linked successfully!');
      setPlaidResponse({ public_token, metadata, accountLinked: true });
    },
    onExit: (err, metadata) => {
        setPlaidResponse({ error: err, metadata });
    },
  });

  const reLink = () => {
    setPlaidResponse(null);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        {plaidResponse && plaidResponse.accountLinked ?
            <div className='w-full p-4 text-white font-bold text-lg rounded-lg bg-blue-600 hover:bg-blue-700'>
                Account linked successfully! Link another account by clicking <button className='text-gray-100 italic' onClick={reLink}>here</button>
            </div>
        :
            <button
            onClick={() => open()}
            disabled={!ready}
            className={`w-full p-4 text-white font-bold text-lg rounded-lg 
                ${ready ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}
            `}
            >
            {ready ? 'Connect to Plaid' : 'Loading...'}
            </button>
        }

        {plaidResponse && (
          <div className="mt-8 bg-gray-50 p-4 rounded-lg shadow-inner">
            <h2 className="text-xl font-bold text-gray-700">Plaid Response</h2>
            <pre className="mt-4 text-sm bg-gray-200 p-4 rounded-lg overflow-x-auto">
              {JSON.stringify(plaidResponse, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(Dashboard);