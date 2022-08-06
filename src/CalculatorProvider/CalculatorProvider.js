import React, { useState, createContext } from 'react';

export const CalculatorContext = createContext();

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ');

const removeSpaces = (num) => num.toString().replace(/\s/g, '');

const math = (a, b, sign) =>
  sign === '+' ? a + b : sign === '-' ? a - b : sign === 'X' ? a * b : a / b;

const CalculatorProvider = (props) => {
  let [calc, setCalc] = useState({
    sign: '',
    num: 0,
    res: 0,
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          removeSpaces(calc.num) % 1 === 0 && !calc.num.toString().includes('.')
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (e) => {
    setCalc({
      ...calc,
      sign: e.target.innerHTML,
      res: !calc.num
        ? calc.res
        : !calc.res
        ? calc.num
        : toLocaleString(
            math(
              Number(removeSpaces(calc.res)),
              Number(removeSpaces(calc.num)),
              calc.sign
            )
          ),
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      setCalc({
        ...calc,
        res:
          calc.num === '0' && calc.sign === '/'
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: '',
        num: 0,
      });
    }
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: '',
    });
  };

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: '',
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: '',
      num: 0,
      res: 0,
    });
  };

  const handleKeyDown = (event) => {
    let { key } = event;

    if (key === 'Enter') key = '=';

    if (numClickHandler(key)) {
      event.preventDefault();
      this.numClickHandler(parseInt(key, 10));
    } else if (key in math) {
      event.preventDefault();
      this.signClickHandler(key);
    } else if (key === '.') {
      event.preventDefault();
      this.commaClickHandler(key);
    } else if (key === '%') {
      event.preventDefault();
      this.inputPercent();
    } else if (key === 'Backspace') {
      event.preventDefault();
      //this.clearLastChar();
    } else if (key === 'Clear') {
      event.preventDefault();
      this.invertClickHandler();
      if (calc.num !== '0') {
        this.invertClickHandler();
      } else {
        this.invertClickHandler();
      }
    }
  };

  document.addEventListener('keypress', handleKeyDown);
  // const componentDidMount = () => {
  //   console.log('test');
  //   document.addEventListener('keydown', handleKeyDown);
  // };

  // const componentWillUnmount = () => {
  //   document.removeEventListener('keydown', handleKeyDown);
  // };
  return (
    <CalculatorContext.Provider
      value={{
        handleKeyDown,
        numClickHandler,
        commaClickHandler,
        signClickHandler,
        equalsClickHandler,
        invertClickHandler,
        percentClickHandler,
        resetClickHandler,
        calc,
        setCalc,
      }}
    >
      {props.children}
    </CalculatorContext.Provider>
  );
};

export default CalculatorProvider;
