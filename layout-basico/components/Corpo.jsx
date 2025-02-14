import {View, Text, Image} from 'react-native'
import Estilo from './Estilos.jsx'

const Corpo = () => {
  return(
    <View style={Estilo.body}>
      <Image source={{
          uri: 'https://www.speedlinktc.com/wp-content/uploads/2021/10/speedlink-pet-and-animal-courier-and-transport-services.jpeg',
        }} style={Estilo.image} />

    <Text style={Estilo.text}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse urna leo, pretium eget ultrices a. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse urna leo, pretium eget ultrices a.
    </Text>

    </View>
    
  )
}
export default Corpo;