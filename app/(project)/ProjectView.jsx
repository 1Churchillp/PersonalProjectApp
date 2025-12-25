import { useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import StatusDropdown from '../../components/StatusDropdown'
import { globalStylesDark, globalStylesLight } from '../../styles/globalStyles';

import { useColorScheme } from '@/hooks/use-color-scheme';

const DisplayGroup = ({project, onChangeText, isEditMode, styles}) => {
    if (isEditMode){
        return(  
                <View >
                    <Text style={styles.title}>Edit Mode Project</Text>
                    <TextInput
                        title="Name:"
                        style={[styles.editContainer,styles.editData]}
                        value={project.name}
                        onChangeText={onChangeText[0]}
                    />
                    <StatusDropdown 
                        viewStyle={styles.editContainer}
                        textStyle={styles.editData}
                        type= 'Status'
                        input={project.status}
                        onSelectChange={onChangeText[1]}
                        valueIn={project.status === 'open' ? 1 : 2}>
                    </StatusDropdown>
                    {/* <TextInput
                        title="Status:"
                        style={styles.editData}
                        value={project.status}
                        onChangeText={onChangeText[1]}
                    /> */}
                    <TextInput
                        title="DueDate:"
                        style={[styles.editContainer,styles.editData]}
                        value={project.due_date}
                        onChangeText={onChangeText[2]}
                    />
                    <TextInput
                        title="Comments:"
                        style={[styles.editContainer,styles.editData]}
                        value={project.comments}
                        onChangeText={onChangeText[3]}
                    />
                    <TextInput
                        title="Id:"
                        style={styles.viewData}
                        value={project.id}
                        editable={false}            
                    />
                </View>
        )
    } else {
        return(
            <View>    
                
                <Text style={styles.title}>View Mode Project</Text>
                
                <View style={styles.rowContainer}>
                    <View>
                        <Text style={styles.label}>Name:</Text>
                    </View>
                    <View>
                        <TextInput
                            title="Name:"
                            value={project.name} 
                            style={styles.viewData}
                            editable={false}
                            placeholder="You are in view mode"/>
                    </View>
                </View>

                <View style={styles.rowContainer}>
                    <View>
                        <Text style={styles.label}>Status:</Text>
                    </View>
                    <View>
                    <TextInput
                        title="Status:"
                        value={project.status} 
                        style={styles.viewData}
                        editable={false}
                        placeholder="You are in view mode"/>
                    </View>
                </View>   
                
                <View style={styles.rowContainer}>
                    <View>
                        <Text style={styles.label}>Due Date:</Text>
                    </View>
                    <View>                             
                    <TextInput
                        title="DueDate:"
                        value={project.due_date} 
                        style={styles.viewData}
                        editable={false}
                        placeholder="You are in view mode"/>
                    </View>                
                </View> 

                <View style={styles.rowContainer}>
                    <View>
                        <Text style={styles.label}>Comments:</Text>
                    </View>
                    <View>                               
                        <TextInput
                            title="Comments:"
                            value={project.comments} 
                            style={styles.viewData}
                            editable={false}
                            placeholder="You are in view mode"/>
                    </View>                
                </View> 
                <View style={styles.rowContainer}>
                    <View>
                        <Text style={styles.label}>Id:</Text>
                    </View>
                    <View>
                        <TextInput
                            title="Id:"
                            value={project.id} 
                            style={styles.viewData}
                            editable={false}
                            placeholder="You are in view mode"/>
                    </View>                
                </View> 
            </View>
        )
    }
}

const PropertyView = () =>{
    const colorScheme = useColorScheme()
    const {id, name, status, due_date, comments} = useLocalSearchParams()
    const [editMode, setEditMode] = useState(false)
    const [form, setForm] = useState({
        id: id,
        name: name,
        status: status,
        due_date: due_date,
        comments: comments
    })

    const db = useSQLiteContext()

    const onChangeTextArray = [
        (text) => setForm({...form, name: text}),
        (text) => setForm({...form, status: text}),
        (text) => setForm({...form, due_date: text}),
        (text) => setForm({...form, comments: text}),
    ]
    
    const handleSave = async ()=>{
        // alert("This should handle project update")
        
        try{
            // validate form data
            if(!form.name || !form.due_date || !form.comments){
                throw new Error('All fields are required')
            }

            // validate status
            if(form.status !== 'open' && form.status !== 'closed' && form.status !== 'Open' && form.status !== 'Closed' ){
                throw new Error('status must be "open" or "closed"')
            }
            
            const newId = form.id
            const newName = form.name
            const newStatus = form.status
            const newDueDate = form.due_date
            const newComments = form.comments

            await db.runAsync(                
                `UPDATE projects SET name =?, due_date=?, status=?, comments =? WHERE id = ?`,
                [newName, newDueDate, newStatus, newComments, Number(id)]
            )

            Alert.alert('Success', 'Property editted successfully!')
            setForm({
                name: newName,
                due_date: newDueDate,
                status: newStatus,
                comments: newComments,
                id: newId
            })
        } catch(error){
            console.error(error);
            Alert.alert('Error', error.message || 'An error occuuued while editting the project.');
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
        <ThemedView style={styles.container}>
            <DisplayGroup
                project={form}
                // onChangeText={(text)=> setForm({ ...form, name: text})}
                onChangeText={onChangeTextArray}
                isEditMode={editMode}
                styles={colorScheme === 'dark' ? globalStylesDark: globalStylesLight}
            />
            <ButtonGroup/>        
        </ThemedView>
    )

}

export default PropertyView;
const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center' ,
        // tint: '#0a7ea4',
        // marginTop: StatusBar.currentHeight || 0,
    },
    rowContainer: {
        padding: '1px',
        flexDirection: 'row',
        maxWidth: '90%',
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
})


const stylesLight = StyleSheet.create({
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

const stylesDark = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center' ,
        // marginTop: StatusBar.currentHeight || 0,
    },
    editMode: {
        height: 40,
        borderColor: 'white',
        color: 'white',
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