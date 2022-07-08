import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id }: any = req.query;

  let url = `https://pub.flutter-io.cn/api/packages/${id}`;

  const resp = await axios.get(url);

  res.statusCode = 200;
  res.json({
    ...resp.data,
  });
}
