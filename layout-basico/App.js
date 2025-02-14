import {View} from 'react-native'
import Cabecalho from './components/Cabecalho.jsx'
import Corpo from './components/Corpo.jsx';
import Rodape from './components/Rodape.jsx';

const App = () => {
return(
<View>
<Cabecalho />
<Corpo />
<Rodape />
</View>
)
}
export default App;