const fs = require("fs")
const path = require("path")

const version = process.argv[2].split('=')[1]
const platform = process.argv[3].split('=')[1]
const buildType = process.argv[4].split('=')[1]

console.log("Qt version: " + version)
console.log("platform: " + platform)
console.log("build type:  " + buildType)

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

const buildDir = `../../build-synaps-qmlclient-${platform}_Qt_${major}_${middle}_${minor}_MinGW_64_bit-${buildType}`
if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true })
    console.log(`removed dir: ${buildDir}`)
} else {
    console.log(`Error! dir ${buildDir} not exist`)
}
