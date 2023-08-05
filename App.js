import { StyleSheet, StatusBar, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './Screen/HomeScreen';
import AddTaskScreen from './Screen/AddTaskScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar backgroundColor="#a84d4d" barStyle="dark-content" />
      <View style={styles.Main_container}>
        <NavigationContainer>
            <Stack.Navigator
              initialRouteName="HomeScreen"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
            </Stack.Navigator>
          </NavigationContainer>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  Main_container: {
    flex: 1,
    backgroundColor: '#4b7570'
  }
});

