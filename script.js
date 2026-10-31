document.addEventListener('DOMContentLoaded', () => {
    // 1. INTEGRASI CONFIG & TAMPILAN UTAMA
    if (typeof CONFIG !== 'undefined') {
        // Terapan Background Parallax Foto Klien
        const bgMap = {
            'sec-cover': CONFIG.backgrounds?.cover,
            'sec-hero': CONFIG.backgrounds?.hero,
            'sec-quote': CONFIG.backgrounds?.quote,
            'sec-mempelai': CONFIG.backgrounds?.mempelai,
            'sec-acara': CONFIG.backgrounds?.acara,
            'sec-galeri': CONFIG.backgrounds?.galeri,
            'sec-amplop': CONFIG.backgrounds?.amplop,
            'sec-rsvp': CONFIG.backgrounds?.rsvp
        };
        for (const [id, url] of Object.entries(bgMap)) {
            const el = document.getElementById(id);
            if (el && url) el.style.backgroundImage = `url('${url}')`;
        }

        // Teks Tampilan Utama
        if (document.getElementById('cover-title-tag')) document.getElementById('cover-title-tag').innerText = CONFIG.event.title;
        if (document.getElementById('hero-tag')) document.getElementById('hero-tag').innerText = CONFIG.event.title;
        if (document.getElementById('hero-date')) document.getElementById('hero-date').innerText = CONFIG.event.dateText;
        if (document.getElementById('quote-text')) document.getElementById('quote-text').innerText = `"${CONFIG.event.quote}"`;
        if (document.getElementById('quote-source')) document.getElementById('quote-source').innerText = `— ${CONFIG.event.quoteSource}`;
        if (document.getElementById('btn-maps')) document.getElementById('btn-maps').href = CONFIG.event.mapsUrl;

        // Helper Instagram URL (Otomatis Bersihkan @ dan Buka Link Resmi)
        const getIgUrl = (handle) => {
            if (!handle) return '#';
            const cleanHandle = handle.replace('@', '').trim();
            return `https://instagram.com/${cleanHandle}`;
        };

        // Render Profile Mempelai
        const coverHeading = document.getElementById('cover-heading');
        const heroHeading = document.getElementById('hero-heading');
        const profileContainer = document.getElementById('profile-container');

        if (CONFIG.type === 'wedding' && CONFIG.wedding) {
            const p = CONFIG.wedding.pria;
            const w = CONFIG.wedding.wanita;
            if (coverHeading) coverHeading.innerHTML = `${p.nama.split(',')[0]} <br>& <br>${w.nama.split(',')[0]}`;
            if (heroHeading) heroHeading.innerHTML = `${p.nama.split(',')[0]} <br>& <br>${w.nama.split(',')[0]}`;

            if (profileContainer) {
                profileContainer.innerHTML = `
                    <div class="text-center space-y-3 mb-8">
                        <h2 class="font-serif text-3xl sm:text-5xl font-bold text-cyan-300">Pasangan Mempelai</h2>
                    </div>
                    <div class="grid md:grid-cols-2 gap-12 items-center">
                        <div class="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl backdrop-blur-md text-center space-y-4 border-cyan-500/30 float-item">
                            <img src="${p.foto}" class="w-36 h-36 rounded-full mx-auto object-cover border-2 border-cyan-400 shadow-lg">
                            <h3 class="font-serif text-2xl font-bold text-slate-100">${p.nama}</h3>
                            <p class="text-xs text-slate-400">${p.orangTua}</p>
                            <a href="${getIgUrl(p.instagram)}" target="_blank" class="inline-flex items-center space-x-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                                <i class="fa-brands fa-instagram"></i><span>${p.instagram}</span>
                            </a>
                        </div>
                        <div class="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl backdrop-blur-md text-center space-y-4 border-purple-500/30 float-item" style="animation-delay: -2.5s;">
                            <img src="${w.foto}" class="w-36 h-36 rounded-full mx-auto object-cover border-2 border-purple-400 shadow-lg">
                            <h3 class="font-serif text-2xl font-bold text-slate-100">${w.nama}</h3>
                            <p class="text-xs text-slate-400">${w.orangTua}</p>
                            <a href="${getIgUrl(w.instagram)}" target="_blank" class="inline-flex items-center space-x-2 text-xs text-purple-400 hover:text-purple-300 transition-colors">
                                <i class="fa-brands fa-instagram"></i><span>${w.instagram}</span>
                            </a>
                        </div>
                    </div>
                `;
            }
        }

        // Render Jadwal Acara (Dengan Foto Tempat/Rumah)
        const schedContainer = document.getElementById('schedule-container');
        if (schedContainer && CONFIG.schedules) {
            schedContainer.innerHTML = '';
            CONFIG.schedules.forEach(item => {
                const card = document.createElement('div');
                card.className = 'bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-md shadow-xl text-center space-y-4 group hover:border-cyan-500/50 transition-all duration-300';
                card.innerHTML = `
                    ${item.image ? `<div class="h-44 w-full overflow-hidden relative"><img src="${item.image}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"><div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div></div>` : ''}
                    <div class="p-6 space-y-2">
                        <h3 class="font-serif text-2xl font-bold text-cyan-300">${item.name}</h3>
                        <p class="text-slate-300 text-sm font-semibold">${item.time}</p>
                        <p class="text-xs text-slate-400">${item.location}<br>${item.address}</p>
                    </div>
                `;
                schedContainer.appendChild(card);
            });
        }

        // Render Galeri Foto
        const galleryGrid = document.getElementById('gallery-grid');
        if (galleryGrid && CONFIG.gallery) {
            galleryGrid.innerHTML = '';
            CONFIG.gallery.forEach(url => {
                const wrap = document.createElement('div');
                wrap.className = 'overflow-hidden rounded-2xl border border-slate-800 shadow-lg group';
                wrap.innerHTML = `<img src="${url}" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500">`;
                galleryGrid.appendChild(wrap);
            });
        }

        // Render Amplop Digital + Ikon Bank
        const bankContainer = document.getElementById('bank-container');
        if (bankContainer && CONFIG.bankAccounts) {
            bankContainer.innerHTML = '';
            CONFIG.bankAccounts.forEach((acc, idx) => {
                const el = document.createElement('div');
                el.className = 'bg-slate-900/90 border border-slate-800 p-6 rounded-2xl backdrop-blur-md space-y-3 flex flex-col items-center justify-center shadow-xl';
                el.innerHTML = `
                    <div class="h-10 flex items-center justify-center mb-1">
                        ${acc.icon ? `<img src="${acc.icon}" alt="${acc.bank}" class="h-8 object-contain max-w-[120px]">` : `<span class="text-xs font-bold text-cyan-400 uppercase">${acc.bank}</span>`}
                    </div>
                    <p id="bank-num-${idx}" class="text-2xl font-mono font-bold text-slate-100">${acc.number}</p>
                    <p class="text-xs text-slate-400">a.n. ${acc.owner}</p>
                    <button onclick="copyAccNumber('bank-num-${idx}')" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 flex items-center space-x-2 transition-all">
                        <i class="fa-solid fa-copy"></i> <span>Salin Nomor Rekening</span>
                    </button>
                `;
                bankContainer.appendChild(el);
            });
        }
    }

    // Nama Tamu Dinamis dari URL (?to=Nama+Tamu)
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('to');
    if (guestParam) {
        if (document.getElementById('guest-name')) document.getElementById('guest-name').innerText = guestParam;
        if (document.getElementById('input-name')) document.getElementById('input-name').value = guestParam;
    }

    // Buka Undangan & Autoplay Musik
    const btnOpen = document.getElementById('btn-open');
    const audio = document.getElementById('wedding-audio');
    const audioControl = document.getElementById('audio-control');
    const audioIcon = document.getElementById('audio-icon');
    let isPlaying = false;

    if (btnOpen) {
        btnOpen.addEventListener('click', () => {
            const cover = document.getElementById('sec-cover');
            if (cover) cover.classList.add('opacity-0', 'pointer-events-none');
            setTimeout(() => {
                if (cover) cover.style.display = 'none';
                const mainContent = document.getElementById('main-content');
                if (mainContent) mainContent.classList.remove('hidden');
                if (audioControl) audioControl.classList.remove('hidden');
            }, 1000);

            if (audio) {
                audio.play().then(() => {
                    isPlaying = true;
                    if (audioIcon) audioIcon.classList.add('spin-slow');
                }).catch(err => console.log("Autoplay diblokir browser:", err));
            }
        });
    }

    if (audioControl) {
        audioControl.addEventListener('click', () => {
            if (!audio) return;
            if (isPlaying) {
                audio.pause();
                if (audioIcon) audioIcon.classList.remove('spin-slow');
            } else {
                audio.play();
                if (audioIcon) audioIcon.classList.add('spin-slow');
            }
            isPlaying = !isPlaying;
        });
    }

    // Buka / Tutup Amplop Digital saat Diklik
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    if (envelopeWrapper) {
        envelopeWrapper.addEventListener('click', () => {
            envelopeWrapper.classList.toggle('open');
        });
    }

    // Hitung Mundur (Countdown)
    if (typeof CONFIG !== 'undefined' && CONFIG.event?.targetCountdown) {
        const targetDate = new Date(CONFIG.event.targetCountdown).getTime();
        setInterval(() => {
            const now = new Date().getTime();
            const diff = targetDate - now;
            if (diff > 0) {
                if (document.getElementById('days')) document.getElementById('days').innerText = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
                if (document.getElementById('hours')) document.getElementById('hours').innerText = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
                if (document.getElementById('minutes')) document.getElementById('minutes').innerText = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
                if (document.getElementById('seconds')) document.getElementById('seconds').innerText = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
            }
        }, 1000);
    }

    // RSVP Form & Fetch Comments
    const rsvpForm = document.getElementById('rsvp-form');
    const commentsContainer = document.getElementById('comments-container');

    function fetchComments() {
        if (!commentsContainer) return;
        if (typeof CONFIG === 'undefined' || !CONFIG.scriptUrl || CONFIG.scriptUrl.includes("PASTE_URL")) {
            commentsContainer.innerHTML = '<p class="text-xs text-slate-500 text-center">Belum ada ucapan tersimpan.</p>';
            return;
        }

        commentsContainer.innerHTML = '<p class="text-xs text-cyan-400 text-center">Memuat ucapan...</p>';

        fetch(CONFIG.scriptUrl)
            .then(res => res.json())
            .then(data => {
                commentsContainer.innerHTML = '';
                if (!data || data.length === 0) {
                    commentsContainer.innerHTML = '<p class="text-xs text-slate-500 text-center">Belum ada ucapan. Jadilah yang pertama memberikan ucapan!</p>';
                    return;
                }

                data.forEach(item => {
                    const el = document.createElement('div');
                    el.className = 'bg-slate-900/80 border border-slate-800 p-4 rounded-xl text-left space-y-1';
                    el.innerHTML = `
                        <div class="flex justify-between items-center">
                            <span class="font-bold text-cyan-300 text-sm">${escapeHtml(item.name)}</span>
                            <span class="text-[10px] px-2 py-0.5 rounded-full ${item.status === 'Hadir' ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30' : 'bg-slate-800 text-slate-400'}">${item.status}</span>
                        </div>
                        <p class="text-xs text-slate-300">${escapeHtml(item.message)}</p>
                        <span class="text-[9px] text-slate-500 block pt-1">${item.date || ''}</span>
                    `;
                    commentsContainer.appendChild(el);
                });
            })
            .catch(err => {
                console.error("Gagal memuat ucapan:", err);
                commentsContainer.innerHTML = '<p class="text-xs text-red-400 text-center">Gagal memuat ucapan.</p>';
            });
    }

    fetchComments();

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = rsvpForm.querySelector('button[type="submit"]');
            const name = document.getElementById('input-name').value;
            const status = document.getElementById('input-status').value;
            const msg = document.getElementById('input-message').value;

            if (typeof CONFIG === 'undefined' || !CONFIG.scriptUrl || CONFIG.scriptUrl.includes("PASTE_URL")) {
                alert("URL Database Google Script belum dipasang di config.js!");
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerText = "Mengirim...";

            const payload = {
                name: name,
                status: status,
                message: msg
            };

            fetch(CONFIG.scriptUrl, {
                method: 'POST',
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(res => {
                alert('Terima kasih! Ucapan Anda telah tersimpan.');
                document.getElementById('input-message').value = '';
                submitBtn.disabled = false;
                submitBtn.innerText = "Kirim Ucapan";
                fetchComments();
            })
            .catch(err => {
                console.error("Gagal mengirim ucapan:", err);
                alert('Terjadi kesalahan saat menyimpan ucapan. Silakan coba lagi.');
                submitBtn.disabled = false;
                submitBtn.innerText = "Kirim Ucapan";
            });
        });
    }
});

// Helper Functions
function escapeHtml(text) {
    return text ? text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : '';
}

function copyAccNumber(id) {
    const el = document.getElementById(id);
    if (el) {
        navigator.clipboard.writeText(el.innerText).then(() => {
            alert('Nomor rekening berhasil disalin!');
        });
    }
}
