import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0c29',
        paddingTop: 28,
        paddingHorizontal: 20,
      },
      header: {
        alignItems: 'center',
        marginBottom: 20,
      },
      logo: {
        width: 95,
        height: 95,
        resizeMode: 'contain',
        marginBottom: 10,
      },
      title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
      },
      chat: {
        flex: 1,
        marginBottom: 10,
      },
      bubble: {
        padding: 12,
        marginVertical: 6,
        borderRadius: 12,
        maxWidth: '80%',
      },
      userBubble: {
        backgroundColor: '#4e54c8',
        alignSelf: 'flex-end',
      },
      iaBubble: {
        backgroundColor: '#8f94fb',
        alignSelf: 'flex-start',
      },
      bubbleText: {
        color: '#fff',
        fontSize: 16,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
      input: {
        flex: 1,
        height: 45,
        width: '80%',
        borderColor: '#555',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        color: '#fff',
      },
      button: {
        backgroundColor: '#4e54c8',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginLeft: 10,
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
    });

    export default styles;