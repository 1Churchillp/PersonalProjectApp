import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {Link} from 'expo-router';

import DateTimePicker from '@react-native-community/datetimepicker';
import DateDisplay from '../../components/DateDisplay'
import DatePressable from '../../components/DatePressable';
import CustomPressable from '../../components/CustomPressable';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { globalStylesLight, globalStylesDark } from '../../styles/globalStyles';



const AddProjectForm =() => {
  const colorScheme = useColorScheme();
  const stylesForm = colorScheme === 'dark' ? globalStylesDark : globalStylesLight
  const [date, setDate] = useState(new Date());
  const [showFirstPicker, setShowFirstPicker] = useState(true);
  const [showSecondPicker, setShowSecondPicker] = useState(false);
  // const [showPicker, setShowPicker] = useState(true);
  const [form, setForm] = useState({
      name: '',
      due_date: date.toLocaleDateString(),
      comments: ''
  });
  // const onChange = (event, selectedDate) => {
  //     const currentDate = selectedDate || date;
  //     setShowPicker(false); // Hide picker on iOS after selection
  //     setDate(currentDate);
  //     setForm({ ...form, due_date: currentDate.toLocaleDateString()})
  // };
  const changeFirstPicker = (event, selectedDate) => {
    setShowFirstPicker(false);
    setDate(selectedDate);
    setForm({ ...form, due_date: selectedDate.toLocaleDateString()})
    setShowSecondPicker(true);
  }

  const changeSecondPicker = (event, selectedDate) => {
      setShowSecondPicker(false);
      setDate(selectedDate);
      setForm({ ...form, due_date: selectedDate.toLocaleDateString()})
      setShowFirstPicker(true);
  }
  // const showDatePicker = () =>{ 
  //     setShowPicker(true)
  // };

  const db= useSQLiteContext();

  const handleSubmit = async () => {
      try {
          //validate form data
          if(!form.name || !form.comments){
              throw new Error('All fields are requried');
          }
      
          await db.runAsync(
              'INSERT INTO projects (name, due_date, comments, status) VALUES (?,?,?,?)',
              [form.name, form.due_date, form.comments, 'open']
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
   
    <View style={styles.container}>        
        <TextInput
            style={[stylesForm.editContainer,stylesForm.editData, stylesForm.rowContainer]}
            placeholder="Name"
            value={form.name}
            onChangeText={(text)=> setForm({ ...form, name: text})}
        />
        <View >
          {showFirstPicker && (
              <View style={stylesForm.rowContainer}>
                <View>
                  <Text style={stylesForm.label}>Due Date:</Text>
                </View>
                <DateTimePicker
                    style={[stylesForm.editContainer,stylesForm.editData]}
                    textStyle ={stylesForm.editData}
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={changeFirstPicker}
                />     
              </View> 
          )}
                          
          {showSecondPicker && (
            <View style={stylesForm.rowContainer}>
              <View>
                <Text style={stylesForm.label}>Due Date:</Text>
              </View>
              <DateTimePicker
                  style={[stylesForm.editDateContainer,stylesForm.editDate]}
                  textStyle ={stylesForm.editDate}
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={changeSecondPicker}
              />
            </View> 
          )}
        </View>

        <TextInput
            style={[stylesForm.editContainer,stylesForm.editData, stylesForm.rowContainer]}
            placeholder="Comments"
            value={form.comments}
            onChangeText={(text)=> setForm({ ...form, comments: text})}
        />
        <Link href="/project" style={{marginHorizontal: 'auto'}}
          asChild>
            <CustomPressable onPress={handleSubmit}> 
              Add Project 
            </CustomPressable>
        </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: '90%',
    flexDirection: 'column',
    alignItems: 'center',
  }
});

export default AddProjectForm;
