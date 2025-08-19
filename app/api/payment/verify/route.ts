import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const order_id = searchParams.get("order_id");

  if (!order_id) {
    return NextResponse.json(
      { success: false, message: "Order ID is required" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `${process.env.CASHFREE_BASE_URL}/orders/${order_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-version": "2023-08-01",
          "x-client-id": process.env.CASHFREE_APP_ID || "",
          "x-client-secret": process.env.CASHFREE_SECRET_KEY || "",
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw { response: { data } };
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error(
      "Error verifying payment:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      {
        success: false,
        message: "Failed to verify payment",
        error: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
