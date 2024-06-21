import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
interface useSessionInterface {
  session?: Session;
  setSession: (session: Session) => void;
}

const useSession = create<useSessionInterface>((set) => ({
  session: undefined,
  setSession: (session: Session) => set({ session: session }),
}));

export default useSession