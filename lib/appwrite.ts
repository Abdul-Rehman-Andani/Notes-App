import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { Account, Client, Databases, ID, OAuthProvider, Query } from 'react-native-appwrite';

// --- APPWRITE SETUP ---
const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const databases = new Databases(client);


// --- THE LOGIN FUNCTION ---
export async function loginWithGoogle() {
  try {
    const redirectUri = Linking.createURL("/");

    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );

    // Bypasses the .toString() error by forcing a string template
    const authUrl = `${response}`;

    const browserResult = await WebBrowser.openAuthSessionAsync(
      authUrl,
      redirectUri
    );

    if (browserResult.type !== "success") return false;

    // Use Linking.parse for mobile (new URL() is unreliable here)
    const parsed = Linking.parse(browserResult.url);
    const userId = parsed.queryParams?.userId as string;
    const secret = parsed.queryParams?.secret as string;

    if (!userId || !secret) return false;

    await account.createSession(userId, secret);
    return true;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
}


export async function logout() {
  try {
    const result = await account.deleteSession("current");
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// ======================= Notes ========================

export async function createNote({
  title,
  content,
  userId,
}: {
  title: string;
  content: string;
  userId: string;
}) {
  return await databases.createDocument(
    process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.EXPO_PUBLIC_APPWRITE_NOTES_COLLECTION_ID!,
    ID.unique(),
    {
      title,
      content,
      userId,
    }
  );
}

export async function getUserNotes(userId: string) {
  return await databases.listDocuments(
    process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.EXPO_PUBLIC_APPWRITE_NOTES_COLLECTION_ID!,
    [
      Query.equal("userId", userId),
      Query.equal("status", "todo" ),
      Query.orderDesc("$createdAt"),
    ]
  );
}


export const toggleNoteStatus = async (
  noteId: string,
  currentStatus: "todo" | "done"
) => {
  try {
    const newStatus = currentStatus === "todo" ? "done" : "todo";

    const response = await databases.updateDocument(
      process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.EXPO_PUBLIC_APPWRITE_NOTES_COLLECTION_ID!,
      noteId,
      {
        status: newStatus,
      }
    );

    return response;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};