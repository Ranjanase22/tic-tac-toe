import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Output() gameModeSelected = new EventEmitter<'player' | 'computer'>();

  constructor(private router: Router) {}

  startGame(mode: 'player' | 'computer'): void {
    // Emit the event and navigate to the game page
    this.gameModeSelected.emit(mode);
    this.router.navigate(['/game']);
  }
}
