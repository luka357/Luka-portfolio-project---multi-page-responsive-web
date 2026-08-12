async function loadWatches() {
    const token = localStorage.getItem('access_token');
    const sortSelect = document.getElementById('sort-select');
    const categorySelect = document.getElementById('category-select');
    const ordering = sortSelect ? sortSelect.value : '';
    const category = categorySelect ? categorySelect.value : '';
    
    let url = 'http://127.0.0.1:8000/api/watches/?';
    if (ordering) url += `ordering=${ordering}&`;
    if (category) url += `category=${category}&`;
    
    try {
        const response = await fetch(url, {
            headers: token ? {
                'Authorization': `Bearer ${token}`
            } : {}
        });

        console.log('Status:', response.status);
        
        const data = await response.json();
        console.log('Data:', data);
        
        const watches = Array.isArray(data) ? data : (data.results || []);
        
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
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

function updateNavBar() {
    const token = localStorage.getItem('access_token');
    const navLink = document.getElementById('auth-link');
    
    if (token) {
        navLink.href = '#';
        navLink.onclick = logout;
        navLink.querySelector('span').textContent = 'Log Out';
    } else {
        navLink.href = './login.html';
        navLink.onclick = null;
        navLink.querySelector('span').textContent = 'Log In';
    }
}

function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.reload();
}

updateNavBar();
loadWatches();