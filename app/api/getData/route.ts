import balance from "@models/balance";
import budgets from "@models/budgets";
import pots from "@models/pots";
import transactions from "@models/transactions";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectToDB();

  try {
    // Run the database queries in parallel
    const [budgetsData, transactionsData, balanceData, potsData] = await Promise.all([
      budgets.find({}),
      transactions.find({}),
      balance.findOne({}),
      pots.find({}),
    ]);

    return NextResponse.json({
      balanceData,
      budgetsData,
      transactionsData,
      potsData,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
