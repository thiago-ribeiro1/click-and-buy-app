import React, { useState, useRef } from 'react';
import { View, TextInput, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Balloon from './Ballon';
import styles from './ChatStyle';
import { useRoute, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../NavigationTypes/navigationTypes";
import { Ionicons } from '@expo/vector-icons';

const Chat = () => {
  const [chat, setChat] = useState<{ messages: { content: string; sentBy: string }[] }>({ messages: [] });
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const route = useRoute();
  const { chatName } = route.params as { chatName: string };

  type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, "Chat">;
  const navigation = useNavigation<ChatScreenNavigationProp>();

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      content: message,
      sentBy: chatName,
    };

    setChat(prev => ({ messages: [...prev.messages, newMessage] }));
    setMessage('');
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
