import { authOptions } from "@lib/auth";
import balance from "@models/balance";
import budgets from "@models/budgets";
import pots from "@models/pots";
import transactions from "@models/transactions";
import { connectToDB } from "@utils/database";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  await connectToDB();
  try {

    if (!session || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const [budgetsData, transactionsData, balanceData, potsData] = await Promise.all([
      budgets.find({ userId }).lean(),
      transactions.find({ userId }).lean(),
      balance.findOne({ userId }).lean(),
      pots.find({ userId }).lean(),
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
