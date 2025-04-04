import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    padding: 10,
  },
  messageTextInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  messageTextInput: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#4fd1c5',
    borderRadius: 20,
    padding: 10,
    width: 60, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleWrapper: {
    flexDirection: 'column',
  },
  bubbleWrapperSent: {
    alignSelf: 'flex-end',
    marginLeft: 40,
  },
  bubbleWrapperReceived: {
    alignSelf: 'flex-start',
    marginRight: 40,
  },
  balloon: {
    padding: 8,
    borderRadius: 16,
  },
  balloonSent: {
    backgroundColor: '#4fd1c5',
  },
  balloonReceived: {
    backgroundColor: '#ffffff',
  },
  balloonText: {
    fontSize: 16,
  },
  balloonTextSent: {
    color: '#000',
  },
  balloonTextReceived: {
    color: '#000',
  },
});

export default styles;
