// app/api/getData/route.ts
import balance from "@models/balance";
import budgets from "@models/budgets";
import pots from "@models/pots";
import transactions from "@models/transactions";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectToDB();

  try {
    // Use lean to improve performance
    const [budgetsData, transactionsData, balanceData, potsData] = await Promise.all([
      budgets.find({}).lean(),
      transactions.find({}).lean(),
      balance.findOne({}).lean(),
      pots.find({}).lean(),
    ]);

    return NextResponse.json({
      balanceData,
      budgetsData,
      transactionsData,
      potsData,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
