export const OpCodes = {
    BRK: 0x00,
    ADC: 0x69,
    LDA: 0xa9,
    TAX: 0xaa,
    INX: 0xe8,
} as const

export type OpCodeType = keyof typeof OpCodes
