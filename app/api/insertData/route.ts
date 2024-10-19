import { connectToDB } from "@utils/database";
import balance from "@models/balance";
import transactions from "@models/transactions";
import budgets from "@models/budgets";
import pots from "@models/pots";

import { NextResponse } from 'next/server'; // Import NextResponse
import dataJson from '../../../data.json';

// Define the POST handler
export async function POST(req: Request) {
    await connectToDB();

    try {
        const data = dataJson;

        await balance.create(data.balance);
        await transactions.create(data.transactions);
        await budgets.create(data.budgets);
        await pots.create(data.pots);

        return NextResponse.json({ message: 'Data inserted successfully' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}