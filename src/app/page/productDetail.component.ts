// product-modal.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngIf="isOpen" 
      class="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 flex items-center justify-center p-4 drop-shadow-lg"
      (click)="closeModal()"
    >
      <div class="pt-56">
      <div 
        class="bg-gradient-to-r from-[#F3F8F2] to-[#FFF7EC] rounded-t-2xl max-w-md w-full min-h-screen overflow-y-auto "
        (click)="$event.stopPropagation()"
      >
        <!-- Header dengan tombol tutup -->
        <div class="flex justify-center p-4 relative mb-4">
          <button 
            class="absolute items-center top-4 bg-[#CDD5AE] hover:bg-[#9C9D7D] text-black px-6 py-2 rounded-full text-sm font-medium transition-colors drop-shadow-md"
            (click)="closeModal()"
          >
            TUTUP
          </button>
        </div>

        <!-- Icon dan Judul -->
        <div class="px-8 py-4">
          
          <!-- Nomor dan Nama Produk -->
          <div class="space-y-4">
            
            
            <!-- Gambar Produk -->
            <div class="rounded-xl overflow-hidden drop-shadow-md">
              <img 
                [src]="product?.urlGambar" 
                [alt]="product?.namaBarang"
                class="w-full h-full object-contain"
                onerror="this.src='https://placehold.co/400'"
              >
            </div>
            <h2 class="text-xl font-bold text-center">{{product?.nomor}}. {{product?.namaBarang}}</h2>
            <!-- Link Marketplace -->
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
  `
})
export class ProductModalComponent {
  @Input() isOpen = false;
  @Input() product: any = null;
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }
}