export type TokenType = "eof"

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
}
