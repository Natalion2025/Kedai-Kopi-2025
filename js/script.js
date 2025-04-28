// Toggle class active untuk hamburger menu model side bar pada tablet-sliding kanan kiri
const navbarNav = document.querySelector(".navbar-nav");
// Ketika menu Hamburger diklik
document.querySelector("#hamburger-menu").onclick = (e) => {
  navbarNav.classList.toggle("active");
  // Agar ketika hamburger-menu diklik posisi halaman tidak berpindah ke atas (bawaan menu)
  e.preventDefault();
};

// Toggle class active untuk tampilkan search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  // Agar cursor tetap aktif dgn sendiri di search box
  searchBox.focus();
  // Agar ketika search button diklik posisi halaman tidak berpindah ke atas (bawaan menu)
  e.preventDefault();
};

// Toggle Class Active untuk Shopping Cart model side bar-sliding kanan kiri
const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

// Klik di luar element menu terpilih untuk menghilangkan tampilan
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});


// Modal Box
document.addEventListener('DOMContentLoaded', function () {
  // Inisialisasi Feather Icons
  feather.replace();

  // Variabel modal
  const itemDetailModal = document.getElementById('item-detail-modal');
  const closeModal = itemDetailModal.querySelector('.close-icon');

  // Fungsi untuk menutup modal
  function closeItemModal() {
    itemDetailModal.style.display = 'none';
  }

  // Event listener untuk tombol close
  closeModal.addEventListener('click', function (e) {
    e.preventDefault();
    closeItemModal();
  });

  // Tutup modal ketika klik di luar konten modal
  window.addEventListener('click', function (e) {
    if (e.target === itemDetailModal) {
      closeItemModal();
    }
  });

  // Fungsi untuk membuka modal dengan data produk tertentu
  function showProductDetail(product) {
    // Update konten modal dengan data produk
    const modalContent = itemDetailModal.querySelector('.modal-content');
    modalContent.querySelector('img').src = product.image;
    modalContent.querySelector('img').alt = product.name;
    modalContent.querySelector('h3').textContent = product.name;
    modalContent.querySelector('p').textContent = product.description;
    modalContent.querySelector('.product-price').innerHTML =
      `${product.price} <span>${product.originalPrice}</span>`;

    // Update rating bintang
    const starsContainer = modalContent.querySelector('.product-star');
    starsContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      const star = document.createElement('i');
      star.dataset.feather = 'star';
      star.className = i < product.rating ? 'star-full' : 'star-empty';
      starsContainer.appendChild(star);
    }

    // Tampilkan modal
    itemDetailModal.style.display = 'flex';

    // Refresh Feather Icons untuk ikon yang baru ditambahkan
    feather.replace();
  }

  // Contoh penggunaan:
  // Tambahkan event listener ke semua tombol "Detail" produk
  document.querySelectorAll('.item-detail-button').forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      // Dapatkan data produk dari atribut data atau sumber lainnya
      const productData = {
        image: 'img/products/1.jpg',
        name: 'Borusta',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla fugit officia recusandae. Voluptatem ex aliquid, facere reprehenderit repellendus incidunt. Id illum eligendi repellat non culpa.',
        rating: 4, // Jumlah bintang penuh (1-5)
        price: 'IDR 30K',
        originalPrice: 'IDR 55K'
      };

      showProductDetail(productData);
    });
  });
});

