#!/usr/bin/env node

const {execSync} = require('child_process')
const {resolve} = require('path')


const gSwagger = `ts-node ${resolve(__dirname, 'dist', 'commands', 'gSwagger.js')}`


const commands = {
    'g-swagger': gSwagger,
}

const args = process.argv.slice(2)
const command = args[0]

try {
    if (!(command in commands)) {
        console.log(`Unknown command: ${command}`)
        process.exit(1)
    }

    execSync(commands[command], {stdio: 'inherit'})

} catch (error) {
    console.error('Error executing command:', error)
    process.exit(1)
}
