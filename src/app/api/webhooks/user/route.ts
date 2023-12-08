import { prisma } from "@/lib";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || "";

type EventType = "user.created" | "user.updated" | "*";

type EventDataType = {
  id: string;
  first_name: string;
  last_name: string;
  email_addressess: EmailAddressType[];
  primary_email_address_id: string;
  attributes: Record<string, string | number>;
};

type EmailAddressType = {
  id: string;
  email_address: string;
};

type Event = {
  type: EventType;
  data: EventDataType;
  object: "event";
};

async function handler(request: Request) {
  const payload = await request.json();
  const headerList = headers();

  const heads: WebhookRequiredHeaders = {
    "svix-signature": headerList.get("svix-signature") || "",
    "svix-id": headerList.get("svix-id") || "",
    "svix-timestamp": headerList.get("svix-timestamp") || "",
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;
  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (e) {
    console.log((e as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const {
      id,
      first_name,
      last_name,
      email_addressess,
      primary_email_address_id,
      ...attributes
    } = evt.data;

    await prisma.user.upsert({
      where: { externalId: id as string },
      create: {
        externalId: id as string,
        attributes,
      },
      update: {
        attributes,
      },
    });
  }
  return NextResponse.json({}, { status: 200 });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
