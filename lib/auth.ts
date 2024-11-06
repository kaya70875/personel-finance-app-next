import { connectToDB } from "@utils/database";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@models/user";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();

        // Query the database for a user with the provided email
        const currentUser = await User.findOne({
          email: credentials?.email,
        }).select("+password"); // Explicitly selecting password if it's excluded by default

        console.log("cu", currentUser);

        // Check if user exists
        if (!currentUser) throw new Error("Wrong Email");

        // Verify the password
        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          currentUser.password
        );
        if (!passwordMatch) throw new Error("Wrong Password");

        // Return the user object if authorization succeeds
        return {
          id: currentUser._id,
          name: currentUser.name,
          email: currentUser.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
