import React from "react";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import styles from "./styles";

export default function AnimationComponent({ animationValue }) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(animationValue.value) }],
  }));

  return <Animated.View style={[styles.box, animatedStyle]} />;
}