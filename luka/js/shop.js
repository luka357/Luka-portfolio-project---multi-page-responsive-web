// ==================== API ====================

// საათების ჩატვირთვა API-დან (sort და category ფილტრებით)
async function loadWatches() {
    const token = localStorage.getItem('access_token');
    const ordering = document.getElementById('sort-select')?.value || '';
    const category = document.getElementById('category-select')?.value || '';

    let url = 'http://127.0.0.1:8000/api/watches/?';
    if (ordering) url += `ordering=${ordering}&`;
    if (category) url += `category=${category}&`;

    try {
        const response = await fetch(url, {
            headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });

        const data = await response.json();
        const watches = Array.isArray(data) ? data : (data.results || []);

        // საათების გამოტანა გვერდზე
        const container = document.querySelector('.cards');
        container.innerHTML = '';

        watches.forEach(watch => {
            container.innerHTML += `
                <div class="card">
                    <div class="image">
                        <img src="${watch.image_url}" alt="${watch.name}" />
                    </div>
                    <div class="info">
                        <h6>${watch.name}</h6>
                        <p>$${watch.price}</p>
                        <button onclick="addToCart(${JSON.stringify(watch).replace(/"/g, '&quot;')})">Add to Cart</button>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// ==================== CART ====================

// კალათის მონაცემები localStorage-იდან
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// საათის კალათაში დამატება
function addToCart(watch) {
    const existing = cart.find(item => item.id === watch.id);
    existing ? existing.quantity += 1 : cart.push({ ...watch, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// საათის კალათიდან წაშლა
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// კალათის განახლება და გამოტანა
function updateCart() {
    const cartBody = document.querySelector('.offcanvas-body');

    if (cart.length === 0) {
        cartBody.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let total = 0;
    let html = '';

    cart.forEach(item => {
        total += parseFloat(item.price) * item.quantity;
        html += `
            <div class="cart-item">
                <img src="${item.image_url}" alt="${item.name}" style="width:80px; height:80px; object-fit:cover;"/>
                <div class="cart-item-info">
                    <p>${item.name}</p>
                    <p>$${item.price} x${item.quantity}</p>
                    <p>სულ: $${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                </div>
                <button onclick="removeFromCart(${item.id})">✕</button>
            </div>
        `;
    });

    html += `<p class="cart-total">მთლიანი: $${total.toFixed(2)}</p>`;
    cartBody.innerHTML = html;
}

// ==================== INIT ====================
loadWatches();
updateCart();