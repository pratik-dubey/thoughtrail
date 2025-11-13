import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? {
          //           rejectUnauthorized: false
          // bataata hai → “SSL connection use karo, par certificate verify mat karo.”
          rejectUnauthorized: false,
        }
      : false,
  max: 10,
});

export const db = drizzle(pool, { schema });

// Socho Drizzle ORM ek automatic car hai 🚗
// Tumhe gears change nahi karne padte — easy and smooth drive.

// Lekin kuch jagah (hill area ya race track) pe tum manual control chahoge.
// Tab tum “manual mode” use karte ho — wo hai direct SQL query isliye hum pool se ek client connection udhar lete hai to send direct sql queries.
export async function getClient() {
  const client = await pool.connect();
  return client;
}
