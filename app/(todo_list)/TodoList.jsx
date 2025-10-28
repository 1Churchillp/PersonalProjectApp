import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Project } from "../../components/Project"

const Item = ({item, onLongPress, backgroundColor, textColor}) => (
  <TouchableOpacity onLongPress={onLongPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.name}</Text>
    <Text>due date: {item.due_date}, id: {item.id}</Text>
    <Text>comments: {item.comments}</Text>
  </TouchableOpacity>
);

const ProjectList = () => {
    const router = useRouter();

    const [selectedId, setSelectedId] = useState();

    const [Projects, setProjects] = useState([]);
    const [isLoading, setIsLoading]= useState(false);
    const db = useSQLiteContext();

    const loadProjects = async () => {
        try {
            setIsLoading(true);
            const results = await db.getAllAsync(` SELECT * FROM projects
                ORDER BY id DESC`);
            setProjects(results);
        } catch (error) {
            console.error("Database error", error);           
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? 'royalblue' : 'lightblue';
    const color = item.id === selectedId ? 'lightblue' : 'navyblue';

    return (
      <Item
        item={item}
        onLongPress={() => {
            router.navigate({pathname:'/(project)/ProjectView', params: {...item }})
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      >
      </Item>
    );
  };

    if (isLoading){
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return(
        <View>
            <Text style={styles.note}>Press and hold to select project</Text>
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
    );
}

export default ProjectList;

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