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
  <div class="relative w-full h-[400px] bg-[url($Imagess[currentIndex]+)] flex justify-center items-center">
    <button class="absolute left-4 bg-white p-2 rounded-full shadow">‹</button>
    <div class="text-center">
      <button class="py-2 hover:py-3 border bg-white/50 hover:bg-white font-regular hover:font-semibold drop-shadow-md hover: drop-shadow-md rounded-xl hover:rounded-2xl px-6 hover:px-7">SHOP NOW</button>
    </div>
    <button class="absolute right-4 bg-white p-2 rounded-full shadow">›</button>
  </div>

  <!-- Produk -->
  <section class="container py-8 px-6">
    <h2 class="text-center font-semibold text-xl mb-4">SAYA SUKA TREND</h2>
    <div class="grid grid-cols-3 gap-1 md:gap-2 lg:gap-6 justify-center mb-6 mx-0 md:mx-24 lg:mx-48 xl:mx-80">
      <button class="px-2 py-2 bg-black text-white rounded-xl text-xs md:text-base text-nowrap">FEATURED</button>
      <button class="px-2 py-2 border rounded-xl text-xs md:text-base text-nowrap">BEST SELLER</button>
      <button class="px-0.5 md:px-2 py-2 border rounded-xl text-xs md:text-base text-nowrap">REKOMENDASI</button>
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
          <h2 class="text-sm text-wrap line-clamp-2">{{ product.deskripsi }}</h2>
         
        </div>
        <div class="grid grid-cols-3 gap-2">
        <a [href]="product.urlTiktok" target="_blank" 
          class="bg-black  py-1 px-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-1">
          <img src="https://res.cloudinary.com/dqbpmesug/image/upload/v1732251062/tiktok_gx9byn.png" alt="TikTok" class="h-4 md:h-7 aspect-[1/1]">
          
        </a>

        <a [href]="product.urlShopee" target="_blank" 
          class="bg-[#EE4D2D] py-1 px-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-1">
          <img src="https://res.cloudinary.com/dqbpmesug/image/upload/v1732251062/shopee_vapivk.png" alt="Shopee" class="h-4 md:h-7 aspect-[1/1]">
          
        </a>

        <a [href]="product.urlTokped" target="_blank" 
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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // Inisialisasi dengan data fallback terlebih dahulu
    this.products = this.getFallbackProducts();
    
    // Hanya fetch data jika di browser
    if (isPlatformBrowser(this.platformId)) {
      this.fetchProducts();
    }
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

      const apiUrlImg = 'https://script.google.com/macros/s/AKfycbzyapuruFi_dTX0lgbszFw7a57wsm8UAEukMufSzIDJdkeWn9CkovCvcg9MAV5KyfKMhg/exec';
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
            // Gunakan fallback jika API mengembalikan data kosong
            this.products = this.getFallbackProducts();
          }
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
  }
  
  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
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
