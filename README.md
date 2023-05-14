# qml-wasm-builder
Building and running a qml application using webAssembly technology

1. To work, you need to place a folder with scripts in the qml root of the project. If the script sources are located in a different directory, you need to change the paths in _build-wasm.js_ and _build-desktop.js_.
2. Download node and go to the scripts folder. Run _npm install_.
```
cd scripts
npm install ( or npm i )
```
3. In the _package.json_ file, in the scripts field in the command arguments, you must set the Qt version, build type, and application name

4. For the desktop version to work, you need to add the QT_PATH environment variable, in which you specify the path to the Qt sources (QT_PATH=Qt/Version/used_compiler). It is important to select the folder with the used compiler. Run the build with _npm run run:desktop_. All the necessary Qt libraries are written manually in the _build-desktop.js_ script

```
/* desktop */
set the environment variables QT_PATH (qt/qt_version/compiler)
the root directory is the directory with the compiler used
export QT_PATH=/Qt/Version/used_compiler
npm run run:desktop
```
5. To build an application for the web, you need to install the compiler for webAssembly in the Qt Maintenance Tool. Next, you need to install the emscripten of the required version (https://doc.qt.io/qt-5/wasm.html). Add the EMSDK environment variable (EMSDK=/path/to/emsdk). You need to add the path to emscripten (PATH=/emsdk/upstream/emscripten) to the PATH environment variable, as well as the path to the wasm compiler (PATH=/Qt/Version/wasm_32/bin). In the .emscripten file located in the user's home directory, you need to set the LLVM_ROOT and BINARYEN_ROOT variables (LLVM_ROOT - '...\\emsdk\\upstream\\bin' and BINARYEN_ROOT - '...\\emsdk\\upstream'). Use _npm run run:wasm_ to build.
```

/* wasm */
add path to environment variable
export EMSDK=/path/to/emsdk
export PATH=/emsdk/upstream/emscripten
export PATH=/Qt/Version/wasm_32/bin
magic operation with emscripten
vim ~/.emscripten
add absolute path to variables LLVM_ROOT ('...\\emsdk\\upstream\\bin') and BINARYEN_ROOT ('...\\emsdk\\upstream')
npm run run:wasm
```
6. After assembly, all files will be placed in the scripts/prebuilt folder.
