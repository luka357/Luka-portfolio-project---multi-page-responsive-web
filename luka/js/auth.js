function updateNavBar() {
    const token = localStorage.getItem('access_token');
    const navLink = document.getElementById('auth-link');
    
    if (!navLink) return;
    
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