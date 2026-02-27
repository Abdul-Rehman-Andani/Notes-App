import { Models } from "react-native-appwrite";

export interface Note extends Models.Document {
  title: string;
  content: string;
  userId: string;
  status : "todo" | "done"
}