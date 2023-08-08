interface Node {
    start: number
    end: number
}

export interface Statement extends Node {
    kind: "statement"
}

export interface Program extends Node {
    kind: "program"
    body: Statement[]
}
