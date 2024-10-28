import budgets from "@models/budgets";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {        
        await connectToDB();

        const body = await req.json();
        const { category, maximum, theme } = body;

        const newBudget = await budgets.create({category , maximum, theme});

        return NextResponse.json({
            message: "Budget added successfully",
            data: newBudget,
        });

    } catch(e) {
        console.log(e);
        return NextResponse.json({
            message: "Error adding budget",
        });
    }
}