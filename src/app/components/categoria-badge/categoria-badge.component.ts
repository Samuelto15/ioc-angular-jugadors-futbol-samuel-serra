import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-categoria-badge',
  imports: [],
  templateUrl: './categoria-badge.component.html',
  styleUrl: './categoria-badge.component.scss'
})
export class CategoriaBadgeComponent {
  @Input({ required: true }) posicio!: string;
}