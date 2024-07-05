import { Route,Routes } from 'react-router-dom'
import './App.css'
import Page1 from './components/Page1.tsx'
import Page2 from './components/Page2.tsx'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Page1/>}/>
      <Route path='/page2' element={<Page2/>}/>
    </Routes>
  )
}

export default App
