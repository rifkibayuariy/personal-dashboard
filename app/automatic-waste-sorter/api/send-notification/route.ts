import { NextResponse } from "next/server";
import { Twilio } from 'twilio';

export async function GET() {
    return error_handler('GET');
}

export async function POST(req: Request) {
    const { to, message }: { to?: string; message?: string } = await req.json();
  
    if (!to || !message) {
      return NextResponse.json({ error: 'Missing required fields: to, message' }, { status: 400 });
    }
  
    // Twilio credentials (store securely using environment variables)
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;
    
    console.log("Account SID:", accountSid); // Add this line
    console.log("Auth Token:", authToken);  // Add this line
    console.log("From WhatsApp Number:", fromWhatsAppNumber); // Add this line
  
    if (!accountSid || !authToken || !fromWhatsAppNumber) {
      return NextResponse.json({ error: 'Twilio credentials are not properly configured.' }, { status: 500 });
    }
  
    try {
      const client = new Twilio(accountSid, authToken);
  
      const messageResponse = await client.messages.create({
        from: `whatsapp:${fromWhatsAppNumber}`,
        to: `whatsapp:${to}`,
        body: message,
      });
  
      return NextResponse.json({
        success: true,
        sid: messageResponse.sid,
        message: 'Message sent successfully!',
      }, { status: 200 });
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      return NextResponse.json({ error: 'Failed to send message.', details: (error as Error).message }, { status: 500 });
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