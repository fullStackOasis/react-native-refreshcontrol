import React, { useEffect, useState }  from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { messageRoot } from "./config/myconfig";
import database from '@react-native-firebase/database';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const PAGE_INCREMENT = 10;

/**
 * Returns a string formatted date for display,
 * like Thursday January 13 2022 10:58:46 AM
 * Expects a valid JavaScript time number.
 */
 const getNiceDateString = (createdAt) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
      timeZone: "America/Los_Angeles" };
  const d = new Date(-createdAt).toLocaleString("en-US", options).toString();
  const noCommas = d.replace(/,/g, "");
  return noCommas;
};

const Item = ({ item, onPress, backgroundColor, textColor }) => {
  return (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{getNiceDateString(item.createdAt)} {item.content?.text}</Text>
  </TouchableOpacity>
)};



const App = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  useEffect(() => {
    // console.log(messageRoot);
    const reference = database().ref(messageRoot);
    // order by "createdAt" field in each child,
    // and limit to the first 10 in the result.
    reference.orderByChild("createdAt")
      .limitToFirst(10)
      .once('value', snapshot => {
      const arr = [];
      // You have to use snapshot.forEach to keep the ordering,
      // but if you do that, then you lose the key. Is there some
      // way to retain the key.
      snapshot.forEach((msg, i) => {
        // msg is a DataSnapshot, you must turn it into an Object using .val().
        const obj = msg.val();
        arr.push(obj);
      });
      setData(arr);
      /*
      if you do it this way, then you lose the ordering.
      const values = snapshot.val();
      if (values) {
        const arr = [];
        Object.keys(values).forEach((message) => {
          values[message].id = message;
          arr.push(values[message]);
        });
        console.log('User data: ' + arr.length);
        setData(arr);
      }
      */
    });
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setPage(page + PAGE_INCREMENT);
    wait(2000).then(() => { // not in use
      console.log("page? " + page);
      setRefreshing(false);
    });
  }, [page]);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
      <SafeAreaView style={styles.container}>
        <Text>Pull down to see RefreshControl indicator</Text>
        <Text>{`You are on page ${page}`}</Text>
        <FlatList
          contentContainerStyle={styles.scrollView}
          //onRefresh={onRefresh}
          //refreshing={refreshing}
          data={data}
          renderItem={renderItem}
        >
        </FlatList>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default App;