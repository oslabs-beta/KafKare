/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!********************************!*\
  !*** ./data-generator/main.ts ***!
  \********************************/
eval("var sayHi = document.getElementById('sayHi');\nsayHi.addEventListener('click', function () {\n    console.log('hi');\n});\nvar btn_topic = document.getElementById('btn-topic');\nbtn_topic.addEventListener('click', function () {\n    var topic = document.getElementById('topic');\n    var topicVal = topic.value;\n    console.log(topicVal);\n});\n\n\n//# sourceURL=webpack://kafkare-playground/./data-generator/main.ts?");
/******/ })()
;