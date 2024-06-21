import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'expo', 
  // dbCredentials: {
  //   url: process.env.EXPO_PUBLIC_DATABASE_URL!,
  // },
  verbose: true,
  strict: true
});
