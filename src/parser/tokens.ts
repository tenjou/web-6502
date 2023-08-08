export type TokenType = "eof" | "name" | "const"

export interface Token {
    name: TokenType
}

const createToken = (name: TokenType): Token => {
    return {
        name,
    }
}

export const Kinds: Record<TokenType, Token> = {
    eof: createToken("eof"),
    name: createToken("name"),
    const: createToken("const"),
}
