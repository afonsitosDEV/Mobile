import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function DiceButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.diceButton} onPress={onPress}>
      <Text style={styles.diceText}>🎲 Jogar </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  diceButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'orange',
    borderRadius: 5,
    width: 100,
  },
  diceText: { fontSize: 18, color: 'white' },
});
