import { useSQLiteContext } from 'expo-sqlite';
import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';


const AddProjectForm =() => {
  const [form, setForm] = useState({
      name: '',
      due_date: '',
      comments: ''
  });

    const db= useSQLiteContext();

    const handleSubmit = async () => {
        try {
            //validate form data
            if(!form.name || !form.comments){
                throw new Error('All fields are requried');
            }
        
            await db.runAsync(
                'INSERT INTO projects (name, due_date, comments) VALUES (?,?,?)',
                [form.name, form.due_date, form.comments]
            );

            Alert.alert('Success', 'Project added successfully!');
            setForm({
                name: '',
                due_date: '',
                comments: ''
            });
        } catch(error){
            console.error(error);
            Alert.alert('Error', error.message || 'An error occuuued while adding the project.');
        }
    };

  return (
   
    <View>        
        <TextInput
            style={styles.input}
            placeholder="Name"
            value={form.name}
            onChangeText={(text)=> setForm({ ...form, name: text})}
        />
        <TextInput
            style={styles.input}
            placeholder="Due Date"
            value={form.due_date}
            onChangeText={(text)=> setForm({ ...form, due_date: text})}
        />
        <TextInput
            style={styles.input}
            placeholder="Comments"
            value={form.comments}
            onChangeText={(text)=> setForm({ ...form, comments: text})}
        />
        <Button 
            title="Add Project" 
            onPress={handleSubmit}> 
        </Button>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddinf: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        height: 40,
        borderColor: '#fff',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
  addButton: {
    backgroundColor: 'pink',
    borderRadius: 5,
    padding: 10,
  },
  addButtonText: {
    fontSize: 18,
    color: 'black',
  },
});

export default AddProjectForm;
