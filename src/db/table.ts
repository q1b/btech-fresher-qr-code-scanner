import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const fresherTable = sqliteTable("freshers", {
    id: int('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    email: text('email').notNull(),
    rollNo: text('roll_no').notNull(),
    entries: int('entries')
});

export type Fresher = typeof fresherTable.$inferSelect;