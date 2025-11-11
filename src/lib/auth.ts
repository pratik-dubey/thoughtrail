import { betterAuth } from "better-auth";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "BETTER_AUTH_SECRET",
  baseURL: process.env.BASE_URL,
  appName: "ThoughTrail",
});
