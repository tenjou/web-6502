import { Token } from "./tokens"

export interface Context {
    input: string
    pos: number
    start: number
    kind: Token
}
