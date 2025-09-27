import React, { useState } from 'react';
import { View, Text, ActivityIndicator,  FlatList, StyleSheet, TouchableOpacity, TextInput, } from 'react-native';
import { useExchangeRates, CsvRow, CsvData } from '../api/queries';




const HomeScreen: React.FC = () => {

  const { data, isLoading, error } = useExchangeRates();
  var [selectedOption] = useState("");
  const [selectedId, setSelectedId] = useState<string>();
  const [selectedExchangeRate, setSelectedExchangeRate] = useState<string>();
  const [number, onChangeInput] = useState('');
  // const selectedOption = "";
  // const setSelectedValue = function(itemValue:string){};
  if (isLoading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error.message}</Text>;
  const headers = (data?.data.length ? Object.keys(data.data[0]) : []);
  // console.log('Test log from app');
  // console.warn('Test warning');
  
  // console.error('Test error');
  const handlePress = (value:any) => {
    selectedOption = value;
    console.log('Selected option:', value);
  };
  // if (data) {
    // const currencies = data.slice(1);

  type ExchangeRateOption = {
    name: string;
    exchange_rating: string;
  };

  
  // const options = [["xx", "1"], ["yy", "1"], ["zz", "1"],["tt", "1"]]
  // const options = Array(data?.data.map((row:CsvRow)=> [row[0], row[1], row[2], row[3], row[4]] ) )
  const options = data?.data
  console.log(data)
  console.log(options)
  type ItemProps = {
    item: Array<String>;
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
  };

  const ExchangeRateRadioButton = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item[0] +" "+item[4]}</Text>
  </TouchableOpacity>
);
  const renderExchangeRateRadioButton = ({item}: {item: Array<String>}) => {
    const backgroundColor = item[0] === selectedId ? '#aaaa' : '#dddd';
    const color = item[0] === selectedId ? 'white' : 'black';

    return (
      <ExchangeRateRadioButton
        item={item}
        onPress={() => {setSelectedId(String(item[0])); setSelectedExchangeRate(String(item[4])); } }
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  const calculateExchangeRate = ()=> { 
    const currentSelectedExchangeRate = parseFloat(String(selectedExchangeRate));
    const currentCzkAmount = parseFloat(String(number));
    if(!Number.isNaN(currentSelectedExchangeRate) && !Number.isNaN(currentCzkAmount) ){
      return currentSelectedExchangeRate * currentCzkAmount;
    }
    return 0;
  }
  // const onChangeInput = (textValue:String) => {}
          //   if(!isNaN(textValue) && !isNaN(parseInt(textValue))) {
          //     onChangeNumber(parseInt(textValue))
          //   } else if (textValue === "") {
          //     onChangeNumber(null)
          //   }
          // }
        
  // }
  return (
    <View style={styles.container}>
      
      <TextInput
          style={styles.input}
          onChangeText={onChangeInput}
          value={number}
          keyboardType="numeric"
        />
    <Text style={styles.selectedText}>Exchange Rate: {calculateExchangeRate()}</Text>
    <Text style={styles.selectedText}>Selected: {selectedId + " " + selectedExchangeRate}</Text>
    <FlatList       
        data={options}
        renderItem={renderExchangeRateRadioButton
        }
        keyExtractor={item => item[0]}
        >

      <Text style={styles.title}>Select an Option</Text>

      
    </FlatList>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    // flex,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 100,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    // marginBottom: 20,
  },
  item: {
    marginTop: 10
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
    // borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    // backgroundColor: '#000',
  },
  radioText: {
    fontSize: 16,
  },
  selectedText: {
    fontSize: 16,
    marginTop: 50,
  },
  item: {

  }
});





export default HomeScreen;