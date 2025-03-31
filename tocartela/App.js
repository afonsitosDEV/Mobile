// App.js
import React from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AnimationHandler from "./components/AnimationHandler.jsx";
import styles from "./components/styles";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <AnimationHandler />
    </GestureHandlerRootView>
  )}