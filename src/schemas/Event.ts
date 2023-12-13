export type EventType = "user.created" | "user.updated" | "*";
export type Event = {
  data: EventDataType;
  object: "event";
  type: EventType;
};

export type EventDataType = {
  id: string;
  first_name: string;
  last_name: string;
  email_addresses: EmailAddressType[];
  primary_email_address_id: string;
  attributes: Record<string, string | number>;
};

export type EmailAddressType = {
  id: string;
  email_address: string;
};
