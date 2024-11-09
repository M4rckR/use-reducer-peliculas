export type Category = {
    id: number,
    name: string,
}

export type Pelicula = {
    id: string,
    name: string,
    category: number,
    puntuacion: number | null,
}