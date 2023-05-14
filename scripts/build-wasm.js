const fs = require("fs")
const path = require("path")
const minimist = require("minimist")
const chalk = require("chalk")
const { exec } = require("child_process")
const cliSpinners = require('cli-spinners')

var argv = minimist(process.argv.slice(2))

const version = argv.version
const platform = argv.platform
const buildType = argv['build-type']

const projectName = argv['project-name']
const absolutePath = process.cwd()

const outDir = `prebuilt/${platform}`

if (fs.existsSync(process.env.EMSDK)) {
    console.log("EMSDK: " + chalk.green(process.env.EMSDK))
} else {
    console.log("EMSDK: " + chalk.red('not found'))
}
console.log("Qt version: " + chalk.green(version))
console.log("platform: " + chalk.green(platform))
console.log("build type:  " + chalk.green(buildType))

function parseVersion(version) {
    const regexp = /(\d+).(\d+).(\d+)/g
    const patternVersion = [...version.matchAll(regexp)]
    if (patternVersion === null) return new Error(`version ${version} not correct!`)
    return {
        major: patternVersion[0][1],
        middle: patternVersion[0][2],
        minor: patternVersion[0][3]
    }
}

const { major, middle, minor } = parseVersion(version)

async function executable(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${chalk.red(error.message)}`)
                reject()
            }
            if (stderr) {
                console.log(`stderr: ${chalk.red(stderr)}`)
                reject()
            }
            if (stdout) {
                console.log(`stdout: ${chalk.green(stdout)}`)
                resolve()
            }
        })
    })
}

async function main() {
    if (!fs.existsSync(outDir))
        fs.mkdirSync(outDir, { recursive: true })

    process.chdir(process.env.EMSDK)
    try {
        await executable('emsdk activate 1.39.8')
    } catch(error) {}

    try {
        await executable('emsdk_env.bat')
    } catch(error) {}

    const buildPath = path.join(absolutePath, outDir)
    process.chdir(buildPath)

    try {
        await executable(`qmake ../../../`)
    } catch(error) {}

    console.log(chalk.green("Installing..."))
    let i = 0
    let timerId = setInterval(() => {
        process.stdout.write(cliSpinners.soccerHeader.frames[i++] + '\r')
        if (i === cliSpinners.soccerHeader.frames.length) i = 0
    }, cliSpinners.soccerHeader.interval)

    try {
        await executable(`mingw32-make`)
    } catch(error) {}

    clearInterval(timerId)
    process.chdir(buildPath)

    try {
        await executable(path.join(process.env.EMSDK, 'upstream/emscripten/emrun') + ` --browser=chrome --serve_after_close ${projectName}.html`)
    } catch(error) {}

}

main()