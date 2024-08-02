import { ProfilesTypes } from "@/types";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { create } from "zustand";

export interface favoriteIdsInterface {
  movieId: number;
  series: boolean;
}

interface useProfileInterface {
  Profile?: ProfilesTypes;
  setProfile: (profile: ProfilesTypes) => void;
  EditProfile: boolean;
  setEditProfile: (profile: boolean) => void;
  favoriteIds: favoriteIdsInterface[];
  setFavoriteIds: (ids: favoriteIdsInterface[]) => void;
  scroll?: number;
  setScroll: (scroll: number) => void;
}

const useProfile = create<useProfileInterface>((set) => ({
  Profile: undefined,
  setProfile: (profile: ProfilesTypes) => set({ Profile: profile }),
  EditProfile: false,
  setEditProfile: (profile) => set({ EditProfile: profile }),
  favoriteIds: [],
  setFavoriteIds: (ids) => set({ favoriteIds: ids }),
  scroll: undefined,
  setScroll: (scroll) => set({ scroll }),
}));

export default useProfile;
