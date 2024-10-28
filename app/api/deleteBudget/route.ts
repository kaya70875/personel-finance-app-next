// in your API route (e.g., /api/deleteBudget.ts)
import budgets from "@models/budgets";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    try {
        await connectToDB();
        const { id } = await req.json();

        const deletedBudget = await budgets.findByIdAndDelete(id);
        
        return NextResponse.json({
            message: "Budget deleted successfully",
            data: deletedBudget,
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            message: "Error deleting budget",
        });
    }
}
