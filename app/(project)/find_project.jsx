import { StyleSheet, Text } from 'react-native'
import ProjectList from './ProjectList'
// import ProjectView from './ProjectView-old'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const find_project = () => {
    const [showView, setShowView] = useState(false)

    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Find a Project
            </Text>
            <ProjectList/>
        </SafeAreaView>
    )
}

export default find_project

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