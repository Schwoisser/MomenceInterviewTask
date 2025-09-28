import React, { useState } from 'react';
import { View, Text, ActivityIndicator,  FlatList, StyleSheet, TouchableOpacity, TextInput, } from 'react-native';
import { useExchangeRates, CsvRow, CsvData } from '../api/queries';




const HomeScreen: React.FC = () => {

  // Hooks
  const { data, isLoading, error } = useExchangeRates();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedExchangeRate, setSelectedExchangeRate] = useState<string | null>(null);
  const [czk_amount, onChangeInput] = useState('');
  console.log("test");
  // Handle loading and error states
  if (isLoading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error.message}</Text>;


  // Transform data to string[][]
  const options: string[][] = data?.data ? data?.data.slice(1).map((row:CsvRow) => Object.values(row)) // Convert each CsvRow to string[]
  : []; // Provide empty array if undefined


  type ItemProps = {
    item: Array<String>;
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
  };

  const ExchangeRateRadioButton = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item[0] + " " + item[1] + " " + item[4]}</Text>
  </TouchableOpacity>
  );

  const renderExchangeRateRadioButton = ({item}: {item: Array<String>}) => {
    const backgroundColor = item[1] === selectedId ? '#aaaa' : '#dddd';
    const color = item[1] === selectedId ? 'white' : 'black';

    return (
      <ExchangeRateRadioButton
        item={item}
        onPress={() => {setSelectedId(String(item[1])); setSelectedExchangeRate(String(item[4])); } }
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const calculateExchangeRate = ()=> { 
    const currentSelectedExchangeRate = parseFloat(String(selectedExchangeRate));
    const currentCzkAmount = parseFloat(String(czk_amount));
    if (currentSelectedExchangeRate == 0 || currentCzkAmount == 0){
      return 0
    }
    if(!Number.isNaN(currentSelectedExchangeRate) && !Number.isNaN(currentCzkAmount) ){
      const amount_in_selected_currency = currentCzkAmount / currentSelectedExchangeRate
      return  amount_in_selected_currency.toFixed(2) ;
    }
    return 0;
  }

  return (
    <View style={styles.container}>
      
      <TextInput
          style={styles.input}
          onChangeText={onChangeInput}
          value={czk_amount}
          keyboardType="numeric"
        />
    <Text style={styles.selectedText}>Amount in {(selectedId || "none")}: {calculateExchangeRate()}</Text>
    <Text style={styles.select_label}>Select a Currency:</Text>
    <FlatList       
        data={options}
        renderItem={renderExchangeRateRadioButton}
        keyExtractor={item => String(item[0] + item[4])}
        >
    </FlatList>
    </View>
  );
};


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingVertical: 60,
    backgroundColor: 'white',
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 4,
    borderRadius: 8,
  },
  select_label: {
    marginTop:10,
    fontSize: 16,
  },
  selectedText: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 8,
    paddingHorizontal: 8,
  },
});





export default HomeScreen;