// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosResponse } from 'axios'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}

export const getAllArticles = async (): Promise<IArticle[]> => {
  // const params = { username, per_page: 1000 }
  const headers = { 'Bearer': process.env.DEVTO_APIKEY }
  const { data }: AxiosResponse = await axios.get(`http://localhost:4000/auth/register`, {
      // params,
      headers,
  })
  console.log(data)
}