import React from 'react';
import { View, Text } from 'react-native';
import styles from './ChatStyle';

const Balloon = ({ message, currentUser }: any) => {
  const sent = currentUser === message.sentBy;

  const balloonColor = sent 
  ? styles.balloonSent 
  : styles.balloonReceived;
  const balloonTextColor = sent 
  ? styles.balloonTextSent 
  : styles.balloonTextReceived;
  const bubbleWrapper = sent 
  ? styles.bubbleWrapperSent 
  : styles.bubbleWrapperReceived;

  return (
    <View style={{ marginBottom: '2%' }}>
      <View style={{ ...styles.bubbleWrapper, ...bubbleWrapper }}>
        <View style={{ ...styles.balloon, ...balloonColor }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000', marginBottom: 2 }}>
          {message.sentBy}
        </Text>
        <Text style={{ color: '#fff', fontSize: 18 }}>
          {message.content}
        </Text>
        </View>
      </View>
    </View>
  );
};

export default Balloon;
