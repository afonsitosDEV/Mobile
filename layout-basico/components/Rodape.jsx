import {View, Text, Image} from 'react-native'
import Estilo from './Estilos.jsx'


const Rodape = () => {
  return(
    <View style={Estilo.footer}>
      <Text style={Estilo.footerText}>
         Rodapé do APP 
      </Text>
    </View>
  )
}
export default Rodape;