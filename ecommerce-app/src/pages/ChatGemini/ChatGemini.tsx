import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from './ChatGeminiStyle'; 
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../NavigationTypes/navigationTypes";

import { sendPromptToIA } from '../../services/IaService';
import { getCurrentUser } from '../../services/authService';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

type Sender = 'user' | 'ia';

interface Message {
  from: Sender;
  text: string;
}

const GeminiScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  type ChatGeminiNavigationProp = StackNavigationProp<RootStackParamList, "ChatGemini">;
    const navigation = useNavigation<ChatGeminiNavigationProp>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        if (user && user._id) {
          setUserId(user._id);
        }
      } catch (error) {
        console.error('Erro ao buscar usuário atual:', error);
      }
    };

    fetchUser();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !userId) return;

    const userMessage: Message = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await sendPromptToIA(userId, userMessage.text);
      setMessages((prev) => [...prev, { from: 'ia', text: response.trim() }]);
    } catch (err: any) {
      setMessages((prev) => [...prev, { from: 'ia', text: err.message || 'Erro ao responder.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']}
        style={styles.container}>

    <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 10, left: 15, zIndex: 1, marginTop: 50 }}>
        <Ionicons name="arrow-back" size={30} color="#FFF" />
      </TouchableOpacity>
            
      <View style={styles.header}>
        <StatusBar backgroundColor="#0f0c29"/>
        <Image source={require('../../../assets/img/Google_Gemini_logo.png')} style={styles.logo} />
        <Text style={styles.title}>Ask Gemini</Text>
      </View>
      
      <ScrollView style={styles.chat}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.bubble,
              msg.from === 'user' ? styles.userBubble : styles.iaBubble,
            ]}
          >
            <Text style={styles.bubbleText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pergunte algo..."
          placeholderTextColor="#aaa"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSend}
          disabled={loading || !userId}
        >
          <Text style={styles.buttonText}>{loading ? '...' : 'Enviar'}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
  
export default GeminiScreen;