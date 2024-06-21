// auth.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "./supabase";

export async function signUp(values: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
  });
  if (data.session && !(await AsyncStorage.getItem("supabaseSession"))) {
    AsyncStorage.setItem("supabaseSession", JSON.stringify(data.session));
  } else {
    await AsyncStorage.removeItem("supabaseSession");
  }
  if (error) throw error;
  return data;
}

export async function signIn(values: { email: string; password: string }) {
  const { error, data } = await supabase.auth.signInWithPassword(values);
  if (data.session) {
   await AsyncStorage.setItem("supabaseSession", JSON.stringify(data.session));
  } 
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export function getCurrentUser() {
  return supabase.auth.getUser();
}
