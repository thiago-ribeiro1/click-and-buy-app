import React, { useState, useRef, useEffect } from 'react';
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

  const sendMessage = () => {
    if (!message.trim() || !chatName) return;

    const newMessage = {
      content: message,
      sentBy: chatName,
    };

    setChat(prev => ({ messages: [...prev.messages, newMessage] }));
    setMessage('');
  };

  if (!chatName) {
    return null;
  }

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
            onPress={sendMessage}
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
