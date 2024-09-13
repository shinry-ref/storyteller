import { Skill } from "../domain/skill";
import { User } from "../domain/user";
import { UserSkill } from "../domain/userSkill";
import { supabase } from "./supabase";

export const getUser = async (id: string | undefined): Promise<User> => {
  const response = await supabase.from("users").select("*").eq("id", id);

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data[0];
}

export const getUserSkill = async (user_id: string | undefined): Promise<UserSkill> => {
  const response = await supabase.from("user_skill").select("*").eq("user_id", user_id);

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data[0];
}

export const getAllSkills = async (skill_id: number | undefined): Promise<Skill[]> => {
  const response = await supabase.from("skills").select("*").eq("id", skill_id);

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
}





export const addNameCard = async (title: string, time: number | undefined) => {
  await supabase
  .from('study-record-ver2')
  .insert({ title: title, time: time  })
}

export const deleteNameCard = async (id: number) => {
  await supabase
  .from('study-record-ver2')
  .delete()
  .eq('id', id)
}

export const updateNameCard = async (id: number, title: string, time: number) => {
  await supabase
  .from('study-record-ver2')
  .update({ title: title, time: time })
  .eq('id', id)
}