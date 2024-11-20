import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Season } from "@/types";
interface DropDownInterface {
  value: number;
  setValue: (value: number) => void;
  Seasons?: Season[];
}

const DropDown: React.FC<DropDownInterface> = ({
  value,
  setValue,
  Seasons,
}) => {
  return (
    <SelectDropdown
      data={Seasons || []}
      onSelect={(selectedItem: Season, index) => {
        setValue(index + 1);
      }}
      statusBarTranslucent
      defaultValueByIndex={0}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <Text style={styles.dropdownButtonTxtStyle}>
              {selectedItem && selectedItem.name}
            </Text>
            <Entypo name="chevron-thin-down" size={18} color="white" />
          </View>
        );
      }}
      renderItem={(item: Season, index, isSelected) => {
        return (
          <View
            key={index}
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: "#333" }),
            }}
          >
            <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
          </View>
        );
      }}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};

export default DropDown;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 130,
    height: 50,
    backgroundColor: "black",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "300",
    color: "white",
  },

  dropdownMenuStyle: {
    backgroundColor: "black",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "300",
    color: "white",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
