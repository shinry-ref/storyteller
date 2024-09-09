import { User } from "../domain/user";
import { supabase } from "./supabase";

export const getAllUsers = async (): Promise<User[]> => {
  const response = await supabase.from("users").select('*').order('id', { ascending: true });;
  if (response.error){
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