import balance from "@models/balance";
import budgets from "@models/budgets";
import pots from "@models/pots";
import transactions from "@models/transactions";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectToDB();

  try {
    const budgetsData = await budgets.find({});
    const transactionsData = await transactions.find({});
    const balanceData = await balance.findOne({});
    const potsData = await pots.find({});

    console.log('potsData : ' , potsData);


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
