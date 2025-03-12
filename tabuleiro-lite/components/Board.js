import React from 'react';
import { View, Text, StyleSheet,Find } from 'react-native';


const BOARD_SIZE = 8;
const CELL_SIZE = 40;


export default function GameBoard({ players = [], isDarkMode }) {
    return (
        <View style={[styles.board, isDarkMode && styles.darkBoard]}>
            {Array.from({ length: BOARD_SIZE }).map((_, row) => (
                <View key={row} style={styles.row}>
                    {Array.from({ length: BOARD_SIZE }).map((_, col) => {
                        const playerHere = players.find(p => p.row === row && p.col === col);


                        return (
                            <View key={col} style={[styles.cell, row === BOARD_SIZE - 1 && col === 0 && styles.finalCell]}>
                                {playerHere && <Text style={styles.player}>{playerHere.icon}</Text>}
                            </View>
                        );
                    })}
                </View>
            ))}
        </View>
    );
}


const styles = StyleSheet.create({
    board: { width: BOARD_SIZE * CELL_SIZE, height: BOARD_SIZE * CELL_SIZE, borderWidth: 2, borderColor: 'black' },
    darkBoard: { borderColor: 'white' },
    row: { flexDirection: 'row' },
    cell: { width: CELL_SIZE, height: CELL_SIZE, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
    finalCell: { backgroundColor: 'gold' },
    player: { fontSize: 24 },
});
