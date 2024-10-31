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

export async function PATCH(req: Request) {
    try {
      await connectToDB();
  
      const body = await req.json();
      const { category, maximum, theme, _id } = body;
  
      const newBudget = await budgets.findByIdAndUpdate(
        _id,
        { category, maximum, theme },
        { new: true }
      );
  
      return NextResponse.json({
        message: "Budget updated successfully",
        data: newBudget,
      });
    } catch (e) {
      console.log(e);
      return NextResponse.json({
        message: "Error updating budget",
      });
    }
  }