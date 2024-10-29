import pots from "@models/pots";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

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
