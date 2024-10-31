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

export async function DELETE(req: Request) {
    try {
        await connectToDB();
        const { id } = await req.json();

        const deletedPot = await pots.findByIdAndDelete(id);
        
        return NextResponse.json({
            message: "Pot deleted successfully",
            data: deletedPot,
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            message: "Error deleting pot",
        });
    }
}

export async function PATCH(req : Request) {
    try {

    } catch (e) {
        console.error(e);
        return NextResponse.json({
            message : "Error updating pot",
        })
    }
}