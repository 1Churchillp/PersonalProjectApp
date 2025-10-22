import { View, Text, StyleSheet,TouchableOpacity, TextInput, Alert } from "react-native"
import React, { useState } from "react"
import { useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from "expo-sqlite";


const DisplayGroup = ({property, onChangeText, isEditMode}) => {
    if (isEditMode){
        return(  
                <View>
                    <Text style={styles.title}>Edit Mode Property</Text>
                    <TextInput
                        title="Name:"
                        style={styles.editMode}
                        value={property.name}
                        onChangeText={onChangeText[0]}
                    />
                    <TextInput
                        title="Address:"
                        style={styles.editMode}
                        value={property.address}
                        onChangeText={onChangeText[1]}
                    />
                    <TextInput
                        title="Comments:"
                        style={styles.editMode}
                        value={property.comments}
                        onChangeText={onChangeText[2]}
                    />
                    <TextInput
                        title="Id:"
                        style={styles.display}
                        value={property.id}
                        editable={false}            
                    />
                </View>
        )
    } else {
        return(
            <View>    
                <Text style={styles.title}>View Mode Property</Text>
                <TextInput
                    title="Name:"
                    value={property.name} 
                    style={styles.display}
                    editable={false}
                    placeholder="You are in view mode"/>
                <TextInput
                    title="Address:"
                    value={property.address} 
                    style={styles.display}
                    editable={false}
                    placeholder="You are in view mode"/>
                <TextInput
                    title="Comments:"
                    value={property.comments} 
                    style={styles.display}
                    editable={false}
                    placeholder="You are in view mode"/>
                <TextInput
                    title="Id:"
                    value={property.id} 
                    style={styles.display}
                    editable={false}
                    placeholder="You are in view mode"/>
            </View>
        )
    }
}

const PropertyView = () =>{
    const {id, name, address, comments} = useLocalSearchParams()
    const [editMode, setEditMode] = useState(false)
    const [form, setForm] = useState({
        id: id,
        name: name,
        address: address,
        comments: comments
    })

    const db = useSQLiteContext()

    const onChangeTextArray = [
        (text) => setForm({...form, name: text}),
        (text) => setForm({...form, address: text}),
        (text) => setForm({...form, comments: text}),
    ]
    
    const handleSave = async ()=>{
        // alert("This should handle property update")
        
        try{
            // validate form data
            if(!form.name || !form.address || !form.comments){
                throw new Error('All fields are required')
            }
            
            const newName = form.name
            const newAddress = form.address
            const newComments = form.comments

            await db.runAsync(                
                `UPDATE properties SET name =?, address=?, comments =? WHERE id = ?`,
                [newName, newAddress, newComments, Number(id)]
            )

            Alert.alert('Success', 'Property editted successfully!')
            setForm({
                name: newName,
                address: newAddress,
                comments: newComments,
                // id: keyId
            })
        } catch(error){
            console.error(error);
            Alert.alert('Error', error.message || 'An error occuuued while editting the property.');
        }

        setEditMode(false)
    }

    const ButtonGroup =()=>{
        if (editMode){
            return(
                <View style={styles.buttonGroup}>
                    <TouchableOpacity 
                        style={styles.item}
                        onPress={()=> {handleSave()}}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.item}
                        onPress={()=> {setEditMode(false)}}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return(
                <View style={styles.buttonGroup}>
                    <TouchableOpacity 
                        style={styles.item}
                        onPress={()=> {setEditMode(true)}}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }


    return (
        <View style={styles.container}>
            <DisplayGroup
                property={form}
                // onChangeText={(text)=> setForm({ ...form, name: text})}
                onChangeText={onChangeTextArray}
                isEditMode={editMode}
            />
            <ButtonGroup/>        
        </View>
    )

}

export default PropertyView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center' ,
        // marginTop: StatusBar.currentHeight || 0,
    },
    editMode: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        fontSize: 24,
    },
    display: {
        height: 40,
        borderColor: '#fff',
        color: 'darkgrey',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        fontSize: 24,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 2,
        backgroundColor: 'royalblue',
    },
    buttonGroup: {
        padding: '1px',
        flexDirection: 'row',
        maxWidth: '90%',
    // color: 'black',
    // fontSize: 48,
    // alignItems: 'stretch',
    // justifyContent: 'flex-start',
    // display: 'flex',
    },
    buttonText: {
        color: 'lightblue',
        fontSize: 24,
    },
    title: {
        marginBottom: "20px",
        fontSize: 24,
        color: 'royalblue',
    },
});