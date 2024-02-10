import { useState } from 'react'
import Routers from './config/routerconfig/routes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Routers/>
    </>
  )
}

export default App
