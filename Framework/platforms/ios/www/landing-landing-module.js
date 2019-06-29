(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["landing-landing-module"],{

/***/ "./src/app/landing/landing.module.ts":
/*!*******************************************!*\
  !*** ./src/app/landing/landing.module.ts ***!
  \*******************************************/
/*! exports provided: LandingPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LandingPageModule", function() { return LandingPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _landing_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./landing.page */ "./src/app/landing/landing.page.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    {
        path: '',
        component: _landing_page__WEBPACK_IMPORTED_MODULE_5__["LandingPage"]
    }
];
var LandingPageModule = /** @class */ (function () {
    function LandingPageModule() {
    }
    LandingPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes),
            ],
            declarations: [_landing_page__WEBPACK_IMPORTED_MODULE_5__["LandingPage"]]
        })
    ], LandingPageModule);
    return LandingPageModule;
}());



/***/ }),

/***/ "./src/app/landing/landing.page.html":
/*!*******************************************!*\
  !*** ./src/app/landing/landing.page.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-content class=\"tutorial-page\">\n    <div padding-top text-end>\n      <ion-button fill=\"clear\" [routerLink]=\"'/login/'\" routerDirection=\"forward\">Saltar<ion-icon name=\"arrow-forward\"></ion-icon></ion-button>\n    </div>\n\n    <h1>Please Scan Access Card</h1>\n    <ion-card>\n      <ion-card-content>\n        <p>Account Tag ID: {{ tagId  }}</p>\n      </ion-card-content>\n    </ion-card>\n  \n    <ion-slides pager=\"true\">\n      <ion-slide>\n        <ion-grid>\n          <ion-row>\n              <ion-col>\n                  <img src=\"../../assets/icon/123.png\" alt=\"\">\n              </ion-col>\n          </ion-row>\n          <ion-row>\n              <ion-col>\n                  <h2>Bienvenido</h2>\n                  <p>Paga en Un Dos Tres.</p>\n                  <br>\n                  <br>\n              </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-slide>\n  \n      <ion-slide>\n          <ion-grid>\n              <ion-row>\n                  <ion-col>\n                      <img src=\"../../assets/icon/favicon.png\" alt=\"\">\n                  </ion-col>\n              </ion-row>\n              <ion-row>\n                  <ion-col>\n                      <h2>Titulo</h2>\n                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio facilis nesciunt iure id sed aspernatur aliquid quae laborum vero consequatur nam accusamus tenetur, necessitatibus maiores odit ipsam deserunt eos!</p>\n                  </ion-col>\n              </ion-row>\n          </ion-grid>\n      </ion-slide>\n  \n      <ion-slide>\n          <ion-grid>\n              <ion-row>\n                  <ion-col>\n                    <div></div>\n                      <img src=\"../../assets/icon/favicon.png\" alt=\"\">\n                  </ion-col>\n              </ion-row>\n              <ion-row>\n                  <ion-col>\n                          <h2>Titulo</h2>\n                          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique illum assumenda ab fuga voluptates, tempora autem quas temporibus repellat sunt harum voluptas cum dignissimos sint! Eius et ullam quo ratione.</p>\n                  </ion-col>\n              </ion-row>\n          </ion-grid>\n      </ion-slide>\n  \n                      <ion-slide>\n                              <ion-grid>\n                                  <ion-row>\n                                      <ion-col>\n                                              <img src=\"../../assets/icon/favicon.png\" alt=\"\">\n                                      </ion-col>\n                                  </ion-row>\n                                  <ion-row>\n                                      <ion-col>\n                                              <h2>Titulo</h2>\n                                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem voluptate tenetur error ut quidem unde non vitae harum animi doloremque id eaque sequi et repudiandae, illum ullam temporibus minus provident.</p>\n                                      </ion-col>\n                                  </ion-row>\n                              </ion-grid>\n                          </ion-slide>\n  \n      <ion-slide>\n          <ion-grid>\n              <ion-row>\n                  <ion-col>\n                      <img src=\"../../assets/icon/favicon.png\" alt=\"\">\n                  </ion-col>\n              </ion-row>\n              <ion-row>\n                  <ion-col>\n                      <h2>¿Estas listo?</h2>\n                      <ion-button expand=\"block\" fill=\"clear\" [routerLink]=\"'/meetup/'\" routerDirection=\"forward\">Comenzar</ion-button>\n                  </ion-col>\n              </ion-row>\n          </ion-grid>\n      </ion-slide>\n    </ion-slides>\n  </ion-content>"

/***/ }),

/***/ "./src/app/landing/landing.page.scss":
/*!*******************************************!*\
  !*** ./src/app/landing/landing.page.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".tutorial-page .toolbar-background {\n  background: #fff;\n  border-color: transparent; }\n\n.tutorial-page .slide-zoom {\n  height: 100%; }\n\n.tutorial-page .slide-title {\n  margin-top: 2.8rem; }\n\n.tutorial-page .slide-image {\n  max-height: 50%;\n  max-width: 60%;\n  margin: 18px 0; }\n\n.tutorial-page b {\n  font-weight: 500; }\n\n.tutorial-page p {\n  padding: 0 40px;\n  font-size: 14px;\n  line-height: 1.5;\n  color: #60646B; }\n\n.tutorial-page p b {\n    color: #000000; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9tYXVyaWNpby9pb25pYy9oYWNrRG9zdHJlcy9GcmFtZXdvcmsvc3JjL2FwcC9sYW5kaW5nL2xhbmRpbmcucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBR00sZ0JBQWdCO0VBQ2hCLHlCQUF5QixFQUFBOztBQUovQjtFQVFNLFlBQVksRUFBQTs7QUFSbEI7RUFZTSxrQkFBa0IsRUFBQTs7QUFaeEI7RUFnQk0sZUFBZTtFQUNmLGNBQWM7RUFDZCxjQUFjLEVBQUE7O0FBbEJwQjtFQXNCTSxnQkFBZ0IsRUFBQTs7QUF0QnRCO0VBMEJNLGVBQWU7RUFDZixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGNBQWMsRUFBQTs7QUE3QnBCO0lBZ0NRLGNBQWMsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2xhbmRpbmcvbGFuZGluZy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcbi50dXRvcmlhbC1wYWdlIHtcblxuICAgIC50b29sYmFyLWJhY2tncm91bmQge1xuICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgfVxuICBcbiAgICAuc2xpZGUtem9vbSB7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgfVxuICBcbiAgICAuc2xpZGUtdGl0bGUge1xuICAgICAgbWFyZ2luLXRvcDogMi44cmVtO1xuICAgIH1cbiAgXG4gICAgLnNsaWRlLWltYWdlIHtcbiAgICAgIG1heC1oZWlnaHQ6IDUwJTtcbiAgICAgIG1heC13aWR0aDogNjAlO1xuICAgICAgbWFyZ2luOiAxOHB4IDA7XG4gICAgfVxuICBcbiAgICBiIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgfVxuICBcbiAgICBwIHtcbiAgICAgIHBhZGRpbmc6IDAgNDBweDtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgICBjb2xvcjogIzYwNjQ2QjtcbiAgXG4gICAgICBiIHtcbiAgICAgICAgY29sb3I6ICMwMDAwMDA7XG4gICAgICB9XG4gICAgfVxuICBcbiAgfSJdfQ== */"

/***/ }),

/***/ "./src/app/landing/landing.page.ts":
/*!*****************************************!*\
  !*** ./src/app/landing/landing.page.ts ***!
  \*****************************************/
/*! exports provided: LandingPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LandingPage", function() { return LandingPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_nfc_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/nfc/ngx */ "./node_modules/@ionic-native/nfc/ngx/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var LandingPage = /** @class */ (function () {
    function LandingPage(nfc, ndef, toastController) {
        this.nfc = nfc;
        this.ndef = ndef;
        this.toastController = toastController;
    }
    LandingPage.prototype.ngOnInit = function () {
    };
    LandingPage.prototype.presentToast = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "no",
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    LandingPage.prototype.presentToastsi = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "si",
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    LandingPage.prototype.addListenNFC = function () {
        var _this = this;
        console.log('entra a addListenNFC');
        this.nfc.addNdefListener(function () {
            console.log('successfully attached ndef listener');
        }, function (err) {
            console.log('error attaching ndef listener', err);
            _this.presentToast();
        }).subscribe(function (event) {
            console.log('received ndef message. the tag contains: ', event.tag);
            console.log('decoded tag id', _this.nfc.bytesToHexString(event.tag.id));
            _this.presentToastsi();
        });
    };
    LandingPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-landing',
            template: __webpack_require__(/*! ./landing.page.html */ "./src/app/landing/landing.page.html"),
            styles: [__webpack_require__(/*! ./landing.page.scss */ "./src/app/landing/landing.page.scss")]
        }),
        __metadata("design:paramtypes", [_ionic_native_nfc_ngx__WEBPACK_IMPORTED_MODULE_2__["NFC"], _ionic_native_nfc_ngx__WEBPACK_IMPORTED_MODULE_2__["Ndef"], _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"]])
    ], LandingPage);
    return LandingPage;
}());



/***/ })

}]);
//# sourceMappingURL=landing-landing-module.js.map