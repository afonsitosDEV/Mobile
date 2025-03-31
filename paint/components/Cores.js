import { useState, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity, ScrollView, PanResponder } from 'react-native';
import Estilos from './Estilos';
import Desenhando from './Pincel.jsx'


const Cores = () => {
  const [paths, setPaths] = useState([]);
  const [color, setColor] = useState('black');
  const pan = useRef(new Animated.ValueXY()).current;

 const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newPath = { x: gestureState.moveX, y: gestureState.moveY, color: color };
      setPaths((prevPaths) => [...prevPaths, newPath]); 
    },
    onPanResponderRelease: () => {
      pan.setValue({ x: 0, y: 0 }); 
    },
    });

    const colors = [
    'black', 'red', 'green', 'blue', 'yellow', 
    'purple', 'orange', 'pink', 'brown', 'grey'
  ];

    const changeColor = (newColor) => {
    setColor(newColor);
  };


return (
    <View style={Estilos.container}>
      <ScrollView
        horizontal
        contentContainerStyle={Estilos.scrollContainer}
        showsHorizontalScrollIndicator={false}
      >
        {colors.map((colorOption, index) => (
          <TouchableOpacity
            key={index}
            style={[Estilos.button, { backgroundColor: colorOption }]}
            onPress={() => changeColor(colorOption)}
          >
            <Text style={Estilos.buttonText}> </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

}
export default Cores;