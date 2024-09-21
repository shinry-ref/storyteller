import { story } from "../types/stories";
import { User } from "../types/user";
import { supabase } from "./supabase";

export const getUser = async (id: string | undefined): Promise<User> => {
  const response = await supabase.from("users").select("*").eq("id", id);

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data[0];
}

export const getStories = async (): Promise<story[]> => {
  const response = await supabase.from("stories").select("*");

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
}

export const addUser = async (user_id: string, name: string) => {
  const response = await supabase
  .from('users')
  .insert({
            id: user_id,
            name: name
          })

  if (response.error) {
    throw new Error(response.error.message);
  }
}

export const addStory = async (user_id: number, title: string, category_name: string, content: string, ai_content: string) => {
  const response = await supabase
  .from('stories')
  .insert({
            user_id: user_id,
            title: title,
            category_name: category_name,
            content: content,
            ai_content: ai_content
          })

  if (response.error) {
    throw new Error(response.error.message);
  }
}
