import { sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
export const userTable = sqliteTable("user_table", {
  id: integer("id").primaryKey(),
  image: text("image"),
  email: text("email").unique(),
  emailVerified: text("created_at")
  .default(sql`CURRENT_TIMESTAMP`),
  hashedPassword: text("hashedPassword"),
	createdAt: text("created_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text("updated_at"),
});

export const userProfiles = sqliteTable("user_profiles", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  userId:  integer("userId")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
  profilePicture: text("profilePicture"),
	createdAt: text("created_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text("updated_at"),
  favoriteIds: text('favoriteIds', { mode: 'json' }).$type<number[]>().default(sql`'[]'`),
});


export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;
