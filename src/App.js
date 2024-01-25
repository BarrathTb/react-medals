import React from 'react';
import Country from './components/Country'; 

function App() {
 const countriesList = [
  'USA',
  'China',
  'Japan',
  'Germany',
  'France',
  'Brazil',
  'Canada',
  'India',
  'Italy',
  'Russia',
  'South Korea',
  'Australia',
  'Netherlands',
  'Spain',
  'Mexico',
  'Indonesia',
  'Saudi Arabia',
  'Turkey',
  'United Kingdom'
  
];

  return (
    <div className="App">
      <Country countries={countriesList} />
    </div>
  );
}

export default App;