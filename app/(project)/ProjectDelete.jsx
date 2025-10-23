import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


const DisplayGroup = ({project, onChangeText, isDeleteMode}) => {
        if(isDeleteMode){ 
        return(
            <View>
                <Text style={styles.title}>Delete Mode</Text>
                <TextInput
                    title="Name:"
                    value={project.name} 
                    style={styles.display}
                    placeholder="You are in delete mode"/>
                <TextInput
                    title="Due Date:"
                    value={project.due_date} 
                    style={styles.display}
                    placeholder="You are in delete mode"/>
                <TextInput
                    title="Comments:"
                    value={project.comments} 
                    style={styles.display}
                    placeholder="You are in delete mode"/>
                <TextInput
                    title="Id:"
                    value={project.id} 
                    style={styles.display}
                    placeholder="You are in delete mode"/>
            </View>
        )
    } else {
             return(    
                <View>
                    <Text style={styles.title}>Something went wrong</Text>
                </View>
            )
    }
}

const ProjectDelete = () =>{
    const {id, name, due_date, comments} = useLocalSearchParams()
    const [deleteMode, setDeleteMode] = useState(true)
    const [form, setForm] = useState({
        id: id,
        name: name,
        due_date: due_date,
        comments: comments
    })
    const router = useRouter()

    const db = useSQLiteContext()

    // const onChangeTextArray = [
    //     (text) => setForm({...form, name: text}),
    //     (text) => setForm({...form, due_date: text}),
    //     (text) => setForm({...form, comments: text}),
    // ]
    
    const handleDelete = async ()=>{
        // alert("This should handle project delete")
        
        try{
            // validate form data
            // if(!form.name || !form.due_date || !form.comments){
            //     throw new Error('All fields are required')
            // }
            
            const newName = form.name
            const newDueDate = form.due_date
            const newComments = form.comments

            await db.runAsync(                
                `DELETE FROM projects WHERE id = ?`,
                [Number(id)]
            )

            Alert.alert('Success', 'Project deleted successfully!')
            setForm({
                name: newName,
                due_date: newDueDate,
                comments: newComments,
                // id: keyId
            })
        } catch(error){
            console.error(error);
            Alert.alert('Error', error.message || 'An error occurred while deleteting the project.');
        }

        setDeleteMode(false)
        router.back()
    }

    const ButtonGroup =()=>{
            return(
                <View>
                    <Text style={styles.title}>Are you sure you want to delete this project?</Text>
    
                    <View style={styles.buttonGroup}>
        
                        <TouchableOpacity 
                            style={styles.item}
                            onPress={()=> {handleDelete()}}>
                            <Text style={styles.buttonText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.item}
                            onPress={()=> {router.back()}}>
                            <Text style={styles.buttonText}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
    }


    return (
        <View style={styles.container}>
            <DisplayGroup
                project={form}
                // onChangeText={(text)=> setForm({ ...form, name: text})}
                // onChangeText={onChangeTextArray}
                isDeleteMode={deleteMode}
            />
            <ButtonGroup/>        
        </View>
    )

}

export default ProjectDelete;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center' ,
    },
    deleteMode: {
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
});