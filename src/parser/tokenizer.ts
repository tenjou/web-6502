import { Context } from "./parser-types"
import { Kinds } from "./tokens"

export const nextToken = (ctx: Context) => {
    skipSpace(ctx)

    if (ctx.pos >= ctx.input.length) {
        ctx.kind = Kinds.eof
        return
    }

    ctx.start = ctx.pos

    readWord(ctx)
}

const readWord = (ctx: Context): void => {
    while (ctx.pos < ctx.input.length) {
        const charCode = ctx.input.charCodeAt(ctx.pos)
        if (!isIdentifierChar(charCode)) {
            break
        }

        ctx.pos++
    }

    ctx.value = ctx.input.slice(ctx.start, ctx.pos)
    ctx.kind = Kinds.name
}

const skipSpace = (ctx: Context) => {
    while (ctx.pos < ctx.input.length) {
        const charCode = ctx.input.charCodeAt(ctx.pos)
        switch (charCode) {
            case 10:
            case 13:
            case 32:
                ctx.pos++
                break

            // case 47: // '/'
            //     skipLineComment(ctx)
            //     break

            default:
                return
        }
    }
}

const isIdentifierStart = (charCode: number): boolean => {
    if (charCode < 65) {
        return charCode === 36 // $
    }
    if (charCode < 91) {
        return true
    }
    if (charCode < 97) {
        return charCode === 95 // _
    }
    if (charCode < 123) {
        return true
    }

    return false
}

const isIdentifierChar = (charCode: number): boolean => {
    if (charCode <= 32) {
        return false
    }
    if (charCode < 58) {
        return true
    }
    if (charCode < 65) {
        return false
    }
    if (charCode < 91) {
        return true
    }
    if (charCode < 97) {
        return charCode === 95 // _
    }
    if (charCode < 123) {
        return true
    }

    return false
}
