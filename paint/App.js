import { SafeAreaView } from 'react-native';
import Desenhando from './components/Pincel.jsx'
import Cores from './components/Cores'

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Desenhando />
      <Cores />
    </SafeAreaView>
  );
};

export default App;
