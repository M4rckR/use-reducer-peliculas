import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import {Pelicula} from "../types"
import {v4 as uuidv4} from 'uuid'
import { categories } from "../data/categories"
import {PeliculaActions, PeliculasState} from "../reducers/peliculas-reducer"

type FormProps = {
  dispatch: Dispatch<PeliculaActions>,
  state: PeliculasState
}

const initialState:Pelicula = {
    id: uuidv4(),
    name: '',
    category: 1,
    puntuacion: null
}

export const Form = ({dispatch,state}:FormProps) => {

    const [datos, setDatos] = useState<Pelicula>(initialState)

    useEffect(() => {
        if(state.activeID){
            const pelicula = state.peliculas.filter((pelicula) => pelicula.id === state.activeID)[0]
            if(pelicula){
                setDatos(pelicula)
            }
        }
    }, [state.activeID, state.peliculas])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const isNumber = ['puntuacion','category'].includes(e.target.id)
        setDatos({
            ...datos,
            [e.target.id]: isNumber ? (e.target.value === "" ? null : +(e.target.value)) : e.target.value
        })  
    }

    const isValid = () => {
        const {name,puntuacion} = datos
        return name.trim() !== '' &&  puntuacion !== null && puntuacion > 0
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(datos)
        dispatch({type: 'ADD_PELICULA', payload: {newPelicula: datos}})
        setDatos({
          ...initialState,
          id: uuidv4()
        })
    }

  return (
    <form 
        className="shadow-lg rounded-md col-span-1 p-8 space-y-4 bg-white max-h-[373px]"
        onSubmit={handleSubmit}
        >
        <div className="flex flex-col space-y-2">
          <label className="font-semibold" htmlFor="name">Nombre de la pelicula:</label>
          <input 
            className="outline-none border rounded p-2 border-gray-600" 
            id="name" 
            type="text"
            value={datos.name} 
            onChange={handleInputChange}
            />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-semibold" htmlFor="category">Categoria:</label>

            <select 
                className="outline-none border rounded p-2 border-gray-600" 
                id="category"
                onChange={handleInputChange}
                value={datos.category}
                >
                    {categories.map((category)=>(
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
            </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-semibold" htmlFor="puntuacion">Puntuacion:</label>
          <input 
            className="outline-none border rounded p-2 border-gray-600" 
            id="puntuacion" 
            type="number" 
            onChange={handleInputChange}
            value={datos.puntuacion === null ? '' : datos.puntuacion}
            />
        </div>
          <button
            className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white 
            font-bold py-2 px-4 rounded disabled:opacity-20"
            type="submit"
            disabled={!isValid()}
          >Registrar pelicula</button>  
    </form>  
  )
}
