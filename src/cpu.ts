import { OpCodes } from "./opcodes"

export interface Cpu {
    a: number
    x: number
    y: number
}

export const run = (program: Uint8Array) => {
    const cpu = reset()

    loop: for (let n = 0; n < program.length; ) {
        const opcode = program[n++]

        switch (opcode) {
            case OpCodes.ADC: {
                const value = program[n++]
                cpu.a = (cpu.a + value) & 0xff
                break
            }

            case OpCodes.LDA: {
                const value = program[n++]
                cpu.a = value
                break
            }

            case OpCodes.TAX: {
                cpu.x = cpu.a
                break
            }

            case OpCodes.INX: {
                cpu.x = (cpu.x + 1) & 0xff
                break
            }

            case OpCodes.BRK: {
                break loop
            }
        }
    }

    return cpu
}

const reset = (): Cpu => {
    return {
        a: 0,
        x: 0,
        y: 0,
    }
}
