import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { public_token } = req.body;

    try {
      const response = await plaidClient.itemPublicTokenExchange({
        public_token,
      });

      const accessToken = response.data.access_token;
      res.status(200).json({ access_token: accessToken });
    } catch (error) {
      res.status(500).json({ error: 'Failed to exchange public token' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
