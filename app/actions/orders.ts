"use server";

import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function updateOrderStatusAction(orderId: string, newStatus: string) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("Unauthorized: You must be logged in.");
  }

  // Verify that the requesting user is an Admin
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("role")
    .eq("id", userId)
    .single();

  if (userError || !user || user.role !== "admin") {
    throw new Error("Forbidden: Admin access required.");
  }

  // Securely update the order status
  const { error: updateError } = await supabase
    .from("orders")
    .update({ status: newStatus })
    .eq("id", orderId);

  if (updateError) {
    console.error("Supabase Error:", updateError.message);
    throw new Error("Failed to update order status in the database.");
  }

  // Synchronize the frontend by clearing the Next.js router cache for this page
  revalidatePath("/dashboard/orders");
  
  return { success: true };
}