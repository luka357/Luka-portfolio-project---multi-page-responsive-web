// Contact form - Submit handler
document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('submit-btn').addEventListener('click', async function() {

        // ველებიდან მონაცემების წამოღება
        const data = {
            first_name: document.getElementById('first-name').value,
            last_name: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
        };

        // API-ზე გაგზავნა
        try {
            const response = await fetch('http://127.0.0.1:8000/api/contact/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            // წარმატებისას popup-ის ჩვენება და ველების გასუფთავება
            if (response.ok) {
                document.getElementById('success-popup').style.display = 'flex';
                document.getElementById('first-name').value = '';
                document.getElementById('last-name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('subject').value = '';
                document.getElementById('message').value = '';
            } else {
                alert('შეცდომა! სცადეთ თავიდან.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

// Popup-ის დახურვა
function closePopup() {
    document.getElementById('success-popup').style.display = 'none';
}