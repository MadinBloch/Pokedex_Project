
import { Link } from 'react-router-dom'
import './App.css'
import CustomRoutes from './routes/CustomRoutes'

function App() {

  return (
    <>
    
    <h1 className="text-4xl font-bold text-blue-600 mb-4 p-3 text-center">
      <Link to='/'>
        Pokedex
      </Link>  
    </h1>
    <CustomRoutes/>
  
    </>
  )
}

export default App
