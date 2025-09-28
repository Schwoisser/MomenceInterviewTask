import React, { useState } from 'react';
import { View, Text, ActivityIndicator,  FlatList, StyleSheet, TouchableOpacity, TextInput, } from 'react-native';
import { useExchangeRates, CsvRow } from '../api/queries';

import styled from 'styled-components/native';


const HomeScreen: React.FC = () => {

  // Hooks
  const { data, isLoading, error } = useExchangeRates();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [selectedExchangeRate, setSelectedExchangeRate] = useState<string | null>(null);
  const [czk_amount, onChangeInput] = useState('');

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
  <Item onPress={onPress} style={[{backgroundColor}]}>
    <NormalText style={[{color: textColor}]}>{item[0] + " " + item[1] + " " + item[4]}</NormalText>
  </Item>
  );

  const renderExchangeRateRadioButton = ({item}: {item: Array<String>}) => {
    const backgroundColor = item[0] === selectedId ? '#aaaa' : '#dddd';
    const color = item[0] === selectedId ? 'white' : 'black';

    return (
      <ExchangeRateRadioButton
        item={item}
        onPress={() => {setSelectedId(String(item[0])); setSelectedCurrency(String(item[1])); setSelectedExchangeRate(String(item[4])); } }
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
    <Container>
      
      <Input
          onChangeText={onChangeInput}
          value={czk_amount}
          keyboardType="numeric"
        />
    <NormalText>Amount in {(selectedCurrency || "none")}: {calculateExchangeRate()}</NormalText>
    <SelectLabel>Select a Currency:</SelectLabel>
    <FlatList       
        data={options}
        renderItem={renderExchangeRateRadioButton}
        keyExtractor={item => String(item[0] + item[4])}
        >
    </FlatList>
    </Container>
  );
};


// Styles
const Container = styled.View`
  flex: 1;
  
  padding: 16px;
  padding-vertical: 260px;
  background-color: white;
`;

const Item = styled.TouchableOpacity`
  padding-horizontal: 16px;
  padding-vertical: 12px;
  margin-vertical: 4px;
  border-radius: 8px;
`;

const SelectLabel = styled.Text`
  margin-top: 10px;
  font-size: 16px;
`;

const NormalText = styled.Text`
  font-size: 16px;
  margin-vertical: 8px;
`;

const Input = styled.TextInput`
  height: 40px;
  border-color: gray;
  border-width: 1px;
  margin-vertical: 8px;
  padding-horizontal: 8px;
`;





export default HomeScreen;