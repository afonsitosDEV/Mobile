import { Text, View } from 'react-native';

import {Titulo,Paragrafo1} from './components/Comp1.jsx';

export default function App() {
  return (
    <View>
    
    <Titulo />
    <Paragrafo1 />
    
      <Text>
        Meu texto aqui!
      </Text>
    </View>
  );
}
