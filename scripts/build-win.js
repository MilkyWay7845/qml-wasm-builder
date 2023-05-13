const fs = require("fs")
const path = require("path")
const minimist = require("minimist")
const chalk = require("chalk")
const { exec } = require("child_process")

var argv = minimist(process.argv.slice(2))

const version = argv.version
const platform = argv.platform
const buildType = argv['build-type']

const projectName = 'AnimationDemo'
const outDir = `prebuilt/${platform}`

if (process.env.QT_PATH) {
    console.log("QT_PATH: " + chalk.green(process.env.QT_PATH))
} else {
    console.log("QT_PATH: " + chalk.red("not found"))
    exit(1)
}

var QT_PATH = ""
if (fs.existsSync(process.env.QT_PATH)) {
    QT_PATH = process.env.QT_PATH
} else {
    console.log("Directory " + process.env.QT_PATH + chalk.red(" not found"))
    exit(1)
}


console.log("Qt version: " + chalk.green(version))
console.log("platform: " + chalk.green(platform))
console.log("build type:  " + chalk.green(buildType))


const MODULES = [
    'qt.conf',
    'Qt5Widgets.dll', 
    'Qt5Core.dll', 
    'Qt5Gui.dll', 
    'Qt5Network.dll', 
    'Qt5Sql.dll', 
    'Qt5Svg.dll',
    'Qt5Qml.dll',
    'Qt5QmlWorkerScript.dll',
    'Qt5QmlModels.dll',
    'Qt5Quick.dll',
    'Qt5QuickControls2.dll',
    'Qt5QuickTemplates2.dll',
    'Qt5QuickWidgets.dll',
    'libgcc_s_seh-1.dll',
    'libstdc++-6.dll',
    'libwinpthread-1.dll'
]

const LIBS = [

]

const PLUGINS = [
    'platforms',
    'imageformats',
    'styles'
]

const QML_PLUGINS = [
    'QtQml',
    'QtQuick',
    'QtQuick.2',
    'QtCharts',
    'QtGraphicalEffects'
]

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


function copyModules() {
    MODULES.forEach(module => {
        fs.copyFileSync(`${QT_PATH}/bin/${module}`, `${outDir}/${module}`)
        console.log(`copy modules: ${chalk.green(`${QT_PATH}/bin/${module}`)} -> ${chalk.green(`${outDir}/${module}`)}`)
    })
}

function copyPlugins() {
    PLUGINS.forEach(plugin => {
        if (!fs.existsSync(`${outDir}/${plugin}`))
            fs.mkdirSync(`${outDir}/${plugin}`)
        fs.readdirSync(`${QT_PATH}/plugins/${plugin}`).forEach(file => {
            fs.copyFileSync(`${QT_PATH}/plugins/${plugin}/${file}`, `${outDir}/${plugin}/${file}`)
        })
        console.log(`copy plugins: ${chalk.green(`${QT_PATH}/plugins/${plugin}`)} -> ${chalk.green(outDir)}`)
    })
}

function copyQmlPlugins() {
    QML_PLUGINS.forEach(plugin => {
        if (!fs.existsSync(`${outDir}/${plugin}`))
            fs.mkdirSync(`${outDir}/${plugin}`)
        fs.cpSync(`${QT_PATH}/qml/${plugin}`, `${outDir}/${plugin}`, { recursive: true })
        console.log(chalk.green(`copy qml-plugins: ${chalk.green(`${QT_PATH}/qml/${plugin}`)} -> ${chalk.green(`${outDir}/${plugin}`)}`))
    })
}

/*
function copyLibs() {
    LIBS.forEach(lib => {
        let libName = path.parse(path.basename(lib)).name
        fs.copyFileSync(`../../build-AnimationDemo-${platform}_Qt_${major}_${middle}_${minor}_MinGW_64_bit-${buildType}/${libName}/src/release/${lib}`, `${outDir}/${lib}`)
        console.log(`copy libs: ${chalk.green(lib)}`)  
    })
}
*/

function copyExeFile() {
    fs.copyFileSync(`../../build-AnimationDemo-${platform}_Qt_${major}_${middle}_${minor}_MinGW_64_bit-${buildType}/release/${projectName}.exe`, `${outDir}/${projectName}.exe`)
    console.log(`copy exe: ${chalk.green(projectName)}`)
}

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
                console.log(`stdout: ${stdout}`)
                resolve()
            }
        })
    })
}

async function main() {
    if (!fs.existsSync(outDir))
        fs.mkdirSync(outDir, { recursive: true })

    copyModules()
    copyPlugins()
    copyQmlPlugins()
    //copyLibs()
    copyExeFile()
    console.log(chalk.green("SUCCESS!"))
    console.log(chalk.green(`Installing ${projectName}...`))

    await executable(`prebuilt\\${platform}\\${projectName}.exe`)
}

main()


