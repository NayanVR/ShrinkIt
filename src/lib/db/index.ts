// import { drizzle } from "drizzle-orm/planetscale-serverless";
// import { connect } from "@planetscale/database";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { getEnvVariable } from "../helpers";
import { pgSchema } from "drizzle-orm/pg-core";

// const connection = connect({
//     host: getEnvVariable("DATABASE_HOST"),
//     username: getEnvVariable("DATABASE_USERNAME"),
//     password: getEnvVariable("DATABASE_PASSWORD")
// });

// export const db = drizzle(connection);

const sql = neon(getEnvVariable("DATABASE_URL"));
export const db = drizzle(sql);
export const shrinkitSchema = pgSchema("shrinkit");
