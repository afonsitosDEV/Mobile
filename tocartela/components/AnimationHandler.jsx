import React from "react";
import { View } from "react-native";
import { TapGestureHandler, LongPressGestureHandler, State } from "react-native-gesture-handler";
import Animated, { useSharedValue } from "react-native-reanimated";
import AnimationComponent from "./AnimationComponent";
import styles from "./styles";

export default function AnimationHandler() {
  const scale = useSharedValue(1);

  const handleSingleTap = () => {
    scale.value = 1.2;
    setTimeout(() => (scale.value = 1), 300);
  };

  const handleDoubleTap = () => {
    scale.value = 1.5;
    setTimeout(() => (scale.value = 1), 300);
  };

  const handleTripleTap = () => {
    scale.value = 2;
    setTimeout(() => (scale.value = 1), 300);
  };

  const handleLongPress = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      scale.value = 0.5;
    }
  };

  return (
    <LongPressGestureHandler onHandlerStateChange={handleLongPress} minDurationMs={500}>
      <TapGestureHandler onActivated={handleSingleTap} numberOfTaps={1}>
        <TapGestureHandler onActivated={handleDoubleTap} numberOfTaps={2}>
          <TapGestureHandler onActivated={handleTripleTap} numberOfTaps={3}>
            <View style={styles.container}>
              <AnimationComponent animationValue={scale} />
            </View>
          </TapGestureHandler>
        </TapGestureHandler>
      </TapGestureHandler>
    </LongPressGestureHandler>
  );
}