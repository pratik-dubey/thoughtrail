import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { schema } from "./db/schema";
export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "BETTER_AUTH_SECRET",
  baseURL: process.env.BASE_URL,
  appName: "ThoughTrail",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      //       user → ye lo schema.users (mera users table)
      // session → ye lo schema.sessions (mera sessions table)
      // account → ye lo schema.accounts (mera accounts table)

      // spreaded schema so that we get everything from schema and use whatever is needed

      ...schema,
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 6,
    maxPasswordLength: 128,
    autoSignIn: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
    disableSessionRefresh: true,
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    defaultCookieAttributes: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
  },
});
