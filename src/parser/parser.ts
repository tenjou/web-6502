import { OpCode } from "../opcodes"
import * as Node from "./node"
import { Context } from "./parser-types"
import { nextToken } from "./tokenizer"
import { Kinds } from "./tokens"

const parseStatement = (ctx: Context): Node.Statement => {
    const opcode = OpCode[ctx.value]
    if (opcode) {
        return parseInstruction(ctx, opcode)
    }

    throw new Error("not-opcode")
}

const parseInstruction = (ctx: Context, opcode: OpCode): Node.Instruction => {
    const start = ctx.start

    return {
        kind: "instruction",
        start,
        end: ctx.pos,
        opcode: "",
        value: "",
    }
}

const parseTopLevel = (ctx: Context): Node.Program => {
    const start = ctx.start
    const body: Node.Statement[] = []

    while (ctx.kind !== Kinds.eof) {
        const statement = parseStatement(ctx)
        body.push(statement)

        nextToken(ctx)
    }

    return {
        kind: "program",
        start,
        end: ctx.pos,
        body,
    }
}

export const parse = (input: string) => {
    const ctx: Context = {
        input,
        pos: 0,
        start: 0,
        value: "",
        kind: Kinds.eof,
    }

    nextToken(ctx)

    const program = parseTopLevel(ctx)

    return program
}
