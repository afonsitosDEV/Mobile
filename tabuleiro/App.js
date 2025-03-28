import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated } from 'react-native';


const BOARD_SIZE = 8;
const CELL_SIZE = 35;
const INITIAL_POSITION = { row: 0, col: 0 };
const FINAL_POSITION = { row: BOARD_SIZE - 1, col: (BOARD_SIZE % 2 === 0) ? 0 : BOARD_SIZE - 1 };


const getNextPosition = (row, col, steps) => {
    const chance = Math.random();
    if (chance < 0.05) {
        return { row: 0, col: 0, message: 'levou uma multa e voltou para o início', won: false };
    } else if (chance < 0.15) {
        steps += 2;
        return { row, col, message: `avançou ${steps} casas`, won: false };
    } else if (chance < 0.25) {
        steps = Math.max(0, steps - 2);
        return { row, col, message: `deu ré e voltou ${steps} casas`, won: false };
    } else if (chance < 0.27) {
        steps = Math.max(0, steps + 4);
        return { row, col, message: `acelerou forte e andou ${steps} casas`, won: false };
    }
    else if (chance < 0.28) {
        return { row: BOARD_SIZE - 1, col: BOARD_SIZE - 2, message: 'subornou a polícia e foi para a final da corrida', won: false };
    } else if (chance < 0.3) {
        steps = Math.max(0, 0);
        return { row, col, message: `freiou de mais e ficou parado`, won: false };
    } 
    let moves = steps;
    while (moves > 0) {
        if (row % 2 === 0) {
            if (col < BOARD_SIZE - 1) {
                col++;
            } else {
                row++;
            }
        } else {
            if (col > 0) {
                col--;
            } else {
                row++;
            }
        }
        moves--;
        if (row === FINAL_POSITION.row && col === FINAL_POSITION.col) {
            return { row, col, message: 'chegou ao final e venceu!', won: true };
        }
    }
    return { row: Math.min(row, BOARD_SIZE - 1), col, message: `avançou ${steps} casas`, won: false };
};

export default function BoardGame() {
const [players, setPlayers] = useState([
    { row: 0, col: 0, icon: '🚗', animX: new Animated.Value(0), animY: new Animated.Value(1) },
    { row: 0, col: 0, icon: '🚙', animX: new Animated.Value(0), animY: new Animated.Value(0) }
]);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [diceRoll, setDiceRoll] = useState(1);
    const [gameWon, setGameWon] = useState(false);
    const [message, setMessage] = useState('');
    

 const rollDice = () => {
    const steps = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(steps);

    setPlayers(prevPlayers => {
        const newPlayers = [...prevPlayers];
        const nextPos = getNextPosition(newPlayers[currentPlayer].row, newPlayers[currentPlayer].col, steps);

        Animated.timing(newPlayers[currentPlayer].animX, {
            toValue: nextPos.col * CELL_SIZE,
            duration: 500,
            useNativeDriver: false
        }).start();

        Animated.timing(newPlayers[currentPlayer].animY, {
            toValue: nextPos.row * CELL_SIZE,
            duration: 500,
            useNativeDriver: false
        }).start();

        newPlayers[currentPlayer] = { ...newPlayers[currentPlayer], row: nextPos.row, col: nextPos.col };

       
        setMessage(`Jogador ${currentPlayer + 1} ${nextPos.message}`);

        // **Verifica se o jogador venceu**
        if (nextPos.row === FINAL_POSITION.row && nextPos.col === FINAL_POSITION.col) {
            setGameWon(true);
        }

        return newPlayers;
    });

    setCurrentPlayer(prev => (prev === 0 ? 1 : 0));
};

const resetGame = () => {
 setPlayers([
    { row: 0, col: 0, icon: '🚗', animX: new Animated.Value(0), animY: new Animated.Value(0) },
    { row: 0, col: 0, icon: '🚙', animX: new Animated.Value(0), animY: new Animated.Value(0) }
    ]);
    setGameWon(false);
    setDiceRoll(1);
    setCurrentPlayer(0);
    setMessage('');
};


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Jogo de Tabuleiro</Text>
		<Text style={styles.message}>{message}</Text>
    <Text style={styles.message}>Vez do jogador {currentPlayer + 1}</Text>
            <View style={styles.board}>
{Array.from({ length: BOARD_SIZE }).map((_, row) => (
    <View key={row} style={styles.row}>
        {Array.from({ length: BOARD_SIZE }).map((_, col) => {
            // Verifica se a célula faz parte da pista (borda externa)
            const isEdgeCell = row === 0 || row === BOARD_SIZE - 1 || col === 0 || col === BOARD_SIZE - 1;

            // Verifica se a célula está no início ou no final da linha
            const isStartOfRow = col === 0;
            const isEndOfRow = col === BOARD_SIZE - 1;

            // Define um estilo especial para curvas da pista
            let extraStyle = {};
            if (isEdgeCell) {
                if (row === 0 && col === 0) {
                    extraStyle = styles.topLeftCurve; // Canto superior esquerdo
                } else if (row === 0 && col === BOARD_SIZE - 1) {
                    extraStyle = styles.topRightCurve; // Canto superior direito
                } else if (row === BOARD_SIZE - 1 && col === 0) {
                    extraStyle = styles.bottomLeftCurve; // Canto inferior esquerdo
                } else if (row === BOARD_SIZE - 1 && col === BOARD_SIZE - 1) {
                    extraStyle = styles.bottomRightCurve; // Canto inferior direito
                }
            }

           
            return (
                <View key={col} style={[styles.cell, isEdgeCell && styles.roadCell, extraStyle]}>
                    <View style={styles.trackLine} />
                </View>
            );
        })}
    </View>
))}




{players.map((player, index) => (
    <Animated.View
        key={index}
        style={[
            styles.player,
            {
                position: 'absolute',
                left: player.animX,
                top: Animated.add(player.animY, new Animated.Value(index === 0 ? -CELL_SIZE * 0.5 : CELL_SIZE * 0.1))
            }
        ]}
    >
        <Text style={{ fontSize: CELL_SIZE * 0.7, transform: [{ scaleX: -1 }] }}>{player.icon}</Text>
    </Animated.View>
))}



            </View>
            <TouchableOpacity style={styles.diceButton} onPress={rollDice}>
                <Text style={styles.diceText}>🎲 Jogar
                </Text>
            </TouchableOpacity>
{gameWon && (
    <Modal visible={gameWon} transparent animationType="slide">
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.modalText}>🎉 Jogador {currentPlayer + 1} venceu! 🎉</Text>
                <TouchableOpacity style={styles.diceButton} onPress={resetGame}>
                    <Text style={styles.diceText}>Jogar Novamente</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>

)}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
     message: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: 'black',
     },
    board: {
        width: BOARD_SIZE * CELL_SIZE,
        height: BOARD_SIZE * CELL_SIZE,
        flexDirection: 'column',
        position: 'relative',
        backgroundColor:"#555",
         borderRadius:50,
         borderWidth: 0,

    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        borderWidth: 0,
      
    },
    trackLine: {
    width: '60%', // Define o tamanho do traço
    height: 3, // Espessura do traço
    backgroundColor: 'yellow', // Cor amarela para simular a pista
    position: 'absolute',
    top: '50%', // Centraliza verticalmente
    left: '20%', // Garante que não encoste totalmente na borda
    transform: [{ translateY: -1.5 }], // Ajusta a posição para centralizar melhor
},
roadCell: {
    backgroundColor: '#555', // Cor da estrada
    borderColor: 'black',
    borderWidth: 0,
},

trackLine: {
    width: '60%', 
    height: 3, 
    backgroundColor: 'yellow', 
    position: 'absolute',
    top: '50%', 
    left: '20%', 
    transform: [{ translateY: -1.-5 }],
},

// Ajustes para os cantos do tabuleiro
topLeftCurve: {
    borderTopLeftRadius: CELL_SIZE / 2,
},

topRightCurve: {
    borderTopRightRadius: CELL_SIZE / 2,
},

bottomLeftCurve: {
    borderBottomLeftRadius: CELL_SIZE / 2,
},

bottomRightCurve: {
    borderBottomRightRadius: CELL_SIZE / 2,
},

    player: {
        width: CELL_SIZE * 0.8,
        height: CELL_SIZE * 0.8,
        borderRadius: CELL_SIZE / 2,
    },
    diceButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: 'orange',
        borderRadius: 10,
    },
    diceText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    }
});
