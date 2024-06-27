"use server"
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: Params): Promise<void> {
  try {
    // Ensure the database is connected before performing operations
    await connectToDB();

    // Perform the update operation
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { new: true, upsert: true } // Ensure document is returned after update and create if not exists
    );

    if (path === "/") {
      revalidatePath(path);
    }
  } catch (error: any) {
    console.error('Error updating user:', error); // Log the detailed error
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
