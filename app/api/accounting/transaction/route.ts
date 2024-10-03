import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const debitRecord = {

        };
        const creditRecord = {
            
        };

        return  new NextResponse(JSON.stringify({
            message: 'OK',
        }), {
            status: 200,
        })
    } catch (error) {
        return new NextResponse(JSON.stringify({
            message: 'Error',
        }), {
            status: 500,
        });
    }
}