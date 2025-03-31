import { StyleSheet } from 'react-native';

const Estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  canvas: {
    width: '100%',
    height: '80%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  scrollContainer: {
    flexDirection: 'row',
  },
});

export default Estilos;
