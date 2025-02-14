import {View, Text} from 'react-native'
import Estilo from './Estilos.jsx'

const Cabecalho = () => {
  return(
    <View style={Estilo.header}>
      <Text style={Estilo.headerText}>Cabeçalho do App </Text>
    </View>
  )
}
export default Cabecalho;