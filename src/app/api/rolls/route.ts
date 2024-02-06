import { NextResponse } from "next/server";
import { pool } from '../../db/db';

export async function GET(): Promise<NextResponse<{
        previousRolls: any;
    }>> {
    const rawQueryResult = await pool.query(`
        SELECT id, number FROM "Rolls" ORDER BY "created_at" DESC;
    `);
    const previousRolls = rawQueryResult.rows;
    return NextResponse.json({
        previousRolls
    })
}

export async function POST(request: Request): Promise<NextResponse<{
        newRoll: any;
    }>> {
    const roll = await request.json();
    const newRoll = await pool.query(`
        INSERT INTO "Rolls" ("number", "created_at", "updated_at")
        VALUES (${roll}, NOW(), NOW())
    `);
    checkNumberOfRollsRecords();
    return NextResponse.json({ newRoll });
}

export async function checkNumberOfRollsRecords(): Promise<void> {
    const count = await pool.query(`
        SELECT COUNT(*) FROM "Rolls";
    `)
    if (count.rows[0].count > 10) {
        DELETE();
    }
}

export async function DELETE(): Promise<void> {
    await pool.query(`
        DELETE FROM "Rolls" WHERE id = (
            SELECT id FROM "Rolls" ORDER BY id ASC
            LIMIT 1
        )
    `);
}