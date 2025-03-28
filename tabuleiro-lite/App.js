import { Text, SafeAreaView, StyleSheet } from 'react-native';

import GameBoard from './components/Board';
import DiceButton from './components/Dice'


export default function App() {
  return (
    <SafeAreaView >

      <GameBoard />
      <DiceButton />
      
    </SafeAreaView>
  );
}


