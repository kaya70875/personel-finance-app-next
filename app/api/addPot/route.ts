import pots from "@models/pots";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {        
        await connectToDB();

        const body = await req.json();
        const { name, target, theme } = body;

        const newPot = await pots.create({name , target, theme});

        return NextResponse.json({
            message: "Pot added successfully",
            data: newPot,
        });

    } catch(e) {
        console.log(e);
        return NextResponse.json({
            message: "Error adding budget",
        });
    }
}