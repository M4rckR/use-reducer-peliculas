import { Dispatch, useMemo } from "react"
import { PeliculaActions} from "../reducers/peliculas-reducer"
import { Pelicula } from "../types"
import { categories } from "../data/categories"
import { MdModeEditOutline,MdDelete  } from "react-icons/md";



type ListPeliculasProps = {
    peliculas: Pelicula[],
    dispatch: Dispatch<PeliculaActions>
}

export const ListPeliculas = ({dispatch,peliculas}:ListPeliculasProps) => {
    
     const nameCategory = useMemo(
        ()=> ((id:Pelicula["category"]) => 
        categories.map((cat) =>
            cat.id === id? cat.name : '' )
        ), [] )  

    
  return (
    <div className="space-y-6">
        {peliculas.map((pelicula) => (
            <div className="bg-white p-4 rounded" key={pelicula.id}>
                <div className="flex justify-between items-center border-b pb-2">
                    <div className="text-xl">
                        <p className="font-bold">{pelicula.name}</p>
                        <p>{nameCategory(+pelicula.category)}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-xl">Puntuación</p>
                        <p className="self-end text-end text-2xl">{pelicula.puntuacion}</p>
                    </div>
                </div>
                <div className="pt-2">
                    <button
                        onClick={() => dispatch({type: 'SET_ACTIVE_ID', payload: {id: pelicula.id}})}
                    >
                        <MdModeEditOutline className="text-3xl text-gray-500"/>
                    </button>
                    <button
                        onClick={() => dispatch({type: 'DELETE_PELICULA', payload: {id: pelicula.id}})}    
                    >
                        <MdDelete className="text-3xl text-red-500"/>
                    </button>
                </div>
            </div>
        ))}
     
    </div>
  )
}
