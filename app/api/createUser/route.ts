import User from "@models/user";
import { connectToDB } from "@utils/database";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  try {
    await connectToDB();

    const userExists = await User.findOne({ email });

    if (userExists) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const currentUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await currentUser.save();
    console.log(savedUser);

    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Failed to create user" }), {
      status: 500,
    });
  }
}
