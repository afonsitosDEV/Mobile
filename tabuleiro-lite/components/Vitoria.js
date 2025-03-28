import React from 'react';
import { View, TouchableOpacity, Text, Modal, StyleSheet } from 'react-native';

export default function WinnerModal({visible, winner, onRestar}) {
  return(
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}> Jogador {winner + 1} venceu </Text>
          <TouchableOpacity style={styles.diceButton} onPress={onRestar}>
            <Text style={styles.diceText}> Jogar Novamente</Text>
            </TouchableOpacity>
          </View>
          </View>
          </Modal>
  )
}


const styles = StyleSheet.create({
  modalContainer:{ flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor:'rgba(0,0,0,0.3)'},
  modalContent:{backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center'},
  modalText:{fontSize: 22, fontWeight: 'bold', marginBottom: 20},
})