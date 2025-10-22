// ..styles/GlobalSyles.jsx
import { StyleSheet } from 'react-native'

export const globalStyles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
      },
    title: {
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 26,
    },
    button: {
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: 'rgba(30, 7, 228, 0.75)',
        width: 185,
        padding: 6,
        borderWidth: 1,
        borderColor: 'lightgreen'
    },
    buttonText: {
        color: 'springgreen',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 4,
    }
})

export const globalPressableStyles = StyleSheet.create({
    basePressable: {
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: 'rgba(30, 7, 228, 0.75)',
        width: 185,
        padding: 6,
        borderWidth: 1,
        borderColor: 'lightgreen',
        // backgroundColor: '#007bff', // Default background color
        // paddingVertical: 12,
        // paddingHorizontal: 20,
        // borderRadius: 5,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    pressedState: {
        opacity: 0.7, // Reduce opacity when pressed
    },
    textStyle: {
        color: 'springgreen',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 4,
    },
});