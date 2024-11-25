import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
   
   
   <div 
      *ngIf="isOpen" 
      class="block md:hidden fixed inset-0 backdrop-blur-sm bg-white/40 z-50 flex items-center justify-center p-4 drop-shadow-lg"
      (click)="closeModal()"
    >
    <div class="flex flex-col items-center">
  <!-- Navbar -->
  <nav 
  class="fixed top-0 left-0 z-50 w-full text-black flex flex-col justify-center items-center bg-white shadow-md"
>
  <!-- Bagian atas navbar (garis hitam) -->
  <div class="w-full bg-black h-5"></div>
  
  <!-- Judul OSA Store -->
  <div class="flex justify-center pt-2 pb-1 w-full">
    <div class="text-2xl font-bold font-sans pr-2">OSA</div>
    <div class="text-2xl font-regular font-sans">Store</div>
  </div>
</nav>
 
    <!-- ----mobile -->
      <div>
        <div 
          class="bg-gradient-to-r from-white/75 to-white/45 rounded-sm max-w-screen w-full min-h-screen overflow-y-auto"
          (click)="$event.stopPropagation()"
        >
          <div class="flex justify-center p-4 relative mb-4">
            <button 
              class="absolute items-center top-4 bg-black/70 hover:bg-black text-white px-6 py-2 rounded-md text-sm font-medium transition-colors drop-shadow-md"
              (click)="closeModal()"
            >
              TUTUP
            </button>
          </div>
          <div class="px-8 py-4">
            <div class="space-y-4">
              <div class="rounded-xl overflow-hidden drop-shadow-md">
              <div class="absolute top-1 left-1 w-8 h-8 flex items-center justify-center bg-white/70 rounded-full text-black font-bold drop-shadow-md z-10">
    {{product?.nomor}}
          </div>
                <img 
                  [src]="product?.urlGambar" 
                  [alt]="product?.namaBarang"
                  class="w-full h-full object-contain"
                  onerror="this.src='https://placehold.co/400'"
                >
              </div>
              <h2 class="text-xl font-bold text-center">{{product?.namaBarang}}</h2>
              <h2 class="text-sm text-wrap line-clamp-2">{{ product.deskripsi }}</h2>
          <ng-container *ngFor="let star of [1, 2, 3, 4, 5]; let i = index">
    <span 
      class="text-yellow-400 text-xl"
      [class.text-gray-300]="i + 1 > +product.bintang"
    >
      ★
    </span>
  </ng-container>
              <div class="space-y-3 py-4">
                <a [href]="product?.urlBeliTikTok" target="_blank" 
                  class="block bg-black text-white py-3 px-4 rounded-xl text-center hover:opacity-90 transition-opacity drop-shadow-md">
                  Beli di TikTok Shop
                </a>
                <a [href]="product?.urlBeliShopee" target="_blank" 
                  class="block bg-[#EE4D2D] text-white py-3 px-4 rounded-xl text-center hover:opacity-90 transition-opacity drop-shadow-md">
                  Beli di Shopee
                </a>
                <a [href]="product?.urlBeliTokopedia" target="_blank" 
                  class="block bg-[#03AC0E] text-white py-3 px-4 rounded-xl text-center hover:opacity-90 transition-opacity drop-shadow-md">
                  Beli di Tokopedia
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
    </div>

    <div 
  *ngIf="isOpen" 
  class="hidden md:flex fixed inset-0 backdrop-blur-sm bg-white/60 z-50 items-center justify-center p-4 drop-shadow-lg"
  (click)="closeModal()"
>
<div class="flex flex-col items-center">
  <!-- Navbar -->
  <nav 
  class="fixed top-0 left-0 z-50 w-full text-black flex flex-col justify-center items-center bg-white shadow-md"
>
  <!-- Bagian atas navbar (garis hitam) -->
  <div class="w-full bg-black h-5"></div>
  
  <!-- Judul OSA Store -->
  <div class="flex justify-center pt-2 pb-1 w-full">
    <div class="text-2xl font-bold font-sans pr-2">OSA</div>
    <div class="text-2xl font-regular font-sans">Store</div>
  </div>
</nav>

  <!-- Container utama untuk desktop -->
  <div 
    class="bg-gradient-to-r from-white/75 to-white/45 rounded-3xl max-w-5xl w-full flex flex-row gap-6 p-6 overflow-hidden"
    (click)="$event.stopPropagation()"
  >
    <!-- Bagian kiri: Gambar produk -->
    <div class="flex-shrink-0 w-1/2 rounded-xl overflow-hidden drop-shadow-md">
    <div class="absolute top-1 left-1 w-8 h-8 flex items-center justify-center bg-white/70 rounded-full text-black font-bold drop-shadow-md z-10">
    {{product?.nomor}}
          </div>
      <img 
        [src]="product?.urlGambar" 
        [alt]="product?.namaBarang"
        class="w-full h-full object-contain"
        onerror="this.src='https://placehold.co/400'"
      >
    </div>

    <!-- Bagian kanan: Informasi produk -->
    <div class="flex flex-col justify-between w-1/2">
      <!-- Header: Judul dan Tombol Tutup -->
      <div class="flex justify-end items-center mb-4">
        
        <button 
          class="bg-black/70 hover:bg-black text-white px-6 py-2 rounded-md text-sm font-medium transition-colors drop-shadow-md"
          (click)="closeModal()"
        >
          TUTUP
        </button>
      </div>

      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-bold"> {{product?.namaBarang}}</h2>
        
      </div>

      <div class="flex justify-start items-center mb-4">
      <h2 class="text-lg font-bold"> {{product?.bintang+"/5"}}</h2>
          <ng-container *ngFor="let star of [1, 2, 3, 4, 5]; let i = index">
    <span 
      class="text-yellow-400 text-xl"
      [class.text-gray-300]="i + 1 > +product?.bintang"
    >
      ★
    </span>
  </ng-container>
      </div>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-sm text-wrap line-clamp-2">{{ product.deskripsi }}</h2>

      </div>

      <!-- Link Marketplace -->
      <div class="space-y-3">
        <a [href]="product?.urlBeliTikTok" target="_blank" 
          class="block bg-black text-white py-3 px-4 rounded-xl text-center hover:opacity-90 transition-opacity drop-shadow-md">
          Beli di TikTok Shop
        </a>
        <a [href]="product?.urlBeliShopee" target="_blank" 
          class="block bg-[#EE4D2D] text-white py-3 px-4 rounded-xl text-center hover:opacity-90 transition-opacity drop-shadow-md">
          Beli di Shopee
        </a>
        <a [href]="product?.urlBeliTokopedia" target="_blank" 
          class="block bg-[#03AC0E] text-white py-3 px-4 rounded-xl text-center hover:opacity-90 transition-opacity drop-shadow-md">
          Beli di Tokopedia
        </a>
      </div>
    </div>
  </div>
  </div>
</div>

  `
})
export class ProductModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() product: any = null;
  @Output() close = new EventEmitter<void>();
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Kode ini hanya akan dijalankan di browser
      document.title = 'Product Modal'; // Contoh penggunaan document
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      if (this.isOpen) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    }
  }

  closeModal(): void {
    this.isOpen = false;
    this.close.emit();
  }
}
