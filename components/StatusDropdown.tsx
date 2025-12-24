import React, { useState} from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import {Dropdown } from 'react-native-element-dropdown'


const data = [
    {label: 'option 1', value: '1' },
    {label: 'option 2', value: '2'},
]

const status = [
    {label: 'open', value: '1' },
    {label: 'closed', value: '2'},
]
type CallbackFunction = (selection:string) => string

export type StatusDropdownProps = {
  onSelectChange : CallbackFunction
  type?: 'default'  |'Status',
} 

export function StatusDropdown ({
  onSelectChange,
  type = 'default'
} : StatusDropdownProps) {

  const [dataType, setDataType] = useState ('default')
  const [value, setValue] = useState(null)
  const handleChange = (curr_value:React.SetStateAction<null>, label:string) => {
    setValue(curr_value)
    onSelectChange(label)
  }

  return (
      <View style={styles.container}>
        {/* <Text style={styles.label}>Select an Option:</Text> */}
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          // data={data}
          data={type == 'Status' ? status : data}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          value={value}
          onChange={item => {
            // 'setValue(item.value);
            handleChange(item.value, item.label)}
          }
        />
        {/* {value && <Text style={styles.selectedValue}>Selected: {value === '1' ? 'open' : 'closed'}</Text>} */}
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: '#fff',
  },
  dropdown: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        fontSize: 24,
        borderRadius: 5,
    // height: 50,
    // borderColor: 'gray',
    // borderWidth: 0.5,
    // borderRadius: 8,
    // paddingHorizontal: 8,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  selectedValue: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StatusDropdown;