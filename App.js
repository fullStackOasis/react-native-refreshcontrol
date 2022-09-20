import React from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList } from 'react-native';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const PAGE_INCREMENT = 10;

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = React.useState(0);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setPage(page + PAGE_INCREMENT);
    wait(2000).then(() => {
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
        onRefresh={onRefresh}
        refreshing={refreshing}
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
    flex: 1,
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