import { useReducer } from "react"
import { Form } from "./components/Form"
import {peliculasReducer,initialState} from "./reducers/peliculas-reducer"
import { ListPeliculas } from "./components/ListPeliculas"
import { TrackerPeliculas } from "./components/TrackerPeliculas"
function App() {
  
  const [state,dispatch] = useReducer(peliculasReducer,initialState)
  return (
    <>
      <div className="flex justify-center items-center py-6 bg-gray-800 mb-6 text-white">
        <h1 className="font-bold text-3xl">Recuento de Peliculas</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 px-4 md:mx-auto gap-6">
        <Form
          state = {state}
          dispatch = {dispatch}
        />
        <div className="col-span-2 space-y-6">
          <TrackerPeliculas 
            peliculas = {state.peliculas}
          />
          {/* <div className="bg-stone-600 py-16 w-full text-center text-4xl text-white rounded">Pendiente</div> */}
          <ListPeliculas 
            peliculas = {state.peliculas}
            dispatch = {dispatch}
          />
        </div>
      </div>        
          
    </>
  )
}

export default App
