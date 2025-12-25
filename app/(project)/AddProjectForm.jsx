import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {Link} from 'expo-router';

import DateTimePicker from '@react-native-community/datetimepicker';
import DateDisplay from '../../components/DateDisplay'
import DatePressable from '../../components/DatePressable';
import CustomPressable from '../../components/CustomPressable';
import { useColorScheme } from '@/hooks/use-color-scheme';



const AddProjectForm =() => {
  const colorScheme = useColorScheme();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [form, setForm] = useState({
      name: '',
      due_date: date.toLocaleDateString(),
      comments: ''
  });
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(false); // Hide picker on iOS after selection
        setDate(currentDate);
        setForm({ ...form, due_date: currentDate.toLocaleDateString()})
    };

    const showDatePicker = () =>{ 
        setShowPicker(true)
    };

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
   
    <View>        
        <TextInput
            style={colorScheme === 'dark' ? stylesDark.input : stylesLight.input}
            placeholder="Name"
            value={form.name}
            onChangeText={(text)=> setForm({ ...form, name: text})}
        />
        <View >
          {showPicker ? (
            <View style={styles.sideContainer}>
              <View>
                <Text style={colorScheme === 'dark' ? stylesDark.label : stylesLight.label}>Due Date:</Text>
              </View>
              <View>
                <DateTimePicker
                  style={colorScheme === 'dark' ? stylesDark.input : stylesLight.input}
                  testID="dateTimePicker"
                  value={date}
                  mode="date" // Can be 'date', 'time', or 'datetime'
                  display="default" // On Android, 'default' or 'spinner'. On iOS, 'default' or 'spinner'
                  onChange={onChange}
                  open={true}
                />
              </View>
            </View>  
            ):(
            <View style={styles.sideContainer}>
              <View>
                <Text style={colorScheme === 'dark' ? stylesDark.label : stylesLight.label}>Due Date:</Text>
              </View>
              <View>
                <DateDisplay 
                  style={colorScheme === 'dark' ? stylesDark.date : stylesLight.date}
                  onPress={showDatePicker}
                  date={date.toLocaleDateString()}>
                </DateDisplay>
              </View>
            </View>
          )}
          {/* < Button onPress={showDatePicker} title="Tap to Change Due Date" /> */}
        </View>

        <TextInput
            style={colorScheme === 'dark' ? stylesDark.input : stylesLight.input}
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
    input: {
        height: 80,
        borderColor: '#fff',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        fontSize: 36
    },
    sideContainer: {
        flexDirection: 'row', // Arranges children horizontally
        justifyContent: 'flex-start', // Left Justify
        alignItems: 'center', // Aligns items vertically in the center
        padding: 0,
        maxWidth: '90%',
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

const stylesLight = StyleSheet.create({
    label: {
        height: 40,
        borderColor: 'black',
        borderWidth: 0,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'black',
        fontSize: 30
    },
    date: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'black',
        fontSize: 30
    },
    input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'black',
        fontSize: 30

    },
    sideContainer: {
        flexDirection: 'row', // Arranges children horizontally
        justifyContent: 'space-around', // Distributes space between items
        alignItems: 'center', // Aligns items vertically in the center
        padding: 10,
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

const stylesDark = StyleSheet.create({
    date: {
        height: 40,
        borderColor: '#fff',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'white',
        fontSize: 30

    },
    label: {
        height: 40,
        borderColor: '#fff',
        borderWidth: 0,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'white',
        fontSize: 30

    },
    input: {
        height: 40,
        borderColor: '#fff',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'white',
        fontSize: 30

    },
    sideContainer: {
        flexDirection: 'row', // Arranges children horizontally
        justifyContent: 'space-around', // Distributes space between items
        alignItems: 'center', // Aligns items vertically in the center
        padding: 10,
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
