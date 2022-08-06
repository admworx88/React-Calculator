import React, { useContext } from 'react';
import Display from '../Display/Display';
import './Calculator.css';
import Button from '../Button/Button';
import ButtonBox from '../Button/ButtonBox';
import { CalculatorContext } from '../../CalculatorProvider/CalculatorProvider';

function Calculator(props) {
  const {
    resetClickHandler,
    invertClickHandler,
    percentClickHandler,
    equalsClickHandler,
    signClickHandler,
    commaClickHandler,
    numClickHandler,
    calc,
  } = useContext(CalculatorContext);

  const buttonValues = [
    ['C', '+-', '%', '/'],
    [7, 8, 9, 'X'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, '.', '='],
  ];

  return (
    <div className="container">
      <div className="calculator">
        <Display value={calc.num ? calc.num : calc.res} />
      </div>
      <ButtonBox>
        {buttonValues.flat().map((button, i) => {
          return (
            <Button
              key={i}
              className={button === '=' ? 'equals' : ''}
              value={button}
              onClick={
                button === 'C'
                  ? resetClickHandler
                  : button === '+-'
                  ? invertClickHandler
                  : button === '%'
                  ? percentClickHandler
                  : button === '='
                  ? equalsClickHandler
                  : button === '/' ||
                    button === 'X' ||
                    button === '-' ||
                    button === '+'
                  ? signClickHandler
                  : button === '.'
                  ? commaClickHandler
                  : numClickHandler
              }
            />
          );
        })}
      </ButtonBox>
    </div>
  );
}

export default Calculator;
