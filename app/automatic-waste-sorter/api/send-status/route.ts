import { NextResponse } from "next/server";
import db from '../../../../lib/db';

export async function GET() {
    return error_handler('GET');
}

export async function POST(req: Request) {
    const { type, status }: { type?: string; status?: string } = await req.json();

    if (!type && !status) {
        return NextResponse.json({
            success: false,
            message: `please input parameter`,
        }, { status: 400 });
    }

    if (!type) {
        return NextResponse.json({
            success: false,
            message: `please input the type parameter`,
        }, { status: 400 });
    }

    if (!status) {
        return NextResponse.json({
            success: false,
            message: `please input the status parameter`,
        }, { status: 400 });
    }

    if (type != "logam" && type != "non-logam") {
        return NextResponse.json({
            success: false,
            message: `please use metal or non-metal type parameter of the trash`,
        }, { status: 400 });
    }

    if (status != "full" && status != "not-full") {
        return NextResponse.json({
            success: false,
            message: `please use full or not-full status parameter`,
        }, { status: 400 });
    }

    await db.query('UPDATE trash SET full = ? WHERE type = ?', [status == 'full' ? true : false, type]);

    const bodyMessage = `sampah ${type}mu kebak!`;
    const recipients = [
        { to: '+6281332145324', message: bodyMessage },
        { to: '+6281280295818', message: bodyMessage },
        { to: '+6285190044083', message: bodyMessage },
        { to: '+6281272733891', message: bodyMessage },
    ];

    try {
        const sendMessagesPromises = recipients.map((recipient) => {
          return fetch(`https://rifkibayuariyan.vercel.app/automatic-waste-sorter/api/send-notification`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: recipient.to,
              message: recipient.message,
            }),
          });
        });
    
        const responses = await Promise.all(sendMessagesPromises);
    
        await Promise.all(responses.map((response) => response.json()));
      } catch (error) {
        console.error('Error sending messages:', error);
        return NextResponse.json({ error: 'Failed to send messages.' }, { status: 500 });
      }

    return NextResponse.json({
        success: true,
        message: `successfully send notification ${type} is ${status}`,
    }, { status: 200 });
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