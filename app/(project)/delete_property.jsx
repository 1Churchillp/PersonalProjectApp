import { Text, SafeAreaView, StyleSheet } from "react-native"
import PropertyListDelete from "./PropertyListDelete"

const delete_property = () => {

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Delete Property
            </Text>
            <PropertyListDelete/>
        </SafeAreaView>
    )
}

export default delete_property

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