import { useEffect, useState } from "react";
import { FlatList, Text, View, StatusBar, StyleSheet, ActivityIndicator, RefreshControl, TouchableOpacity } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useRouter } from "expo-router";
import { Property } from "../../components/Property"

const Item = ({item, onLongPress, backgroundColor, textColor}) => (
  <TouchableOpacity onLongPress={onLongPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.name}</Text>
    <Text>address: {item.address}, id: {item.id}</Text>
    <Text>comments: {item.comments}</Text>
  </TouchableOpacity>
);

const PropertyList = () => {
    const router = useRouter();

    const [selectedId, setSelectedId] = useState();

    const [Properties, setProperties] = useState([]);
    const [isLoading, setIsLoading]= useState(false);
    const db = useSQLiteContext();

    const loadProperties = async () => {
        try {
            setIsLoading(true);
            const results = await db.getAllAsync(` SELECT * FROM properties
                ORDER BY id DESC`);
            setProperties(results);
        } catch (error) {
            console.error("Database error", error);           
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadProperties();
    }, []);

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? 'royalblue' : 'lightblue';
    const color = item.id === selectedId ? 'lightblue' : 'navyblue';

    return (
      <Item
        item={item}
        onLongPress={() => {
            // alert("This should navigate to PropertyView")
            //const dataToSend = JSON.stringify(item)
            // router.navigate({pathname:'/(property)/PropertyView'})
            // router.navigate({pathname:'/(property)/PropertyView', params: {...item }})
            router.navigate({pathname:'/(property)/PropertyView', params: {...item }})
        }}
        // onLongPress={() => setSelectedId(item.id)}
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
            <Text style={styles.note}>Press and hold to select property</Text>
            <TouchableOpacity>
                <FlatList
                    data={Properties}
                    renderItem={renderItem} 
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={loadProperties} timeColor ="#007AFE" />
                    }
                    keyExtractor={(item) => item.id.toString()}
                    
                    ListEmptyComponent={<Text>No properties found</Text>}
                />
            </TouchableOpacity>
        </View>
    );
}

export default PropertyList;

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