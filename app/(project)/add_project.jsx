import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddProjectForm from './AddProjectForm'

const add_project = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Enter a new Project
            </Text>
            <AddProjectForm/>
        </SafeAreaView>
    )
}

export default add_project

const styles = StyleSheet.create({
    container: {
        flex:1,
        maxHeight: "50%",
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