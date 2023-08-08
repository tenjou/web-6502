export interface OpCode {
    name: string
}

const createOpCode = (name: string): OpCode => {
    return {
        name,
    }
}

export const OpCode: Record<string, OpCode> = {
    LDA: createOpCode("LDA"),
    TAX: createOpCode("TAX"),
    ADC: createOpCode("ADC"),
    BRK: createOpCode("BRK"),
}
