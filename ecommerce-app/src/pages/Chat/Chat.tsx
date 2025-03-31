import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Balloon from './Ballon';
import styles from './ChatStyle';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../NavigationTypes/navigationTypes";
import { Ionicons } from '@expo/vector-icons';
import { getCurrentUser } from '../../services/authService'; // importar o usuário atual 

const Chat = () => {
  const [chat, setChat] = useState<{ messages: { content: string; sentBy: string }[] }>({ messages: [] });
  const [message, setMessage] = useState('');
  const [chatName, setChatName] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, "Chat">;
  const navigation = useNavigation<ChatScreenNavigationProp>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser(); // Obter o usuário atual 
        if (user?.name) {
          setChatName(user.name); // Definir o nome do usuário no chatname
        }
      } catch (error) {
        console.error('Erro ao obter usuário:', error);
      }
    };

    fetchUser();
  }, []);

// Configuração do WebSocket 
const ws = useRef<WebSocket | null>(null); // WebSocket como ref  

useEffect(() => {
  if (!chatName) return; // Aguarda carregar o nome do usuário 

  // Criar conexão com WebSocket
  ws.current = new WebSocket('ws://IP-LOCAL:3000'); // IP Local substitua pelo IP da sua máquina 

  ws.current.onopen = () => {
    console.log("Cliente conectado ao socket com sucesso");
  };

  ws.current.onmessage = ({ data }) => {
    // Receber mensagem do servidor
    const newMessage = JSON.parse(data);
    setChat(prev => ({ messages: [...prev.messages, newMessage] })); // adiciona nova mensagem ao chat 

    setMessage(''); // limpa a mensagem
  };

  ws.current.onerror = (err) => {
    console.error("Erro no WebSocket:", err);
  };

  return () => {
    ws.current?.close(); // Encerra a conexão ao sair da tela 
  };
}, [chatName]);

// Envio separado — com acesso ao estado atualizado
const handleSend = () => {
  if (!message.trim() || !chatName || !ws.current) return;

  const jsonString = JSON.stringify({
    content: message,
    sentBy: chatName,
  });

  ws.current.send(jsonString); // Envia via WebSocket
};

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 10, left: 15, zIndex: 10 }}
      >
        <Ionicons name="arrow-back" size={30} color="#4fd1c5" />
      </TouchableOpacity>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollViewContainer}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {chat.messages.length > 0 ? (
          chat.messages.map((m, index) => (
            <Balloon key={index} message={m} currentUser={chatName} />
          ))
        ) : (
          <Text style={{ alignSelf: 'center', color: '#848484' }}>Sem mensagens no momento</Text>
        )}
      </ScrollView>

      <SafeAreaView>
        <View style={styles.messageTextInputContainer}>
          <TextInput
            style={styles.messageTextInput}
            placeholder="Digite sua mensagem..."
            placeholderTextColor="#aaa"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity
            onPress={handleSend}
            style={styles.sendButton}
            disabled={!message.trim()}
          >
            <Text style={{ color: '#fff' }}>➤</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Chat;
