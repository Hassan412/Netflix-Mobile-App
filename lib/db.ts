import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
import * as schema from '@/drizzle/schema'
const expo = openDatabaseSync("db.db");
const db = drizzle(expo, { schema});
export default db;
