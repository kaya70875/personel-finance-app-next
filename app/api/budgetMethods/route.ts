import budgets from "@models/budgets";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {        
        await connectToDB();

        const body = await req.json();
        const { category, maximum, theme , userId} = body;

        const newBudget = await budgets.create({category , maximum, theme , userId});

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
        const { id  , userId} = await req.json();

        const deletedBudget = await budgets.findOneAndDelete({_id : id , userId});
        
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
      const { category, maximum, theme, _id, userId } = body;

      const newBudget = await budgets.findOneAndUpdate(
          { _id, userId },
          { category, maximum, theme },
          { new: true }
      );
      return NextResponse.json({
          message: "Budget updated successfully",
          data: newBudget,
      });
  } catch (e) {
      console.log(e);
      return NextResponse.json({ message: "Error updating budget" });
  }
}
