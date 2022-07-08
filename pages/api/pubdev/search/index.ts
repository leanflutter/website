import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { q }: any = req.query;

  let url = `https://pub.flutter-io.cn/api/search?q=${q}`;

  const resp = await axios.get(url);

  const nextUrl = resp.data["next"];

  res.statusCode = 200;
  res.json({
    ...resp.data,
    next: nextUrl.replaceAll(
      "https://dartlang-pub.appspot.com/api/search",
      "/api/pubdev/search"
    ),
  });
}
