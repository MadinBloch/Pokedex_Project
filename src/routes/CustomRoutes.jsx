import { Routes,Route } from 'react-router-dom'
import Pokedax from '../Components/Pokedax/Pokedax';
import PokemonDetails from '../Components/PokemonDetails/PokemonDetails';
function CustomRoutes() {
    return ( 

        <Routes>
            <Route path='/' element={<Pokedax/>}/>
            <Route path='/pokemon/:id' element={<PokemonDetails/>}/>
        </Routes>
      
     );
}

export default CustomRoutes;