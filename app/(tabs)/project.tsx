import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CustomPressable from '../../components/CustomPressable'

const project = () => {
  return (
    <View style={{marginTop: 100}}>
      <Text style={styles.title}>Projects</Text>
        <Link href="/add_project" style={{marginHorizontal: 'auto'}}
        asChild>
            <CustomPressable>
                New Project
            </CustomPressable>
        </Link>
        <Link href="/find_project" style={{marginHorizontal: 'auto'}}
        asChild>
            <CustomPressable>
                Find Project
            </CustomPressable>
        </Link>
        <Link href="/delete_project" style={{marginHorizontal: 'auto'}}
        asChild>
            <CustomPressable>
                Delete Project
            </CustomPressable>
        </Link>
        <Link href="/" style={{marginHorizontal: 'auto'}}
        asChild>
            <CustomPressable>
                Home
            </CustomPressable>
        </Link>
    </View>
  )
}

export default project

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 26,
  },
  button: {
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(30, 7, 228, 0.75)',
    width: 175,
    padding: 6,
  },
  buttonText: {
    color: 'springgreen',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
  }
})