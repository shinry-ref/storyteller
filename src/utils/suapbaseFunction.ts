import { Skill } from "../types/skill";
import { User } from "../types/user";
import { UserSkill } from "../types/userSkill";
import { supabase } from "./supabase";

export const getUser = async (id: string | undefined): Promise<User> => {
  const response = await supabase.from("users").select("*").eq("id", id);

  if (response.error) {
    throw new Error(response.error.message);
  }

  const user = response.data[0];
  const userData = User.newUser(
                                user.id,
                                user.name,
                                user.description,
                                user.github_id,
                                user.qiita_id,
                                user.x_id
                              )

  return userData;
}

export const getUserSkill = async (user_id: string | undefined): Promise<UserSkill> => {
  const response = await supabase.from("user_skill").select("*").eq("user_id", user_id);

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data[0];
}

export const getSelectAllSkills = async (skill_id: number | undefined): Promise<Skill[]> => {
  const response = await supabase.from("skills").select("*").eq("id", skill_id);

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
}

export const getAllSkills = async (): Promise<Skill[]> => {
  const response = await supabase.from("skills").select("*");

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
}



export const addUser = async (user_id: string, name: string, description: string, github_id: string, qiita_id: string, x_id: string) => {
  const response = await supabase
  .from('users')
  .insert({
            id: user_id,
            name: name,
            description: description,
            github_id: github_id,
            qiita_id: qiita_id,
            x_id: x_id
          })

  if (response.error) {
    throw new Error(response.error.message);
  }
}

export const addUserSkill = async (user_id: string, skill_id: string) => {
  const response = await supabase
  .from('user_skill')
  .insert({
            user_id: user_id,
            skill_id: skill_id
          })

  if (response.error) {
    throw new Error(response.error.message);
  }
}

// export const deleteNameCard = async (id: number) => {
//   await supabase
//   .from('study-record-ver2')
//   .delete()
//   .eq('id', id)
// }

// export const updateNameCard = async (id: number, title: string, time: number) => {
//   await supabase
//   .from('study-record-ver2')
//   .update({ title: title, time: time })
//   .eq('id', id)
// }