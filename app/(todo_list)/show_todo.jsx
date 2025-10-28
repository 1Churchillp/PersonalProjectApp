import { StyleSheet, Text } from 'react-native'
import TodoList from './TodoList'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const show_todo = () => {
    const [showView, setShowView] = useState(false)

    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Find a To Do
            </Text>
            <TodoList/>
        </SafeAreaView>
    )
}

export default show_todo

const styles = StyleSheet.create({
    container: {
        flex:1,
        maxHeight: "75%",
        flexDirection: 'column',
    
    },
    title: {
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 26,
        marginTop: 20,
        marginBottom: 20,
    }
})