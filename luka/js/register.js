// Registration form - Submit handler
document.getElementById('register-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;

    // პაროლების შემოწმება
    if (password !== password2) {
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-message').textContent = 'Passwords do not match!';
        return;
    }

    // API-ზე გაგზავნა
    try {
        const response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            // დარეგისტრირების მერე login გვერდზე გადასვლა
            window.location.href = './login.html';
        } else {
            const data = await response.json();
            document.getElementById('error-message').style.display = 'block';
            document.getElementById('error-message').textContent = data.username || 'Registration failed!';
        }
    } catch (error) {
        console.error('Error:', error);
    }
});