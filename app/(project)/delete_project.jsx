import { StyleSheet, Text } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import ProjectListDelete from "./ProjectListDelete"

const delete_project = () => {

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Delete Project
            </Text>
            <ProjectListDelete/>
        </SafeAreaView>
    )
}

export default delete_project

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