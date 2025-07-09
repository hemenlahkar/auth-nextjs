import { getUserFromRequest } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userData = getUserFromRequest(request);
        let userId: string | undefined;
        if (typeof userData === "object" && userData !== null && "id" in userData) {
            userId = (userData as { id: string }).id;
        }
        const user = await User.findById(userId).select("-password -__v -createdAt -updatedAt");
        if (!userData || !userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        return NextResponse.json(
            { message: "User fetched successfully", user },
            { status: 200 }
        );
    } catch (error : any) {
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        )
    }
}