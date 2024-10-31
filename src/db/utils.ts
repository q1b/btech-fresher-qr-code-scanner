'use server';
import { eq } from "drizzle-orm";
import { db } from "./index";
import { fresherTable } from "./table";

export async function getFresherList() {
    return await db.query.fresherTable.findMany();
}

export async function getFresher(id:number) {
    return await db.query.fresherTable.findFirst({
        where: eq(fresherTable.id, id)
    })
}

export async function setFresherEntry(id:number, entry:number) {
    const values = await db.update(fresherTable).set({
        entries: entry
    }).where(eq(fresherTable.id, id)).returning()
    return values[0].entries
}