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
import Profile from "./src/pages/Profile/Profile";
import MyOrders from "./src/pages/MyOrders/MyOrders";
import ProductDetails from "./src/pages/ProductDetails/ProductDetails";
import Toast from "react-native-toast-message";
import Chat from "./src/pages/Chat/Chat";

// Importa contexto de autenticação
import { AuthProvider, useAuth } from "./src/services/AuthContext";


// Criação do Stack Navigator tipado com RootStackParamList
const Stack = createStackNavigator<RootStackParamList>();

// Função separada para renderizar as rotas com base na autenticação
function Routes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Enquanto verifica autenticação, mostra Splash
    return <SplashScreen />;
  }

  return (
    // Tela de Login como a primeira tela após o SplashScreen
    //  Se estiver autenticado, exibe a HomeScreen, se não, exibe a tela de Login ou Cadastro 
    <Stack.Navigator initialRouteName={isAuthenticated ? "HomeScreen" : "Login"}> 
      {!isAuthenticated ? ( 
        <>
          <Stack.Screen // não autenticado exibe apenas a tela de Login e Cadastro
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false, title: "Cadastro" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen // Se autenticado, exibe a HomeScreen, e demais telas abaixo
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
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MyOrders"
            component={MyOrders}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula o tempo de exibição da Splash Screen (4,5 segundos)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500);

    return () => clearTimeout(timer); // Limpa o timer quando o componente é desmontado
  }, []);

  // Se ainda estiver carregando, exibe a Splash Screen
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <Routes />
          <Toast />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
