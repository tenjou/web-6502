import * as Node from "./node"
import { Context } from "./parser-types"
import { nextToken } from "./tokenizer"
import { Kinds } from "./tokens"

const parseStatement = (ctx: Context): Node.Statement => {
    const start = ctx.start

    return {
        kind: "statement",
        start,
        end: ctx.pos,
    }
}

const parseTopLevel = (ctx: Context): Node.Program => {
    const start = ctx.start
    const body: Node.Statement[] = []

    while (ctx.kind !== Kinds.eof) {
        const statement = parseStatement(ctx)
        body.push(statement)
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
        kind: Kinds.eof,
    }

    nextToken(ctx)

    const program = parseTopLevel(ctx)

    return program
}
