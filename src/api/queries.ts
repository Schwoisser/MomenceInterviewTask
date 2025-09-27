import { useQuery } from '@tanstack/react-query';
import Papa, { ParseResult } from 'papaparse';

interface ExchangeRates {
  text: string;
}

// Define the response types
export interface CsvRow {
  [key: string]: string | number | boolean | null; // Flexible for various data types
}

export interface CsvData {
  data: CsvRow[];
}


export const useExchangeRates = () => {
  return useQuery<CsvData>({
    queryKey: ['exchange-rates'],
    queryFn: () => fetchExchangeRates(),
  });
};

const fetchExchangeRates = async (): Promise<CsvData> => {
  const url = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  const text = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse<CsvRow>(text, {
      // Core parsing options
      header: false, // Set to false if no headers; provide field names manually
      dynamicTyping: true, // Auto-convert numbers, booleans, etc.
      skipEmptyLines: true, // Ignore empty lines
      delimiter: '|', // Auto-detect delimiter (or specify: ',', ';', '\t', etc.)
      quoteChar: '"', // Handle quoted fields (e.g., "value, with comma")
      comments: '#', // Ignore lines starting with '#' (set to false to disable)
      // Handle inconsistent rows
      beforeFirstChunk: (chunk: string) => {
        const lines = chunk.split('\n');
        lines.shift(); // Remove the first line
        // lines.shift(); // Remove the first line
        return lines.join('\n');
      },
      transform: (value, field) => {
        // Optional: Clean or transform values (e.g., trim whitespace)
        return value.trim();
      },
      complete: (result: ParseResult<CsvRow>) => {
        resolve({ data: result.data });
      },
      error: (error: Error) => {
        reject(error);
      },
    });;
  });
};
