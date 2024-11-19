
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
      <button class="px-4 py-2 border bg-white/50 hover:bg-white drop-shadow-md hover: drop-shadow-md rounded-xl px-6">SHOP NOW</button>
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

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
      <div *ngFor="let product of [1, 2, 3, 4, 5, 6, 7, 8]" class="flex flex-col items-center">
        <div class="bg-gray-300 w-full aspect-[2/3] rounded-xl"></div>
        <div class="mt-2">Produk Name</div>
        <div class="flex space-x-2 mt-2">
          <button class="w-6 h-6 bg-gray-800"></button>
          <button class="w-6 h-6 bg-gray-500"></button>
          <button class="w-6 h-6 bg-gray-400"></button>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimoni -->
  <footer class="w-full bg-gray-100 py-8 text-center">
    <h3 class="font-semibold text-lg">TESTIMONI</h3>
  </footer>
</div>

  `
})
export class OsaStoreComponent {}
