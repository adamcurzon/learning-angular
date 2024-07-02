import { CommonModule } from '@angular/common';
import { SnackbarService } from './../snackbar.service';
import { Component, inject, Input } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="snackbar active"
      [ngClass]="{ active: snackbarService.isShown() }"
    >
      {{ snackbarService.getErrorMessage() }}
    </section>
  `,
  styleUrl: './snackbar.component.css',
})
export class SnackbarComponent {
  @Input() error!: String;

  snackbarService: SnackbarService = inject(SnackbarService);

  constructor() {}
}
