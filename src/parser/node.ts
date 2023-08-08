interface Node {
    start: number
    end: number
}

export interface Instruction extends Node {
    kind: "instruction"
    opcode: string
    value: string
}

export type Statement = Instruction

export interface Program extends Node {
    kind: "program"
    body: Statement[]
}
