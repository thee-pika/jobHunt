import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const generateTokens = async (
  user: unknown
): Promise<{
  access_Token: string;
  refresh_Token: string;
}> => {
  const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN;
  const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;

  if (!JWT_ACCESS_TOKEN || !JWT_REFRESH_TOKEN) {
    console.log("secrets not found!!!");
    return { access_Token: "", refresh_Token: "" };
  }

  console.log("user", user);

  const access_Token = await jwt.sign({ user }, JWT_ACCESS_TOKEN, {
    expiresIn: "24h",
  });
  const refresh_Token = await jwt.sign({ user }, JWT_REFRESH_TOKEN, {
    expiresIn: "7d",
  });

  return { access_Token, refresh_Token };
};

export default generateTokens;
