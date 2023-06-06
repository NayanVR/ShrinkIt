import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { getEnvVariable } from "../helpers";

const connection = connect({
    host: getEnvVariable("DATABASE_HOST"),
    username: getEnvVariable("DATABASE_USERNAME"),
    password: getEnvVariable("DATABASE_PASSWORD")
});

export const db = drizzle(connection);