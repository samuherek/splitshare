import React from 'react';
import { View, Text, Button } from 'react-native';

const App: React.FC = () => {
  const [counter, setCount] = React.useState(0);

  return (
    <View>
      <Text>Hello world</Text>
      <Text>{counter}</Text>
      <Button title="increment" onPress={() => setCount(counter + 1)} />
    </View>
  );
};

export default App;
