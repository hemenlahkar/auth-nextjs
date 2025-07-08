import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { hash, genSalt } from "bcryptjs";

connect();

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();
    console.log("Received data:", { username, email, password });

    User.findOne({ email }).then(async (existingUser) => {
      if (existingUser) {
        return NextResponse.json(
          { error: "User already exists" },
          { status: 409 }
        );
      }
    });

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully", success: true },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 }
    );
  }
}
