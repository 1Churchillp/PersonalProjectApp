import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {Dropdown } from 'react-native-element-dropdown'


// const data = [
//     {label: 'option 1', value: '1' },
//     {label: 'option 2', value: '2'},
// ]

const data = [
    {label: 'open', value: '1' },
    {label: 'closed', value: '2'},
]

// export type StatusDropdownProps = {
//   type?: 'default'  |'Status',
// }

const StatusDropdown = ({input='input',onChangeText={}, ...props}) => {
    const [value, setValue] = useState(null)

return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Select an Option:</Text> */}
      {/* <Text> {input} </Text> */}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        // data={data}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        value={value}
        onChange={item => {
          setValue(item.value)
          return item.label;
        }}
      />
      {/* {value && <Text style={styles.selectedValue}>Selected: {value === '1' ? 'open' : 'closed'}</Text>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
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