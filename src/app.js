// Sebagian besar hampir semuanya sudah diperbaiki AI Deepseek!
document.addEventListener('alpine:init', () => {
    Alpine.data('product', () => ({
        items: [
            { id: 1, name: 'Robusta', img: '1.jpg', price: 20000 },
            { id: 2, name: 'Arabica Blend', img: '2.jpg', price: 25000 },
            { id: 3, name: 'Excelsa', img: '3.jpg', price: 30000 },
            { id: 4, name: 'Lintong', img: '4.jpg', price: 35000 },
            { id: 5, name: 'Liberika', img: '5.jpg', price: 40000 },
        ],
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,

        add(newItem) {
            //Untuk menampilkan item cart pada side bar: Cek dahulu apakah terdapat item cart pada side bar
            const cartItem = this.items.find((item) => item.id === newItem.id);
            // Jika side bar belum ada terisi item cart (menu cart masih kosong) maka menarik data dari logo cart-katalog produk utk diinput ke side bar
            if (!cartItem) {
                this.items = [...this.items, {
                    ...newItem,
                    quantity: 1,
                    total: newItem.price
                }];
                this.quantity += 1;
                this.total += newItem.price;
            } else {
                // Jika item sudah ada, periksa apakah item itu sama atau beda dgn yg ada di cart? 
                this.items = this.items.map((item) => {
                    // Jika item berbeda
                    if (item.id !== newItem.id) {
                        return item;
                    }
                    // Jika item sudah ada, tambah quntity dan totalnya
                    const quantity = item.quantity + 1;
                    const total = item.price * quantity;

                    this.quantity += 1;
                    this.total += item.price;

                    return { ...item, quantity, total };
                });
            }
        },

        remove(id) {
            // Ambil item cart pada side bar yang mau diremove berdasarkan id nya
            const cartItem = this.items.find((item) => item.id === id);

            if (!cartItem) return;
            // Jika item tsb lebih dari 1
            if (cartItem.quantity > 1) {
                // Telusuri satu per satu
                this.items = this.items.map((item) => {
                    // Jika bukan item yg dipilih
                    if (item.id !== id) {
                        return item;
                    }

                    const quantity = item.quantity - 1;
                    const total = item.price * quantity;

                    this.quantity -= 1;
                    this.total -= item.price;

                    return { ...item, quantity, total };
                });
            } else {
                // Jika itemnya sisa 1
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity -= 1;
                this.total -= cartItem.price;
            }
        }
    });
});

// Form validation-checkout
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');
form.addEventListener('keyup', function () {
    let allFilled = true;

    for (let i = 0; i < form.elements.length; i++) {
        // Skip button elements
        if (form.elements[i].type === 'button') continue;

        if (form.elements[i].value.length === 0) {
            allFilled = false;
            break;
        }
    }

    if (allFilled) {
        checkoutButton.disabled = false;
        checkoutButton.classList.remove('disabled');
    } else {
        checkoutButton.disabled = true;
        checkoutButton.classList.add('disabled');
    }
});

// Kirim data ketika tombol checkout diklik
checkoutButton.addEventListener('click', async function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    // const message = formatMessage(objData);
    // window.open(`http://wa.me/+6281257073812?text=${encodeURIComponent(message)}`);

    // Minta trasaction token menggunakan ajax/fetch
    try {
        const response = await fetch('php/placeOrder.php', {
            method: 'POST',
            body: data,
        });
        const token = await response.text();
        window.snap.pay('TRANSACTION_TOKEN_HERE');
    } catch (err) {
        console.log(err.message);
    }

});

// Format pesan What's App (sudah dikoreksi oleh AI Deepseek!)
const formatMessage = (obj) => {
    return `Data Customer
    Nama: ${obj.name}
    Email: ${obj.email}
    No. HP: ${obj.phone}
Data Pesanan
${JSON.parse(obj.items).map((item) => `    - ${item.name} (${item.quantity} x ${rupiah(item.total)})`).join('\n')}
    
TOTAL: ${rupiah(obj.total)}

Terima Kasih.`;
};

// Conversi Format Nominal ke Mata Uang Rupiah
const rupiah = (number) => {
    const value = Number(number) || 0;
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);
};