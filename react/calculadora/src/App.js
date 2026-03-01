import './App.css';
import Boton from './componets/Boton';
import Pantalla from './componets/Pantalla';
import BotonClear from './componets/BotonClear';
import { useState } from 'react';
import { evaluate } from 'mathjs';

function App() {

  const [input, setInput] = useState('');
  
  const agregarInput = val => {
    setInput(input + val);
  };
  
  const calcularResultado = () => {
    if (input) {
      setInput(evaluate(input));
    } else {
      alert("Por favor ingrese valores para realizar los cálculos.");
    }
  };
  const [memory, setMemory] = useState(null);

  const guardarMemoria = () => {
  if(input) {
    setMemory(input);  // guarda el valor actual en memoria
    alert(`Valor ${input} guardado en memoria`);
  }
};
const recuperarMemoria = () => {
  if(memory != null) {
    setInput(memory);  // coloca el valor guardado en la pantalla
  } else {
    alert("No hay valor en memoria");
  }
};


  

  return (
    <div className='App'>
      
      <div className='contenedor-calculadora'>
        <Pantalla input={input}/>
        <div className='fila'>
          <Boton manejarClic={agregarInput}>1</Boton>
          <Boton manejarClic={agregarInput}>2</Boton>
          <Boton manejarClic={agregarInput}>3</Boton>
          <Boton manejarClic={agregarInput}>+</Boton>
        </div>
        <div className='fila'>
          <Boton manejarClic={agregarInput}>4</Boton>
          <Boton manejarClic={agregarInput}>5</Boton>
          <Boton manejarClic={agregarInput}>6</Boton>
          <Boton manejarClic={agregarInput}>-</Boton>
        </div>
        <div className='fila'>
          <Boton manejarClic={agregarInput}>7</Boton>
          <Boton manejarClic={agregarInput}>8</Boton>
          <Boton manejarClic={agregarInput}>9</Boton>
          <Boton manejarClic={agregarInput}>*</Boton>
        </div>
        <div className='fila'>
          <Boton manejarClic={calcularResultado}>=</Boton>
          <Boton manejarClic={agregarInput}>0</Boton>
          <Boton manejarClic={agregarInput}>.</Boton>
          <Boton manejarClic={agregarInput}>/</Boton>
        </div>
        <div className='fila'>
          <Boton manejarClic={guardarMemoria}>M+</Boton>
          <BotonClear manejarClear={() => setInput('')}>
            Clear
          </BotonClear>
          <Boton manejarClic={recuperarMemoria}>MR</Boton>

        </div>
      </div>
    </div>
  );
}

export default App;