import React from "react";

function OrderDetailPage({ orderId }: { orderId: string }) {
  return <div className="mx-auto max-w-3xl p-6 text-sm text-muted-foreground">{`Future: shipment tracking, line items, payment events, and support tickets for order ${orderId}.`}</div>;
}

export default OrderDetailPage;
