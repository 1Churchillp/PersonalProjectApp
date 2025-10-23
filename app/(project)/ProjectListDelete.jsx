import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Item = ({item, onLongPress, backgroundColor, textColor}) => (
  <TouchableOpacity onLongPress={onLongPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.name}</Text>
    <Text>due date: {item.due_date}, id: {item.id}</Text>
    <Text>comments: {item.comments}</Text>
  </TouchableOpacity>
);

const ProjectListDelete = () => {
    const router = useRouter()

    const [selectedId, setSelectedId] = useState()
    const [Projects, setProjects] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const db = useSQLiteContext()

    const loadProjects = async () => {
        try {
            setIsLoading(true)
            const results = await db.getAllAsync(` SELECT * FROM projects ORDER BY id DESC`)
            setProjects(results)
        } catch (error){
            console.error("Database error", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadProjects()
    }, [])

    const renderItem = ({item}) => {
        const backgroundColor = 'lightblue'
        const color = 'navyblue'
        return(
            <Item
                item={item}
                onLongPress={()=>{
                    router.navigate({pathname:'/(project)/ProjectDelete', params: {...item}})
                }}
                backgroundColor={backgroundColor}
                color={color}
                />
        )

    }

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />
    }

    return(
        <View>
            <Text
                style={styles.note}>
                    Press and hold to select a project
            </Text>
            <TouchableOpacity>
                <FlatList
                    data={Projects}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={loadProjects} timeColor ="#007AFE" />
                    }
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={<Text>No projects found</Text>}
                    />
            </TouchableOpacity>
        </View>
    )

}

export default ProjectListDelete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  note: {
    fontSize: 16,
    textAlign: 'center',
  },
});