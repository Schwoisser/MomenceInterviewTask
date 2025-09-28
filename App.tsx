import { StatusBar, StyleSheet, useColorScheme, Text } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { QueryClientProvider} from '@tanstack/react-query';

import HomeScreen from './src/screens/HomeScreen';
import {queryClient} from './src/query/queryClient'




function App() {
  const isDarkMode = false;

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <QueryClientProvider client={queryClient}>
        <Text>hhhds fadsf</Text>
        <HomeScreen />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
