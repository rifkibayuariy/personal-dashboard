import { NextResponse } from "next/server";
import db from '../../../../lib/db';

type TrashResult = {
		count: number;
		full: boolean;
	};  

export async function GET() {
    const [logamResults] = await db.execute('SELECT count, full FROM trash WHERE type = "logam"');
	const logamData = logamResults as TrashResult[];
	const count_logam = logamData[0]?.count || 0;
	const full_logam = logamData[0]?.full || false;

	// Menjalankan query untuk non-logam
	const [nonLogamResults] = await db.execute('SELECT count, full FROM trash WHERE type = "non-logam"');
	const nonLogamData = nonLogamResults as TrashResult[];
	const count_non_logam = nonLogamData[0]?.count || 0;
	const full_non_logam = nonLogamData[0]?.full || false;

    return NextResponse.json({
        count_logam,
        full_logam,
        count_non_logam,
        full_non_logam,
    }, { status: 200 });
}

export async function POST() {
    return error_handler('POST');
}

export async function PUT() {
	return error_handler('PUT');
}

export async function DELETE() {
	return error_handler('DELETE');
}

function error_handler(method: string) {
	return NextResponse.json(
		{ error: `Method ${method} not allowed` },
		{ status: 405 }
	);
}
