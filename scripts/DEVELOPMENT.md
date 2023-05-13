# _synaps-scripts_

```
cd scripts
npm install ( or npm i )

/* desktop */
set the environment variables QT_PATH (qt/qt_version/compiler)
the root directory is the directory with the compiler used
export QT_PATH=/Qt/version/compiler
npm run run:desktop

/* wasm */
add path to environment variable
export EMSDK=/path/to/emsdk
export PATH=/emsdk/upstream/emscripten
magic operation with emscripten
open ~/.emscripten
add absolute path to variables LLVM_ROOT ('...\\emsdk\\upstream\\bin') and BINARYEN_ROOT ('...\\emsdk\\upstream')
npm run run:wasm

```