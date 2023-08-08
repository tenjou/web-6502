type OpCodeType = "BRK" | "ADC" | "LDA" | "TAX" | "INX"

interface AstInstruction {
    opcode: OpCodeType
    value: string
}

const OpCodes: Record<OpCodeType, number> = {
    BRK: 0x00,
    ADC: 0x69,
    LDA: 0xa9,
    TAX: 0xaa,
    INX: 0xe8,
} as const

const parse = (): AstInstruction[] => {
    return [
        {
            opcode: "LDA",
            value: "#$c0",
        },
        {
            opcode: "TAX",
            value: "",
        },
        {
            opcode: "INX",
            value: "",
        },
        {
            opcode: "ADC",
            value: "#$c4",
        },
        {
            opcode: "BRK",
            value: "",
        },
    ]
}

const calcSize = (ast: AstInstruction[]) => {
    let size = 0

    for (const entry of ast) {
        size += entry.value ? 2 : 1
    }

    return size
}

const compile = (ast: AstInstruction[]) => {
    const size = calcSize(ast)
    const buffer = new Uint8Array(size)

    let pos = 0

    for (const entry of ast) {
        const opcode = OpCodes[entry.opcode]

        buffer[pos++] = opcode

        if (entry.value) {
            const value = "0x" + entry.value.substring(2)
            buffer[pos++] = Number(value)
        }
    }

    return buffer
}

const disassemble = (program: Uint8Array) => {
    const buffer: string[] = []

    for (let n = 0; n < program.length; ) {
        const opcode = program[n++]

        buffer.push(opcode.toString(16))

        switch (opcode) {
            case OpCodes.ADC:
            case OpCodes.LDA: {
                const value = program[n++]
                buffer.push(value.toString(16))
                break
            }
        }
    }

    return buffer
}

const run = () => {
    const ast = parse()
    const program = compile(ast)
    const dump = disassemble(program)

    console.log(dump)
}

run()

// import { parse } from "./parser/parser"

// const run = async () => {
//     const content = await fetch("./asm/test.a65").then((result) => result.text())

//     try {
//         const program = parse(content)
//         console.log(program)
//     } catch (err) {
//         console.error(err instanceof Error ? err.message : "Unknown Error")
//     }
// }

// run()
