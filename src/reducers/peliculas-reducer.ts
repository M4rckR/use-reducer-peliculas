import {Pelicula} from "../types"

export type PeliculaActions =
    {type:'ADD_PELICULA', payload: {newPelicula:Pelicula}} |
    {type:'SET_ACTIVE_ID', payload: {id:Pelicula["id"]}} |
    {type:'DELETE_PELICULA', payload: {id:Pelicula["id"]}}

export type PeliculasState = {
    peliculas:Pelicula[]
    activeID:Pelicula["id"]
}

export const initialState:PeliculasState = {
    peliculas: [],
    activeID: ''
}

export const peliculasReducer = (
    state:PeliculasState = initialState, 
    action:PeliculaActions) => {
        if(action.type === 'ADD_PELICULA'){

            let updatedPeliculas: Pelicula[] = []

            if(state.activeID) {
                updatedPeliculas = state.peliculas.map((pelicula) => pelicula.id === state.activeID ? action.payload.newPelicula : pelicula)
            } else {
                updatedPeliculas = [...state.peliculas, action.payload.newPelicula]
            }

            return{
                ...state,
                peliculas:updatedPeliculas,
                activeID: ''
            }
        }

        if(action.type === 'SET_ACTIVE_ID'){
            return{
                ...state,
                activeID: action.payload.id
            }
        }

        if(action.type === 'DELETE_PELICULA'){
            return{
                ...state,
                peliculas: state.peliculas.filter((pelicula) => pelicula.id !== action.payload.id)
            }
        }
        
        return state
}