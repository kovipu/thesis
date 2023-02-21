import pgPromise from "pg-promise";

import { PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD } from "./config";

const configuration = {
  host: PGHOST,
  port: Number(PGPORT),
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  poolSize: 20,
};

const pgp = pgPromise();
const db = pgp(configuration);

export default db;
