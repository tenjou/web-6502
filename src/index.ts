import { parse } from "./parser/parser"

const run = async () => {
    const content = await fetch("../asm/test.a65").then((result) => result.text())
    const program = parse(content)

    console.log(program)
}

run()
