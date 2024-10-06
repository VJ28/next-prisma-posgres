import { Console } from 'console';
import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, CountryCode, PlaidApi, PlaidEnvironments, Products } from 'plaid';

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox, // For sandbox, change to production when live
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
    try {
        const request = {
            user: { client_user_id: req.body.id }, // This should be unique per user
            client_name: 'My App 1',
            products: [Products.Auth],
            country_codes: [CountryCode.Us],
            language: 'en',
          };
      const response = await plaidClient.linkTokenCreate(request);

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
