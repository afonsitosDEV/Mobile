import {StyleSheet} from 'react-native'

const Estilo = StyleSheet.create({
container: {
  flex:1,
  backgroundColor:'#F5F5F5',
},
header:{
  height: 60,
  backgroundColor: "#0047AB",
  justifyContent:"Center",
  alignItems: "Center"
},
headerText:{
  color: '#fff',
  fontSize: 20,
  fontWeight: 'bold',
},
body:{
  flex:1,
  padding: 20,
  justifyContent:"Center",
  alignItems: "Center"

},
image: {
  width:200,
  height: 200,
  margin:20,
},
text:{
  fontSize: 16,
  textAlign: 'center',
  marginBottom: 20,
},
footer:{
  height: 30,
  backgroundColor: "#0047AB",
  justifyContent:"Center",
  alignItems: "Center",
  padding:5
},
footerText:{
  color: '#fff',
  fontSize: 12,
  marginBottom: 10
}

})

export default Estilo;