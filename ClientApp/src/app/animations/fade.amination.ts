import { trigger, state, style, transition, animate } from "@angular/animations";

export const fade = trigger('fade', [
  state('void', style({
    opacity: 0,
  })),
  transition(':enter, :leave', [
    animate(400)
  ])
])
