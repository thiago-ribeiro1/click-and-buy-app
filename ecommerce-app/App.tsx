import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./src/NavigationTypes/navigationTypes";
import SplashScreen from "./src/pages/SplashScreen/SplashScreen";
import Login from "./src/pages/Login/Login";
import Register from "./src/pages/Register/Register";
import HomeScreen from "./src/pages/HomeScreen/HomeScreen";
import Cart from "./src/pages/Cart/Cart";
import { CartProvider } from "./src/pages/Cart/CartContext";
import OrderPlaced from "./src/pages/OrderPlaced/OrderPlaced";

// Criação do Stack Navigator tipado com RootStackParamList
const Stack = createStackNavigator<RootStackParamList>();

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula o tempo de exibição da Splash Screen (3 segundos)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Limpa o timer para evitar problemas de memória
  }, []);

  // Se ainda estiver carregando, exibe a Splash Screen
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <CartProvider>
    <NavigationContainer>
      {/* Tela de Login como a primeira tela após o SplashScreen */}
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false, title: "Cadastro" }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false, title: "Carrinho" }}
        />
        <Stack.Screen
          name="OrderPlaced"
          component={OrderPlaced}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
}

export default App;
