import { Alert, Text, TouchableHighlight, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
import useProfile from "@/hooks/useProfile";
import _, { without } from "lodash";
import Feather from "@expo/vector-icons/Feather";
import { cn } from "@/lib/utils";
interface FavoriteButtonInterface {
  movieId: number;
  iconSize?: number;
  labelClassName?: string;
  ClassName?: string;
}

const FavoriteButton: React.FC<FavoriteButtonInterface> = ({
  movieId,
  iconSize,
  labelClassName,
  ClassName,
}) => {
  const { Profile, favoriteIds, setFavoriteIds } = useProfile();

  useEffect(() => {
    const isFavorite = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("favoriteIds")
        .eq("id", Profile?.id);

      if (error) {
        console.error("Error fetching favoriteIds:", error);
        return;
      }

      if (data && data.length > 0) {
        setFavoriteIds(data[0].favoriteIds);
      }
    };

    if (Profile?.id) {
      isFavorite();
    }
  }, [Profile?.id, movieId]);

  const toggleFavorite = useCallback(async () => {
    try {
      let updatedFavoriteIds;
      if (favoriteIds?.includes(movieId)) {
        updatedFavoriteIds = without(favoriteIds, movieId);
      } else {
        updatedFavoriteIds = _.isEmpty(favoriteIds)
          ? [movieId]
          : [...favoriteIds, movieId];
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          favoriteIds: updatedFavoriteIds,
        })
        .eq("id", Profile?.id);

      if (error) throw error;

      setFavoriteIds(updatedFavoriteIds);
    } catch (error: any) {
      Alert.alert(error.message);
      console.error("Error updating favoriteIds:", error);
    }
  }, [Profile?.id, favoriteIds, movieId]);

  return (
    <TouchableHighlight onPress={toggleFavorite}>
      <View className={cn("flex-col items-center justify-center", ClassName)}>
        {favoriteIds?.includes(movieId) ? (
          <Feather name="check" size={iconSize ? iconSize : 24} color="white" />
        ) : (
          <AntDesign
            name="plus"
            size={iconSize ? iconSize : 24}
            color="white"
          />
        )}

        <Text className={cn("text-white font-medium", labelClassName)}>
          My List
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default FavoriteButton;
