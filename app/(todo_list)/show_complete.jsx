import { StyleSheet, Text } from 'react-native'
import CompleteList from './CompleteList'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const show_complete = () => {
    const [showView, setShowView] = useState(false)

    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Find Complete
            </Text>
            <CompleteList/>
        </SafeAreaView>
    )
}

export default show_complete

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