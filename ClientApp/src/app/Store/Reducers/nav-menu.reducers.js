"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("@ngrx/store");
var NavMenuActions = require("../Actions/nav-menu.actions");
exports.initialState = {
    logedIn: false,
    email: ''
};
var reducer = store_1.createReducer(exports.initialState, store_1.on(NavMenuActions.logInAction, function (state, action) { return ({ logedIn: true, email: action.email }); }), store_1.on(NavMenuActions.logOutAction, function (state) { return ({ logedIn: false }); }));
function NavMenuReducer(state, action) {
    return reducer(state, action);
}
exports.NavMenuReducer = NavMenuReducer;
//# sourceMappingURL=nav-menu.reducers.js.map