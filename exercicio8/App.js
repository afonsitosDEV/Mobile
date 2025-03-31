import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Screen = ({ navigation, title, nextScreen }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 24 }}>{title}</Text>
    {nextScreen && (
      <Button title={`Ir para ${nextScreen}`} onPress={() => navigation.navigate(nextScreen)} />
    )}
  </View>
);

const ModuloTabs = ({ route }) => (
  <Tab.Navigator>
    <Tab.Screen name="Tela1" children={() => <Screen title={route.params.tela1} />} />
    <Tab.Screen name="Tela2" children={() => <Screen title={route.params.tela2} />} />
    <Tab.Screen name="Tela3" children={() => <Screen title={route.params.tela3} />} />
  </Tab.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Módulo 1" component={ModuloTabs} initialParams={{ tela1: "Bem-vindo ao curso!", tela2: "Como usar o app", tela3: "Dicas iniciais" }} />
    <Stack.Screen name="Módulo 2" component={ModuloTabs} initialParams={{ tela1: "Capítulo 1 - Conceitos básicos", tela2: "Capítulo 2 - Exemplos práticos", tela3: "Capítulo 3 - Quiz interativo" }} />
    <Stack.Screen name="Módulo 3" component={ModuloTabs} initialParams={{ tela1: "Resumo do curso", tela2: "Próximos passos", tela3: "Deixe seu feedback!" }} />
  </Stack.Navigator>
);

const PerfilScreen = () => <Screen title="Perfil" />;
const ConfigScreen = () => <Screen title="Configurações" />;

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Perfil" component={PerfilScreen} />
        <Drawer.Screen name="Configurações" component={ConfigScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
