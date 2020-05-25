import { createAction, props } from '@ngrx/store'

export const logInAction = createAction('[nav-menu Page] LogIn', props<{ email: string }>())

export const logOutAction = createAction('[nav-menu Page] LogOut')
