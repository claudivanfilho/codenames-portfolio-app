import { KyselyDB } from "@/types";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    port: +process.env.DATABASE_PORT!,
    max: 10,
  }),
});

export const db = new Kysely<KyselyDB>({
  dialect,
});
