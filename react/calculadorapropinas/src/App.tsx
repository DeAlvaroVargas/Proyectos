import { useState } from 'react'
import MenuItem from './components/MenuItem'
import OrderContent from './components/OrderContent'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Userorder from './components/Userorder'
import {menuItem} from "./"

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1 className=''>Calculadora de Propinas
          
        </h1>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
