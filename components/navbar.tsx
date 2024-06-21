import { View, Image } from "react-native";
import React from "react";
import { Menu } from "react-native-paper";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
interface NavbarInterface {
  setIsOpen: (isOpen: boolean) => void;
}
const Navbar: React.FC<NavbarInterface> = ({ setIsOpen }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <View
      style={{
        zIndex: 100,
        width: "100%",
      }}
      className="flex-row bg-transparent absolute top-0 left-0 right-0 items-center justify-between py-12 px-4"
    >
      <Image
        source={require("@/assets/images/netflix-2.png")}
        className="w-[40px] h-[40px]"
        style={{
          width: 40,
          height: 40,
        }}
      />
      <View className="flex-row gap-6">
        <Link href={"/"} className="uppercase text-white font-bold">
          Privacy
        </Link>
        <Link href={"/sign-in"} className="uppercase text-white font-bold">
          Log IN
        </Link>

        <Menu
          visible={visible}
          onDismiss={closeMenu}
          style={{
            right: 0,
            left: "40%",
          }}
          anchor={
            <SimpleLineIcons
              onPress={openMenu}
              name="options-vertical"
              size={18}
              color="gray"
            />
          }
        >
          <Menu.Item
            onPress={() => {setIsOpen(true); setVisible(false)}}
            leadingIcon={"frequently-asked-questions"}
            title="FAQs"
          />
          <Menu.Item leadingIcon={"help-circle"} title="HELP" />
        </Menu>
      </View>
    </View>
  );
};

export default Navbar;
