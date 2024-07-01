import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Collapsible from "react-native-collapsible";
import Animated, {
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface AccordionInterface {
  title: string;
  content: string;
}

const Accordion: React.FC<AccordionInterface> = ({ title, content }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(collapsed ? 0 : 1, { duration: 100 }),
    };
  });

  return (
    <View style={styles.container} className="bg-neutral-200">
      <TouchableOpacity onPress={toggleExpanded} style={styles.header} className="mt-[1px] ">
        <Text className="text-left text-xl max-w-72">{title}</Text>
        <FontAwesome6
          name={collapsed ? "plus" : "minus"}
          size={20}
          color="black"
        />
      </TouchableOpacity>
      <Collapsible collapsed={collapsed} align="center" >
        <Animated.View className={"bg-neutral-300"} style={[styles.content, animatedStyle]}>
          <Text className="text-lg">{content}</Text>
        </Animated.View>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  header: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    padding: 15,
  },
});

export default Accordion;
