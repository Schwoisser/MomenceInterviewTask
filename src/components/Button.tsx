import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  // State to track the selected option
  const [selectedOption, setSelectedOption] = useState('option1'); // Default to first option

  // Radio button options
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  // Handle radio button press
  const handlePress = (value:any) => {
    setSelectedOption(value);
    console.log('Selected option:', value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select an Option</Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.radioContainer}
          onPress={() => handlePress(option.value)}
        >
          <View style={styles.radioCircle}>
            {selectedOption === option.value && <View style={styles.selectedDot} />}
          </View>
          <Text style={styles.radioText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.selectedText}>Selected: {selectedOption}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  radioText: {
    fontSize: 16,
  },
  selectedText: {
    fontSize: 16,
    marginTop: 20,
  },
});

export default App;