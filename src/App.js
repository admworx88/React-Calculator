import './App.css';
import React, { useState } from 'react';
import CalculatorProvider from './CalculatorProvider/CalculatorProvider';
import Calculator from './Components/Calculator/Calculator';

function App() {
  return (
    <div className="App">
      <CalculatorProvider>
        <h1 className="pad-10">Calculator</h1>
        <Calculator />
      </CalculatorProvider>{' '}
    </div>
  );
}

export default App;
