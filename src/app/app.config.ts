import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';

// Define your application routes here
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'game', component: GameComponent }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Provide the router configuration
    provideClientHydration()
  ]
};
