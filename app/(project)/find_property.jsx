import {Button, View, Text, StyleSheet, SafeAreaView} from 'react-native'
import PropertyList from './PropertyList'
import PropertyView from './PropertyView-old'
import { useState } from 'react'

const find_property = () => {
    const [showView, setShowView] = useState(false)

    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Find a Property
            </Text>
            <PropertyList/>
            {/* <PropertyView/> */}
        </SafeAreaView>
    )
}

export default find_property

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