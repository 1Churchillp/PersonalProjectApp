import { StyleSheet, Text } from 'react-native'
import TodoList from './TodoList'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColorScheme } from '@/hooks/use-color-scheme';

import { globalStylesLight, globalStylesDark } from '../../styles/globalStyles'

const show_todo = () => {
    const [showView, setShowView] = useState(false)
    const colorScheme = useColorScheme()
    // const styleForm = {colorScheme === 'dark' ? globalStylesDark : globalStylesLight}
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={colorScheme === 'dark' ? globalStylesDark.title : globalStylesLight.title}>
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
        marginBottom: 20,
    }
})