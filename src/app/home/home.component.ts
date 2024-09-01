import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Output() gameModeSelected = new EventEmitter<'player' | 'computer'>();

  constructor(private router: Router) {} // Inject Router

  startGame(mode: 'player' | 'computer'): void {
    this.router.navigate(['/game']); // Navigate to the game page
    this.gameModeSelected.emit(mode);
  }
}
