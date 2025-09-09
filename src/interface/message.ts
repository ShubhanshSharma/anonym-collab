import { User } from "./user";

export interface Message {
  id: string;
  chat_room_id: string;
  sender_id: string;
  content: string;
  message_type: "text" | "image" | "file"; // extend as needed
  file_url: string | null;
  reply_to_id: string | null;
  edited_at: string | null;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  sender: User;
  replyTo: Message | null;
}
