import { createReducer, State, on } from "@ngrx/store"
import * as NavMenuActions from '../Actions/nav-menu.actions'

export const initialState = {
  logedIn: false,
  email: ''
}

const reducer = createReducer(initialState,
  on(NavMenuActions.logInAction, (state, action) => ({ logedIn: true, email: action.email })),
  on(NavMenuActions.logOutAction, (state, action) => ({ ...state, logedIn: false }))
)


export function NavMenuReducer(state, action) {
  return reducer(state, action)
}
