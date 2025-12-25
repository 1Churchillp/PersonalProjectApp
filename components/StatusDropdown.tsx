import React, { useState} from "react";
import { Alert, StyleProp, StyleSheet, Text, TextStyle, ViewStyle, View } from "react-native";
import {Dropdown } from 'react-native-element-dropdown'


const data = [
    {label: 'option 1', value: '1' },
    {label: 'option 2', value: '2'},
]

const status = [
    // {label: 'Select status', value: '0' },
    {label: 'open', value: '1' },
    {label: 'closed', value: '2'},
]
type CallbackFunction = (selection:string) => string

export type StatusDropdownProps = {
  viewStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  onSelectChange : CallbackFunction
  type?: 'default'  |'Status',
  valueIn?: 0| 1 | 2
  // valueIn?: null|'Select status' | 'open' | 'closed'
  // valueIn?:React.SetStateAction<null>
} 

export function StatusDropdown ({
  viewStyle,
  textStyle,
  onSelectChange,
  type = 'default',
  valueIn = 0,
  // valueIn(0),
} : StatusDropdownProps) {

  const [dataType, setDataType] = useState ('default')
  const [value, setValue] = useState(null)
  const handleChange = (curr_value:React.SetStateAction<null>, label:string) => {
    setValue(curr_value)
    onSelectChange(label)
  }

  return (
      <View >
        {/* <Text style={styles.label}>Select an Option: {valueIn} </Text> */}
        <Dropdown
          style={viewStyle}
          // containerStyle={viewStyle}
          // itemTextStyle={[textStyle, {color: 'black'}]}
          // placeholderStyle={styles.placeholderStyle}
          // selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={textStyle}
          selectedTextStyle={textStyle}
          // data={data}
          data={type == 'Status' ? status : data}
          labelField="label"
          valueField="value"
          placeholder={valueIn === 0 ? "Select item": valueIn === 1 ? 'open' : 'closed'}
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
    // backgroundColor: '#fff',
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
    fontSize: 24,
  },
  selectedTextStyle: {
    fontSize: 24,
  },
  selectedValue: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StatusDropdown;