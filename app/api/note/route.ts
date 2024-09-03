import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        console.log(data);

        return new NextResponse(JSON.stringify({
            message: 'OK'
        }), {
            status: 200
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({
            message: 'Failed'
        }), {
            status: 500
        })
    }
}

export async function PATCH(req: Request) {

}