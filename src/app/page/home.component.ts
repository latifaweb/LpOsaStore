import { ChangeDetectorRef, Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { animate, style, transition, trigger } from '@angular/animations';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { timeout } from 'rxjs/internal/operators/timeout';
import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
import { ProductModalComponent } from "./productDetail.component";

export const environment = {
  production: false,
  apiUrl: 'https://script.googleusercontent.com/macros/echo?user_content_key=3cR_4PzWyCqEV4qx6hKNWXeImmihjYXBWBjS2GE-QcM97NcOuc8t9nMYXeO0UEFSSatOf2HktbpwNd9OcB7VM9U54H0qTWBrm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJktRd9gU8Afv6P8N-wKfGIccLDcmlOvBWDsq2VE5Ycgb7KT5oOZSbPrx2KNmcJsTAP4TkwPPibTtfKkq_Y6tW-xXeqnIF-jqtz9Jw9Md8uu&lib=MVXYB5346CT_WvuckoVNZlRgaKOwQqP8j'
};

interface Product {
  nomor: string;
  namaBarang: string;
  urlGambar: string;
  urlBeliTikTok: string;
  urlBeliShopee: string;
  urlBeliTokopedia: string;
}

@Component({
  selector: 'app-osa-store',
  standalone: true,
  imports: [CommonModule],
  template:`
  <!-- src/app/pages/osa-store/osa-store.component.html -->
<div class="flex flex-col items-center">
  <!-- Navbar -->
  <nav class="sticky top-0 z-10 w-full text-black flex flex-col justify-center items-center">
    <div class="w-full bg-black h-5"></div>
    <div class="flex justify-center pt-2 pb-1 bg-white w-full">
    <div class="text-2xl font-bold font-sans pr-2">OSA</div>
    <div class="text-2xl font-regular font-sans "> Store</div>
    </div>
    <!-- <div class="w-full bg-black h-px"></div> -->
  </nav>

  <!-- Slider -->
  <div class="relative w-full h-[400px] bg-gray-200 flex justify-center items-center">
    <button class="absolute left-4 bg-white p-2 rounded-full shadow">‹</button>
    <div class="text-center">
      <button class="py-2 hover:py-3 border bg-white/50 hover:bg-white font-regular hover:font-semibold drop-shadow-md hover: drop-shadow-md rounded-xl hover:rounded-2xl px-6 hover:px-7">SHOP NOW</button>
    </div>
    <button class="absolute right-4 bg-white p-2 rounded-full shadow">›</button>
  </div>

  <!-- Produk -->
  <section class="container py-8 px-6">
    <h2 class="text-center font-semibold text-xl mb-4">SAYA SUKA TREND</h2>
    <div class="grid grid-cols-4 gap-1 md:gap-2 lg:gap-6 justify-center mb-6 mx-0 md:mx-24 lg:mx-48 xl:mx-80">
      <button class="px-2 py-2 bg-black text-white rounded-xl text-xs md:text-base text-nowrap">FEATURED</button>
      <button class="px-2 py-2 border rounded-xl text-xs md:text-base text-nowrap">BEST SELLER</button>
      <button class="px-2 py-2 border rounded-xl text-xs md:text-base text-nowrap">NEW</button>
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
      <p class="text-red-700 text-center">{{ error }}</p>
      <button 
        (click)="retryFetch()" 
        class="mt-2 w-full bg-red-100 text-red-700 py-2 px-4 rounded-lg hover:bg-red-200"
      >
        Coba Lagi
      </button>
    </div>
  }

  <!-- Content -->
  @if (!isLoading) {
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
    @for (product of products; track product.nomor) {
      <div class="bg-[#FBF4D7] rounded-lg p-2 drop-shadow-lg flex flex-col">
        <div class="relative w-full aspect-[2/3] rounded-xl mb-2">
          <div class="absolute top-1 left-1 w-8 h-8 flex items-center justify-center bg-[#9C9D7D] rounded-lg text-white font-bold drop-shadow-md z-10">
            {{ product.nomor }}
          </div>
          <img [src]="product.urlGambar + 'q=50&fm=webp'" [alt]="product.namaBarang"
            class="w-full h-full object-cover rounded-lg cursor-pointer" (click)="openProductDetail(product)"
            loading="lazy"
            onerror="this.src='https://placehold.co/400'">
        </div>
        <div class="bg-[#fffaea] rounded-lg p-2 mb-2 drop-shadow-md flex-grow cursor-pointer" (click)="openProductDetail(product)">
          <h2 class="text-sm text-wrap line-clamp-2">{{ product.namaBarang }}</h2>
        </div>
        <div class="grid grid-cols-1 gap-2">
          <a [href]="product.urlBeliTikTok" target="_blank" 
            class="bg-black text-white py-2 px-3 rounded-lg text-xs font-medium text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-1">
            
            TikTok
          </a>
          <a [href]="product.urlBeliShopee" target="_blank" 
            class="bg-[#EE4D2D] text-white py-2 px-3 rounded-lg text-xs font-medium text-center hover:opacity-90 transition-opacity">
            Shopee
          </a>
          <a [href]="product.urlBeliTokopedia" target="_blank" 
            class="bg-[#03AC0E] text-white py-2 px-3 rounded-lg text-xs font-medium text-center hover:opacity-90 transition-opacity">
            Tokopedia
          </a>
        </div>
      </div>
    }
    </div>
  }
  </section>

  <!-- Testimoni -->
  <footer class="w-full bg-gray-100 py-2 text-center">
    <!-- <h3 class="font-semibold text-lg">TESTIMONI</h3> -->
  </footer>
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
        timeout(5000), // timeout setelah 5 detik
        retry(this.maxRetries), // coba ulang maksimal 3 kali
        catchError(this.handleError.bind(this))
      )
      .subscribe({
        next: (data) => {
          if (data && Array.isArray(data) && data.length > 0) {
            this.products = data;
          }
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Final error after retries:', error);
          this.error = 'Gagal memuat data produk. Menggunakan data cadangan.';
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Terjadi kesalahan saat memuat data.';
    
    if (error.status === 404) {
      errorMessage = 'Data tidak ditemukan.';
    } else if (error.status === 0) {
      errorMessage = 'Tidak dapat terhubung ke server.';
    }

    this.error = errorMessage;
    return of(this.getFallbackProducts()); // Return fallback data
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

// Tambahkan method ini di dalam class ProductListComponent:
openProductDetail(product: Product): void {
  this.selectedProduct = product;
  this.isModalOpen = true;
}

closeModal(): void {
  this.isModalOpen = false;
  this.selectedProduct = null;
}


  private getFallbackProducts(): Product[] {
    return [
      {
        nomor: '1',
        namaBarang: 'Produk 1',
        urlGambar: 'https://placehold.co/400',
        urlBeliTikTok: '',
        urlBeliShopee: '',
        urlBeliTokopedia: ''
      },
      {
        nomor: '2',
        namaBarang: 'Produk 2',
        urlGambar: 'https://placehold.co/400',
        urlBeliTikTok: '',
        urlBeliShopee: '',
        urlBeliTokopedia: ''
      },
      {
        nomor: '3',
        namaBarang: 'Produk 3',
        urlGambar: 'https://placehold.co/400',
        urlBeliTikTok: '',
        urlBeliShopee: '',
        urlBeliTokopedia: ''
      },
      {
        nomor: '4',
        namaBarang: 'Produk 4',
        urlGambar: 'https://placehold.co/400',
        urlBeliTikTok: '',
        urlBeliShopee: '',
        urlBeliTokopedia: ''
      },
      {
        nomor: '5',
        namaBarang: 'Produk 5',
        urlGambar: 'https://placehold.co/400',
        urlBeliTikTok: '',
        urlBeliShopee: '',
        urlBeliTokopedia: ''
      },
      {
        nomor: '6',
        namaBarang: 'Produk 5',
        urlGambar: 'https://placehold.co/400',
        urlBeliTikTok: '',
        urlBeliShopee: '',
        urlBeliTokopedia: ''
      },
      {
        nomor: '7',
        namaBarang: 'Produk 5',
        urlGambar: 'https://placehold.co/400',
        urlBeliTikTok: '',
        urlBeliShopee: '',
        urlBeliTokopedia: ''
      },
      {
        nomor: '8',
        namaBarang: 'Produk 5',
        urlGambar: 'https://placehold.co/400',
        urlBeliTikTok: '',
        urlBeliShopee: '',
        urlBeliTokopedia: ''
      },
    ];
  }
}
