import { useMemo } from "react"
import { Pelicula } from "../types"
import { TrackerItem } from "./TrackerItem"

type TrackerPeliculasProps = {
    peliculas: Pelicula[],
}

export const TrackerPeliculas = ({peliculas}:TrackerPeliculasProps) => {

    const totalDrama = useMemo( () => (peliculas.reduce((acc, pelicula) => {
        return pelicula.category === 3 ? acc + 1 : acc
    }, 0)), [peliculas]) 

    const totalComedia = useMemo( () => (peliculas.reduce((acc, pelicula) => {
        return pelicula.category === 2 ? acc + 1 : acc
    }, 0)), [peliculas])

    const totalTerror = useMemo( () => (peliculas.reduce((acc, pelicula) => {
        return pelicula.category === 1 ? acc + 1 : acc
    }, 0)), [peliculas])

    const totalPeliculas = peliculas.length

  return (
    <section className="bg-stone-600 py-8 w-full rounded flex justify-between px-12 items-center">
        <h3  className="text-2xl font-bold text-white">Resumen</h3>
        <TrackerItem
            text = "Drama"
            total = {totalDrama}
        />
        <TrackerItem
            text = "Comedia"
            total = {totalComedia}
        />
        <TrackerItem
            text = "Terror"
            total = {totalTerror}
        />
        <TrackerItem
            text = "Total"
            total = {totalPeliculas}
        />
    </section>
  )
}
