import ParallaxScrollView from '@/components/parallax-scroll-view';
import {Text, StyleSheet, View} from 'react-native'
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import CustomPressable from '../../components/CustomPressable'

const todo_list = () => {
    return (
        <View style={{marginTop: 100}}>
            <ThemedView>
                <ThemedText style={styles.title}>
                    To Do List
                </ThemedText>
            </ThemedView>
        <Link href="/show_todo" style={{marginHorizontal: 'auto'}}
        asChild>
            <CustomPressable>
                To Do List
            </CustomPressable>
        </Link>
        <Link href="/show_complete" style={{marginHorizontal: 'auto'}}
        asChild>
            <CustomPressable>
                Complete List
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

export default todo_list;

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