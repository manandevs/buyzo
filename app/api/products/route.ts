import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

// Helper function to securely verify admin status
async function verifyAdmin() {
  const { userId } = await auth();
  if (!userId) return false;

  const { data, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", userId)
    .single();

  if (error || !data || data.role !== "admin") return false;
  return true;
}

export async function GET() {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*, category_name:category (id, title)")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ products: products ??[] });
  } catch (err) {
    console.error("Error fetching products:", err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized: Admins only" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, category, price, stock } = body;
    
    if (!title || !category || price === undefined || stock === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("products")
      .insert([body])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ product: data });
  } catch (err) {
    console.error("Error creating product:", err);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized: Admins only" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) return NextResponse.json({ error: "Missing product ID" }, { status: 400 });

    const { data, error } = await supabase
      .from("products")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ product: data });
  } catch (err) {
    console.error("Error updating product:", err);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized: Admins only" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing product ID" }, { status: 400 });

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error deleting product:", err);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}