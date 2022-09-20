import React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const PAGE_INCREMENT = 10;

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <Text>Pull down to see RefreshControl indicator</Text>
        <Text>{`You are on page ${page}`}</Text>
      </ScrollView>
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
});

export default App;