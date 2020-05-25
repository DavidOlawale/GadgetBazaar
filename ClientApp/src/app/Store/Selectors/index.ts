import { createSelector, createFeatureSelector } from "@ngrx/store"

export interface NavMenuState {
  logedIn: boolean,
  email: string
}
export interface AppState {
  navMenu: NavMenuState
}

export const navMenuKey = 'navMenu'

export const navMenuSelector = createFeatureSelector<AppState, NavMenuState>(navMenuKey)
