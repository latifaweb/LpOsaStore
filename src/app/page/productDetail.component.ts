import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
   
   
   <div 
      *ngIf="isOpen" 
      class="block md:hidden fixed inset-0 backdrop-blur-md bg-white/30 z-50 flex items-center justify-center drop-shadow-lg"
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
      <div class="pt-56 px-8">
        <div 
          class="bg-gradient-to-r from-white/75 to-white/90 rounded-t-xl min-w-screen min-h-screen overflow-y-auto px-6"
          (click)="$event.stopPropagation()"
        >
          <div class="flex justify-center p-4 relative mb-8">
            <button 
              class="absolute items-center top-4 bg-black/70 hover:bg-black text-white px-6 py-2 rounded-md text-sm font-medium transition-colors drop-shadow-md"
              (click)="closeModal()"
            >
              TUTUP
            </button>
          </div>
          <div class="">
            <div class="space-y-2">
              <div class="rounded-xl overflow-hidden drop-shadow-md">
              <div class="absolute top-2 left-2 w-8 h-8 flex items-center justify-center bg-white/70 rounded-full text-black font-bold drop-shadow-md z-10">
    {{product?.nomor}}
          </div>
                <img 
                  [src]="product?.urlGambar" 
                  [alt]="product?.namaBarang"
                  class="w-full h-full object-contain"
                  onerror="this.src='https://placehold.co/400'"
                >
              </div>
              <h2 class="text-xl font-bold">{{product?.namaBarang}}</h2>
              <div class="flex justify-start items-center mb-2">
      <h2 class="text-lg font-bold"> {{product?.bintang+"/5 "}}</h2>
          
    <span 
      class="text-yellow-400 text-xl"
      [class.text-gray-300]=""
    >
      ★
    </span>

      </div>
              <h2 class="text-sm break-words whitespace-normal line-clamp-8">{{ product?.deskripsi }}</h2>
          
              
            </div>
          </div>
        </div>
        
      </div>
      <div class="fixed bottom-0 left-0 z-30 w-full space-y-4 min-w-screen w-full bg-[#E5E7EB] px-8 py-6 rounded-t-2xl shadow-md">
      <a *ngIf="product?.urlTiktok" [href]="product?.urlBeliTikTok" target="_blank" 
          class="block bg-black text-white py-3 px-4 rounded-xl text-center hover:opacity-90 transition-opacity drop-shadow-md">
          Beli di TikTok Shop
        </a>
        <a *ngIf="product?.urlShopee" [href]="product?.urlBeliShopee" target="_blank" 
          class="block bg-[#EE4D2D] text-white py-3 px-4 rounded-xl text-center hover:opacity-90 transition-opacity drop-shadow-md">
          Beli di Shopee
        </a>
        <a *ngIf="product?.urlBeliTokopedia" [href]="product?.urlBeliTokopedia" target="_blank" 
          class="block bg-[#03AC0E] text-white py-3 px-4 rounded-xl text-center hover:opacity-90 transition-opacity drop-shadow-md">
          Beli di Tokopedia
        </a>
              </div>
      </div>
    </div>

    <div 
  *ngIf="isOpen" 
  class="hidden md:flex fixed inset-0 backdrop-blur-sm bg-white/40 z-50 items-center justify-center p-4 drop-shadow-lg"
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
   <!-- Header: Judul dan Tombol Tutup -->
   <div class="flex justify-end items-center mb-4">
        
        <button 
          class="bg-black/70 hover:bg-black text-white px-6 py-2 rounded-2xl text-sm font-medium transition-colors drop-shadow-md"
          (click)="closeModal()"
        >
          TUTUP
        </button>
      </div>
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
        class="w-full h-full object-cover"
        onerror="this.src='https://placehold.co/400'"
      >
    </div>

    <!-- Bagian kanan: Informasi produk -->
    <div class="flex flex-col justify-between w-1/2">
    <div class="flex flex-col justify-start">
      <div class="flex justify-between items-center mb-1">
        <h2 class="text-lg font-bold"> {{product?.namaBarang}}</h2>
        
      </div>

      <div class="flex justify-start items-center mb-2">
      <h2 class="text-lg font-bold mr-2"> {{product?.bintang+"/5 "}}</h2>
      <span 
      class="text-yellow-400 text-xl">
      ★
    </span>
      </div>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-sm break-words whitespace-normal line-clamp-5">{{ product?.deskripsi }}</h2>

      </div>
      </div>
      <!-- Link Marketplace -->
      <div class="space-y-3">
        <a *ngIf="product?.urlTiktok" [href]="product?.urlBeliTikTok" target="_blank" 
          class="block bg-black text-white py-3 px-4 rounded-xl text-center hover:opacity-90 transition-opacity drop-shadow-md">
          Beli di TikTok Shop
        </a>
        <a *ngIf="product?.urlShopee" [href]="product?.urlBeliShopee" target="_blank" 
          class="block bg-[#EE4D2D] text-white py-3 px-4 rounded-xl text-center hover:opacity-90 transition-opacity drop-shadow-md">
          Beli di Shopee
        </a>
        <a *ngIf="product?.urlBeliTokopedia" [href]="product?.urlBeliTokopedia" target="_blank" 
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
      // Kode ini hanya akan dijalankan di browser // Contoh penggunaan document
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
