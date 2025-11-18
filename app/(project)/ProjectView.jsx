import { useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


const DisplayGroup = ({project, onChangeText, isEditMode}) => {
    if (isEditMode){
        return(  
                <View>
                    <Text style={styles.title}>Edit Mode Project</Text>
                    <TextInput
                        title="Name:"
                        style={styles.editMode}
                        value={project.name}
                        onChangeText={onChangeText[0]}
                    />
                    <TextInput
                        title="Status:"
                        style={styles.editMode}
                        value={project.status}
                        onChangeText={onChangeText[1]}
                    />
                    <TextInput
                        title="DueDate:"
                        style={styles.editMode}
                        value={project.due_date}
                        onChangeText={onChangeText[2]}
                    />
                    <TextInput
                        title="Comments:"
                        style={styles.editMode}
                        value={project.comments}
                        onChangeText={onChangeText[3]}
                    />
                    <TextInput
                        title="Id:"
                        style={styles.display}
                        value={project.id}
                        editable={false}            
                    />
                </View>
        )
    } else {
        return(
            <View>    
                <Text style={styles.title}>View Mode Project</Text>
                <TextInput
                    title="Name:"
                    value={project.name} 
                    style={styles.display}
                    editable={false}
                    placeholder="You are in view mode"/>
                <TextInput
                    title="Status:"
                    value={project.status} 
                    style={styles.display}
                    editable={false}
                    placeholder="You are in view mode"/>
                <TextInput
                    title="DueDate:"
                    value={project.due_date} 
                    style={styles.display}
                    editable={false}
                    placeholder="You are in view mode"/>
                <TextInput
                    title="Comments:"
                    value={project.comments} 
                    style={styles.display}
                    editable={false}
                    placeholder="You are in view mode"/>
                <TextInput
                    title="Id:"
                    value={project.id} 
                    style={styles.display}
                    editable={false}
                    placeholder="You are in view mode"/>
            </View>
        )
    }
}

const PropertyView = () =>{
    const {id, name, due_date, comments} = useLocalSearchParams()
    const [editMode, setEditMode] = useState(false)
    const [form, setForm] = useState({
        id: id,
        name: name,
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
            
            const newName = form.name
            const newDueDate = form.due_date
            const newComments = form.comments

            await db.runAsync(                
                `UPDATE projects SET name =?, due_date=?, comments =? WHERE id = ?`,
                [newName, newDueDate, newComments, Number(id)]
            )

            Alert.alert('Success', 'Property editted successfully!')
            setForm({
                name: newName,
                due_date: newDueDate,
                comments: newComments,
                // id: keyId
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
        <View style={styles.container}>
            <DisplayGroup
                project={form}
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