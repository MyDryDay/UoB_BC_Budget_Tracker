/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/database.js":
/*!****************************!*\
  !*** ./public/database.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"saveRecord\": () => (/* binding */ saveRecord)\n/* harmony export */ });\n// Empty variable for db\nvar db; // Create new request for a specified databse\n\nvar request = indexedDB.open(\"budgetTracker\", 1); // Called to change database from no db to 1st version, 1st version to 2nd etc.\n\nrequest.onupgradeneeded = function (event) {\n  var db = event.target.result;\n  db.createObjectStore(\"pending\", {\n    autoIncrement: true\n  });\n}; // Called each time a new request is made\n\n\nrequest.onsuccess = function (event) {\n  db = event.target.result;\n\n  if (navigator.onLine) {\n    checkDatabase();\n  }\n}; // Called in the event of an error\n\n\nrequest.onerror = function (event) {\n  console.log(\"Error: \".concat(event.target.errorCode));\n}; // Function to save a record to IndexedDB\n\n\nvar saveRecord = function saveRecord(record) {\n  // Create a new transaction on the 'pending' db with readwrite access\n  var transaction = db.transaction([\"pending\"], \"readwrite\"); // Access the 'pending' object store\n\n  var store = transaction.objectStore(\"pending\"); // Add the record to the object store\n\n  store.add(record);\n}; // Function to check the databse for changes\n\nvar checkDatabase = function checkDatabase() {\n  // Open a transaction on the 'pending' db\n  var transaction = db.transaction(\"pending\"); // Access the 'pending' object store\n\n  var store = transaction.objectStore(\"pending\"); // Get all records\n\n  var getAll = store.getAll(); // If getAll() succeeds POST data to '/api/transaction/bulk'\n\n  getAll.onsuccess = function () {\n    if (getAll.result.length > 0) {\n      fetch('/api/transaction/bulk', {\n        method: 'POST',\n        body: JSON.stringify(getAll.result),\n        headers: {\n          Accept: 'application/json, text/plain, */*',\n          'Content-Type': 'application/json'\n        }\n      }).then(function (response) {\n        return response.json();\n      }).then(function () {\n        // On success, open a transaction on 'pending' db\n        var transaction = db.transaction([\"pending\"], \"readwrite\"); // Access the 'pending' object store\n\n        var store = transaction.objectStore(\"pending\"); // Delete everything in object store\n\n        store.clear();\n      });\n    }\n  };\n}; // Listens for a network connection & calls checkDatabase if there is one\n\n\nwindow.addEventListener(\"online\", checkDatabase);\n\n//# sourceURL=webpack://budget-app/./public/database.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/database.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;