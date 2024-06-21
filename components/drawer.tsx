import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import Accordion from "./accordion";
interface DrawerInterface {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Drawer: React.FC<DrawerInterface> = ({ isOpen, setIsOpen }) => {
  const randomWidth = useSharedValue(10);

  const config = {
    duration: 300,
  };
  const style = useAnimatedStyle(() => {
    return {
      height: isOpen ? withTiming(580, config) : withTiming(0, config),
      bottom: isOpen ? withTiming(0, config) : withTiming(-100, config),
    };
  });
  return (
    <Animated.View
      className="bg-white rounded-t-xl transition absolute p-6 left-0 right-0 bottom-0 flex-col"
      style={[style, { width: "100%", zIndex: 100 }]}
    >
      <AntDesign
        name="close"
        size={26}
        color="#555"
        onPress={() => setIsOpen(false)}
        className="self-end"
      />
      <Text className="text-[2.5rem] text-center font-medium">
        Frequently Asked Questions
      </Text>
      <ScrollView className="mt-8">
        <Accordion
          title="What is Netflix?"
          content="Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!"
        />
        <Accordion title="How much does Netflix cost?" content="Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from Rs 250 to Rs 1,100 a month. No extra costs, no contracts." />
        <Accordion title="Where can I watch" content="Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles. You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere." />
        <Accordion title="How do I cancel" content="Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime." />
        <Accordion title="What can I watch on Netflix" content="Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want." />
      </ScrollView>
    </Animated.View>
  );
};

export default Drawer;

const styles = StyleSheet.create({});
