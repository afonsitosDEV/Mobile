import { useState, useRef } from 'react';
import { View, PanResponder, Animated } from 'react-native';
import Estilos from './Estilos';
import Cores from './Cores'


const Desenhando = () => {
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

return (
    <View style={Estilos.container}>
   
      <View
        {...panResponder.panHandlers}
        style={Estilos.canvas}
      >
        {paths.map((path, index) => (
          <Animated.View
            key={index}
            style={{
              position: 'absolute',
              left: path.x - 5,
              top: path.y - 5,
              width: 15,
              height: 15,
              backgroundColor: path.color,
              borderRadius: 5,
            }}
          />
        ))}
        </View>
    </View>
);

};


export default Desenhando;