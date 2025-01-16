import { NextResponse } from "next/server";
import db from '../../../../lib/db';

export async function GET() {
    return error_handler('GET');
}

export async function POST(req: Request) {
    console.error(process.env.DB_USER);
    const { type }: { type?: string } = await req.json();
    
    if (type == "logam" || type == "non-logam") {
		try {
			await db.query('UPDATE trash SET count = count + 1 WHERE type = ?', [type]);
            await db.query('INSERT INTO trash_history (type) VALUES (?)', [type]);
			return NextResponse.json({
				success: true,
				message: `successfully added ${type} trash`,
			}, { status: 200 });
		} catch (error) {
			console.error(error);
			return NextResponse.json({
				success: false,
				message: `failed added ${type} trash`,
			}, { status: 500 });
		}
    } else if (type) {
        return NextResponse.json({
            success: false,
            message: `please use metal or non-metal type parameter of the trash`,
        }, { status: 400 });
    } else {
        return NextResponse.json({
            success: false,
            message: `please input the type parameter of the trash`,
        }, { status: 400 });
    }
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