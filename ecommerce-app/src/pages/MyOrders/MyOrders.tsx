import { useState, useEffect} from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../NavigationTypes/navigationTypes";
import styles from "./MyOrdersStyle";
import { getUserOrders } from "../../services/orderSerivce";
import { getCurrentUser } from "../../services/authService"; 

const MyOrders: React.FC = () => {
  type MyOrdersScreenNavigationProp = StackNavigationProp<RootStackParamList, "MyOrders">;
  const navigation = useNavigation<MyOrdersScreenNavigationProp>();

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = await getCurrentUser();
        const userOrders = await getUserOrders(user._id);
        setOrders(userOrders);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      } finally {
        setLoading(false); // quando terminar
      }
    };
  
    fetchOrders();
  }, []);
  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando pedidos...</Text>
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require("../../../assets/img/botao-voltar.png")} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Meus Pedidos</Text>
      </View>

      <View style={styles.ordersContainer}>
        {orders.map((pedido, index) => (
          <View key={index} style={styles.orderCard}>
            <Image source={require("../../../assets/img/order.png")} style={styles.orderImage} />
            <Text style={styles.orderTitle}>Pedido #{index + 1} - Total: R${pedido.total.toFixed(2)}</Text>
            <Text style={styles.orderTitle}>Produtos: {pedido.items?.length ?? 0}</Text>
            <Text style={styles.orderTitle}>Data: {new Date(pedido.orderDate).toLocaleString()}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default MyOrders;
