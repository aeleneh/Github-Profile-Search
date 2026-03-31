import { useState } from 'react'
import SearchInput from './components/SearchInput'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SearchInput/>
    </>
  )
}

export default App
