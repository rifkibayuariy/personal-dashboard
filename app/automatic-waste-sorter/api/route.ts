import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({message: 'Welcome to API - Automatic Waste Sorter'});
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