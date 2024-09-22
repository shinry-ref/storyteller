import { User } from "../types/user";
import { story } from "../types/stories";
import { supabase } from "./supabase";

export const getUser = async (id: number): Promise<User> => {
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

// export const getTimeCapsules = async (): Promise<story[]> => {
//   const response = await supabase.from("stories").select("*");

//   if (response.error) {
//     throw new Error(response.error.message);
//   }

//   return response.data;
// }

export const getStory = async (id: number): Promise<story> => {
  const response = await supabase.from("stories").select("*").eq("id", id);

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data[0];
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

export const addStory = async (user_id: number, story_date: string, title: string, category_name: string, content: string, ai_content: string) => {
  const response = await supabase
  .from('stories')
  .insert({
            user_id: user_id,
            story_date: story_date,
            title: title,
            category_name: category_name,
            content: content,
            ai_content: ai_content,
          })

  if (response.error) {
    throw new Error(response.error.message);
  }
}

export const DeleteStory = async (id: number) => {
  await supabase.from("stories").delete().eq("id", id);
}
