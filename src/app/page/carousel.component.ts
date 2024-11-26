import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports:[CommonModule],
  template: `
    <div
      class="relative w-full h-[400px] flex justify-center items-center overflow-hidden bg-gray-200"
    >
      <div
        class="absolute inset-0 bg-cover bg-center transition-all duration-500"
        *ngIf="images.length; else loading"
        [ngStyle]="{ 'background-image': 'url(' + images[currentIndex] + ')' }"
      ></div>

      <ng-template #loading>
        <div class="flex justify-center items-center w-full h-full">
          <p>Loading images...</p>
        </div>
      </ng-template>

      <button
        (click)="prevImage()"
        class="absolute left-4 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        *ngIf="images.length > 1"
      >
        ‹
      </button>

      <div class="text-center">
        <button
          class="py-2 hover:py-3 border bg-white/50 hover:bg-white font-regular hover:font-semibold drop-shadow-md hover:drop-shadow-md rounded-xl hover:rounded-2xl px-6 hover:px-7"
        >
          SHOP NOW
        </button>
      </div>

      <button
        (click)="nextImage()"
        class="absolute right-4 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        *ngIf="images.length > 1"
      >
        ›
      </button>
    </div>
  `,
  styles: [],
})
export class CarouselComponent implements OnInit {
  images: string[] = [];
  currentIndex = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Replace with your API URL
    const apiUrl = 'https://script.google.com/macros/s/AKfycbzyapuruFi_dTX0lgbszFw7a57wsm8UAEukMufSzIDJdkeWn9CkovCvcg9MAV5KyfKMhg/exec';
    this.http.get<string[]>(apiUrl).subscribe({
      next: (data) => {
        this.images = data;
      },
      error: () => {
        console.error('Failed to load images from API');
      },
    });
  }

  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
