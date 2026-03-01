import { Header } from "./components/Header";
import { useState, useEffect} from "react";
import Button from "./components/Button";
import { formatearDinero, calculartotalpagar } from "./helpers";

function App() {

  const [cantidad, setcantidad] = useState(10000);  //cantidad seleccionada con el range
  const [meses, setmeses] = useState(12);  //meses seleccionado con el select
  const [totalpagar, settotalpagar] = useState(calculartotalpagar(cantidad, meses));  //calculartotalpagar retorna un numero entonces el estado totalpagar se reincia con lo que retorna esa funcion
  const [pagomensual, setpagomensual] = useState(0);

  useEffect(()=>{
    settotalpagar(calculartotalpagar(cantidad, meses));
    setpagomensual(totalpagar/meses);
  },[cantidad, meses, totalpagar]); //cada vez que cantidad o meses cambie el useeffect se ejecuta
  
  const min=0;
  const max=20000;
  const step = 100;

  const inputhandler = (e)=>{
    console.log(Number(e.target.value));
    setcantidad(Number(e.target.value));
  }

  function handledecremento(){
    const valor = cantidad -step;
    if(valor<min){
      alert('cantidad no valida');
      return;
    }
    setcantidad(valor);
  }

  function handleincremento(){
    const valor = cantidad+step;
    if(valor>max){
      alert('cantidad no valida');
      return;
    }
    setcantidad(valor);
  }

  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      <Header />
      
      <div className="flex justify-between my-6">
        <Button clickevent={handledecremento} simbol='-' />
        <Button clickevent={handleincremento} simbol={'+'} />
      </div>
      <input min={min} max={max} step={step} value={cantidad} onChange={inputhandler} className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600" type="range" />
      <p className="text-center my-10 text-5xl font-extrabold text-indigo-600">{formatearDinero(cantidad)}</p>
      
      <h2 className="text-2xl font-extrabold text-gray-500 text-center">Elige un <span className="text-indigo-600">plazo</span> a pagar</h2>
      <select value={meses} onChange={e=>setmeses(parseInt(e.target.value))} className="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500">
        <option value="6">6 meses</option>
        <option value="12">12 meses</option>
        <option value="24">24 meses</option>
      </select>
      <div className="my-5 space-y-3 bg-gray-50 p-5">
        <h2 className="text-2xl font-extrabold text-gray-500 text-center">Resumen <span className="text-indigo-600">de pagos</span></h2>
        <p className="text-xl text-gray-500 text-center font-bold">{meses} Meses</p>
        <p className="text-xl text-gray-500 text-center font-bold">{formatearDinero(totalpagar)} Total a pagar</p>
        <p className="text-xl text-gray-500 text-center font-bold">{formatearDinero(pagomensual)} Mensuales</p>
      </div>
    </div>
  )
}

export default App