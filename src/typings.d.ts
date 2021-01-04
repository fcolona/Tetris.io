export interface message{
    author: string,
    message: string
}

export interface gameInfo{
    arena: number[][],
    pos: {x: number, y: number},
    matrix: number[][],
    color: string
}