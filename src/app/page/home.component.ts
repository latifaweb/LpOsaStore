import { ChangeDetectorRef, Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { animate, style, transition, trigger } from '@angular/animations';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { timeout } from 'rxjs/internal/operators/timeout';
import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
import { ProductModalComponent } from "./productDetail.component";

export const environment = {
  production: false,
  apiUrl: 'https://script.google.com/macros/s/AKfycbxpX5D2PrfR-4JKSmxeh_fiHpN3cGZmTAIjLlb9cmL0RlISgvcvOlgM4u306_MySGfnuA/exec'
};

interface Product {
  nomor: string;
  namaBarang: string;
  bintang: string,        
  deskripsi: string,      
  klik: string,      
  urlGambar: string,
  urlTiktok: string,
  urlTokped: string,
  urlShopee: string 
}

interface Imagess {  
  urlGambar: string;
}

@Component({
  selector: 'app-osa-store',
  standalone: true,
  imports: [CommonModule, ProductModalComponent],
  template:`
  <!-- src/app/pages/osa-store/osa-store.component.html -->
<div class="flex flex-col items-center">
  <!-- Navbar -->
  <nav class="sticky top-0 z-20 w-full text-black flex flex-col justify-center items-center">
    <div class="w-full bg-black h-5"></div>
    <div class="flex justify-center pt-2 pb-1 bg-white w-full">
    <div class="text-2xl font-bold font-sans pr-2">OSA</div>
    <div class="text-2xl font-regular font-sans "> Store</div>
    </div>
    <!-- <div class="w-full bg-black h-px"></div> -->
  </nav>

  <!-- Slider -->
  <div class="relative w-full h-[400px] flex justify-center items-center overflow-hidden">
  <!-- Wrapper for images with sliding animation -->
  <div
    class="absolute w-full h-full flex transition-transform duration-500"
    [ngStyle]="{ transform: 'translateX(' + slideOffset + '%)' }"
  >
    <!-- Display images in a loop -->
    <div
      *ngFor="let image of images; let i = index"
      class="w-full h-full flex-shrink-0 bg-cover bg-center"
      [ngStyle]="{ 'background-image': 'url(' + image.urlGambar + ')' }"
    ></div>
  </div>

  <!-- Loading template -->
  <ng-template #loading>
    <div class="flex justify-center items-center w-full h-full">
      <p>Loading images...</p>
    </div>
  </ng-template>

  <!-- Navigation buttons -->
  <button
    (click)="prevImage()"
    class="absolute border left-4 bg-white/75 px-2 font-bold text-lg rounded-full drop-shadow-md hover:bg-white"
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
    class="absolute border right-4 bg-white/75 px-2 font-bold text-lg rounded-full drop-shadow-md hover:bg-white"
    *ngIf="images.length > 1"
  >
    ›
  </button>
</div>



  <!-- Produk -->
  <section class="container py-8 px-6">
    <h2 class="text-center font-semibold text-xl mb-4">SAYA SUKA TREND</h2>
    <div class="tabs flex justify-center my-4">
        <button
          *ngFor="let tab of tabs"
          class="px-4 py-2 border rounded-lg mx-2"
          [class.bg-black]="selectedTab === tab"
          [class.text-white]="selectedTab === tab"
          [class.bg-white]="selectedTab !== tab"
          [class.text-black]="selectedTab !== tab"
          (click)="selectTab(tab)"
        >
          {{ tab }}
        </button>
      </div>

    @if (isLoading) {
    <div class="flex justify-center items-center p-8">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#9C9D7D] border-t-transparent"></div>
    </div>
  }

  <!-- Error State -->
  @if (error) {
    <div class="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
    <p class="text-red-500 font-semibold">{{ error }}</p>
  <button 
    class="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    (click)="retryFetch()"
  >
    Coba Lagi
  </button>
    </div>
  }

  <!-- Content -->
  @if (!isLoading) {
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4">
    @for (product of products; track product.nomor) {
      <div class=" flex flex-col">
        <div class="relative w-full aspect-[1/1] rounded-sm mb-2">
          <div class="absolute top-1 left-1 w-8 h-8 flex items-center justify-center bg-white/70 rounded-full text-black font-bold drop-shadow-md z-10">
            {{ product.nomor }}
          </div>
          <img 
                  [src]="product.urlGambar" 
                  [alt]="product.namaBarang"
                  class="w-full h-full object-cover rounded-lg cursor-pointer"
                  onerror="this.src='https://placehold.co/400'" (click)="openProductDetail(product)"
                >
        </div>
        <div class="p-2 mb-2 flex-grow cursor-pointer" (click)="openProductDetail(product)">
          <h2 class="text-sm font-semibold text-wrap line-clamp-2">{{ product.namaBarang }}</h2>
       <div class="flex flex-row items-center">
       <h2 class="text-md font-bold"> {{product?.bintang+"/5 "}}</h2>
      <span 
      class="text-yellow-400 text-xl"
      [class.text-gray-300]=""
    >
      ★
    </span>
       </div>
       <h2 class="text-sm text-wrap line-clamp-2">{{ product.klik }}</h2>
          <h2 class="text-sm text-wrap line-clamp-2">{{ product.deskripsi }}</h2>
         
        </div>
        <div [ngClass]="'grid gap-2 grid-cols-' + ((product.urlTiktok ? 1 : 0) + (product.urlShopee ? 1 : 0) + (product.urlTokped ? 1 : 0) || 1)">
  
  <a *ngIf="product.urlTiktok" [href]="product.urlTiktok" target="_blank" 
     class="bg-black py-1 px-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-1">
    <img src="https://res.cloudinary.com/dqbpmesug/image/upload/v1732251062/tiktok_gx9byn.png" alt="TikTok" class="h-4 md:h-7 aspect-[1/1]">
  </a>

  <a *ngIf="product.urlShopee" [href]="product.urlShopee" target="_blank" 
     class="bg-[#EE4D2D] py-1 px-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-1">
    <img src="https://res.cloudinary.com/dqbpmesug/image/upload/v1732251062/shopee_vapivk.png" alt="Shopee" class="h-4 md:h-7 aspect-[1/1]">
  </a>

  <a *ngIf="product.urlTokped" [href]="product.urlTokped" target="_blank" 
     class="bg-[#03AC0E] py-1 px-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-1">
    <img src="https://res.cloudinary.com/dqbpmesug/image/upload/v1732251062/tokped_hu0who.png" alt="Tokopedia" class="h-4 md:h-7 aspect-[1/1]">
  </a>

</div>

      </div>
    }
    </div>
  }
  </section>

  <!-- Testimoni -->
  <footer class="w-full bg-gray-200 py-3 text-center">
  <a href="https://kreyasi.my.id" target="_blank" class="font-regular text-sm text-black hover:underline">
    Created by: Kreyasi.my.id
  </a>
</footer>

<app-product-modal 
  [isOpen]="isModalOpen"
  [product]="selectedProduct"
  (close)="closeModal()"
/>

</div>

  `,
  styles:`
  /* Basic styles for carousel */
.relative {
  position: relative;
}
.overflow-hidden {
  overflow: hidden;
}
.flex {
  display: flex;
}
.w-full {
  width: 100%;
}
.h-full {
  height: 100%;
}
.flex-shrink-0 {
  flex-shrink: 0;
}
.transition-transform {
  transition: transform 0.5s ease-in-out;
}
.bg-cover {
  background-size: cover;
}
.bg-center {
  background-position: center;
}

.tabs button {
        transition: background-color 0.3s, color 0.3s;
      }

  `
})
export class OsaStoreComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);
  
  products: Product[] = [];
  isListView = true;
  isLoading = true;
  error: string | null = null;
  retryCount = 0;
  maxRetries = 3;

  images: Imagess[] = [];
  currentIndex = 0;
  slideOffset = 0;

  tabs: string[] = ['FEATURED', 'BEST SELLER', 'REKOMENDASI'];
  selectedTab: string = this.tabs[0];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // Inisialisasi dengan data fallback terlebih dahulu
    this.products = this.getFallbackProducts();
    
    // Hanya fetch data jika di browser
    if (isPlatformBrowser(this.platformId)) {
      this.fetchProducts();
    }
  }

  selectTab(tab: string): void {
    if (tab === this.tabs[1]) {
      this.products = [...this.products.sort((a, b) => parseInt(b.klik) - parseInt(a.klik))];
    } else {
      this.products = [...this.products.sort((a, b) => parseInt(a.nomor) - parseInt(b.nomor))];
    }
    this.selectedTab = tab;
  }

  private fetchProducts(): void {
    this.isLoading = true;
    this.error = null;
  
    this.http.get<Product[]>(environment.apiUrl)
      .pipe(
        timeout(5000),
        retry(this.maxRetries),
        catchError(this.handleError.bind(this))
      )
      .subscribe({
        next: (data) => {
          if (data && Array.isArray(data) && data.length > 0) {
            this.products = data;
          } else {
            // Gunakan fallback jika API mengembalikan data kosong
            this.products = this.getFallbackProducts();
          }
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Final error after retries:', error);
          this.error = 'Gagal memuat data produk. Menggunakan data cadangan.';
          this.products = this.getFallbackProducts(); // Fallback di sini
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });

      const apiUrlImg =
      'https://script.google.com/macros/s/AKfycbzyapuruFi_dTX0lgbszFw7a57wsm8UAEukMufSzIDJdkeWn9CkovCvcg9MAV5KyfKMhg/exec';
    this.http.get<Imagess[]>(apiUrlImg)
      .pipe(
        timeout(5000),
        retry(this.maxRetries),
        catchError(this.handleError.bind(this))
      )
      .subscribe({
        next: (data) => {
          if (data && Array.isArray(data) && data.length > 0) {
            this.images = data;
          } else {
            this.images = [
              { urlGambar: 'https://placehold.co/800x400?text=No+Image' },
            ];
          }
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching images:', error);
          this.images = [
            { urlGambar: 'https://placehold.co/800x400?text=No+Image' },
          ];
          this.cdr.detectChanges();
        },
      });
  }
  
   nextImage() {
    // Move to the next image
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateSlideOffset();
  }

  prevImage() {
    // Move to the previous image
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateSlideOffset();
  }

  updateSlideOffset() {
    // Set the offset based on the current index
    this.slideOffset = -this.currentIndex * 100;
  }
  

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Terjadi kesalahan saat memuat data.';
    
    if (error.status === 404) {
      errorMessage = 'Data tidak ditemukan.';
    } else if (error.status === 0) {
      errorMessage = 'Tidak dapat terhubung ke server.';
    }
  
    console.error('Error fetching data:', error);
    this.error = errorMessage;
    
    // Gunakan fallback data
    return of(this.getFallbackProducts());
  }

  // Tambahkan fungsi untuk retry manual
  retryFetch(): void {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      this.fetchProducts();
    }
  }

  toggleView(): void {
    this.isListView = !this.isListView;
    this.cdr.detectChanges();
  }

  trackByNomor(index: number, product: Product): string {
    return product.nomor;
  }

  selectedProduct: Product | null = null;
isModalOpen = false;

updateKlik(product: Product): void {
  const payload = {
    nomor: product.nomor,
    klik: parseInt(product.klik) + 1,
  };

  // Menggunakan fetch dengan mode 'no-cors'
  fetch(environment.apiUrl, {
    method: 'POST',
    mode: 'no-cors', // CORS mode
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload), // Kirim payload sebagai JSON
  })
    .then(response => {
      // Cek apakah response memiliki tipe 'opaque' yang berarti tidak ada akses ke response body
      if (response.type === 'opaque') {
      // Panggil handleSuccess jika response sukses
        return null;
      }
      // Jika response tidak 'opaque', coba untuk membaca json
      return response.json();
    })
    .then(data => {
      if (data) {
        console.log('Respon dari server:', data);
        // Lakukan update produk di frontend
        const updatedProduct = this.products.find((p) => p.nomor === product.nomor);
        if (updatedProduct) {
          updatedProduct.klik = `${payload.klik}`; // Simpan klik baru
        }
      }
    })
    .catch(error => {
      console.error('Gagal mengirim data:', error);
      alert(`Gagal mengirim data: ${error.message}. Silakan coba lagi nanti.`); // Menampilkan error
    });
}


// Tambahkan method ini di dalam class ProductListComponent:
openProductDetail(product: Product): void {
  this.selectedProduct = product;
  this.isModalOpen = true;

  // Update jumlah klik saat modal dibuka
  this.updateKlik(product);
}


closeModal(): void {
  this.isModalOpen = false;
  this.selectedProduct = null;
}


private getFallbackProducts(count: number = 8): Product[] {
  return Array.from({ length: count }, (_, i) => ({
    nomor: `${i + 1}`,
    namaBarang: `Produk ${i + 1}`,
    bintang: '5',
    deskripsi: 'Lorem Ipsum',
    klik: `${100 + i}`,
    urlGambar: 'https://placehold.co/400',
    urlTiktok: '',
    urlTokped: '',
    urlShopee: '',
  }));
}

}
