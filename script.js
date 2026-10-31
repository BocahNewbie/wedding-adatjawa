document.addEventListener('DOMContentLoaded', () => {
    // 1. INTEGRASI CONFIG & TAMPILAN UTAMA
    if (typeof CONFIG !== 'undefined') {
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

        if (document.getElementById('cover-title-tag')) document.getElementById('cover-title-tag').innerText = CONFIG.event.title;
        if (document.getElementById('hero-tag')) document.getElementById('hero-tag').innerText = CONFIG.event.title;
        if (document.getElementById('hero-date')) document.getElementById('hero-date').innerText = CONFIG.event.dateText;
        if (document.getElementById('quote-text')) document.getElementById('quote-text').innerText = `"${CONFIG.event.quote}"`;
        if (document.getElementById('quote-source')) document.getElementById('quote-source').innerText = `— ${CONFIG.event.quoteSource}`;
        if (document.getElementById('btn-maps')) document.getElementById('btn-maps').href = CONFIG.event.mapsUrl;

        const getIgUrl = (handle) => {
            if (!handle) return '#';
            const cleanHandle = handle.replace('@', '').trim();
            return `https://instagram.com/${cleanHandle}`;
        };

        // Render Profile Mempelai Jawa Dynasty
        const coverHeading = document.getElementById('cover-heading');
        const heroHeading = document.getElementById('hero-heading');
        const profileContainer = document.getElementById('profile-container');

        if (CONFIG.type === 'wedding' && CONFIG.wedding) {
            const p = CONFIG.wedding.pria;
            const w = CONFIG.wedding.wanita;
            if (coverHeading) coverHeading.innerHTML = `${p.nama.split(',')[0]} <br><span class="text-amber-600 font-serif text-2xl">&</span><br> ${w.nama.split(',')[0]}`;
            if (heroHeading) heroHeading.innerHTML = `${p.nama.split(',')[0]} <br><span class="text-amber-600 font-serif text-3xl">&</span><br> ${w.nama.split(',')[0]}`;

            if (profileContainer) {
                profileContainer.innerHTML = `
                    <div class="text-center space-y-3 mb-8">
                        <h2 class="font-serif text-3xl sm:text-4xl font-bold text-red-950">Pasangan Mempelai</h2>
                    </div>
                    <div class="grid md:grid-cols-2 gap-8 items-center">
                        <div class="bg-amber-50/80 border border-amber-600/30 p-6 rounded-3xl text-center space-y-4 shadow-md">
                            <img src="${p.foto}" class="w-32 h-32 rounded-full mx-auto object-cover border-4 border-amber-600 shadow-lg">
                            <h3 class="font-serif text-2xl font-bold text-red-950">${p.nama}</h3>
                            <p class="text-xs text-stone-600">${p.orangTua}</p>
                            <a href="${getIgUrl(p.instagram)}" target="_blank" class="inline-flex items-center space-x-2 text-xs text-amber-700 hover:text-amber-900 transition-colors">
                                <i class="fa-brands fa-instagram"></i><span>${p.instagram}</span>
                            </a>
                        </div>
                        <div class="bg-amber-50/80 border border-amber-600/30 p-6 rounded-3xl text-center space-y-4 shadow-md">
                            <img src="${w.foto}" class="w-32 h-32 rounded-full mx-auto object-cover border-4 border-amber-600 shadow-lg">
                            <h3 class="font-serif text-2xl font-bold text-red-950">${w.nama}</h3>
                            <p class="text-xs text-stone-600">${w.orangTua}</p>
                            <a href="${getIgUrl(w.instagram)}" target="_blank" class="inline-flex items-center space-x-2 text-xs text-amber-700 hover:text-amber-900 transition-colors">
                                <i class="fa-brands fa-instagram"></i><span>${w.instagram}</span>
                            </a>
                        </div>
                    </div>
                `;
            }
        }

        // Render Jadwal Acara
        const schedContainer = document.getElementById('schedule-container');
        if (schedContainer && CONFIG.schedules) {
            schedContainer.innerHTML = '';
            CONFIG.schedules.forEach(item => {
                const card = document.createElement('div');
                card.className = 'bg-amber-50/90 border border-amber-600/30 rounded-2xl overflow-hidden shadow-lg text-center space-y-4 group';
                card.innerHTML = `
                    ${item.image ? `<div class="h-40 w-full overflow-hidden relative"><img src="${item.image}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"></div>` : ''}
                    <div class="p-5 space-y-2">
                        <h3 class="font-serif text-2xl font-bold text-red-950">${item.name}</h3>
                        <p class="text-amber-800 text-sm font-semibold">${item.time}</p>
                        <p class="text-xs text-stone-600">${item.location}<br>${item.address}</p>
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
                wrap.className = 'overflow-hidden rounded-2xl border-2 border-amber-600/40 shadow-md group';
                wrap.innerHTML = `<img src="${url}" class="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500">`;
                galleryGrid.appendChild(wrap);
            });
        }

        // Render Amplop Digital
        const bankContainer = document.getElementById('bank-container');
        if (bankContainer && CONFIG.bankAccounts) {
            bankContainer.innerHTML = '';
            CONFIG.bankAccounts.forEach((acc, idx) => {
                const el = document.createElement('div');
                el.className = 'bg-amber-50/95 border border-amber-600/40 p-5 rounded-2xl space-y-2 flex flex-col items-center justify-center shadow-md';
                el.innerHTML = `
                    <div class="h-8 flex items-center justify-center mb-1">
                        ${acc.icon ? `<img src="${acc.icon}" alt="${acc.bank}" class="h-7 object-contain max-w-[100px]">` : `<span class="text-xs font-bold text-red-950 uppercase">${acc.bank}</span>`}
                    </div>
                    <p id="bank-num-${idx}" class="text-xl font-mono font-bold text-red-950">${acc.number}</p>
                    <p class="text-xs text-stone-600">a.n. ${acc.owner}</p>
                    <button onclick="copyAccNumber('bank-num-${idx}')" class="px-4 py-1.5 bg-red-900 hover:bg-red-950 text-amber-200 text-xs rounded-lg flex items-center space-x-2 transition-all">
                        <i class="fa-solid fa-copy"></i> <span>Salin Rekening</span>
                    </button>
                `;
                bankContainer.appendChild(el);
            });
        }
    }

    // Nama Tamu Dinamis
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('to');
    if (guestParam) {
        if (document.getElementById('guest-name')) document.getElementById('guest-name').innerText = guestParam;
        if (document.getElementById('input-name')) document.getElementById('input-name').value = guestParam;
    }

    // Buka Undangan & Audio
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

    // Envelope Interactive
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    if (envelopeWrapper) {
        envelopeWrapper.addEventListener('click', () => {
            envelopeWrapper.classList.toggle('open');
        });
    }

    // Countdown Timer
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

    // Fetch Comments
    const rsvpForm = document.getElementById('rsvp-form');
    const commentsContainer = document.getElementById('comments-container');

    function fetchComments() {
        if (!commentsContainer) return;
        if (typeof CONFIG === 'undefined' || !CONFIG.scriptUrl || CONFIG.scriptUrl.includes("PASTE_URL")) {
            commentsContainer.innerHTML = '<p class="text-xs text-stone-500 text-center">Belum ada ucapan tersimpan.</p>';
            return;
        }

        commentsContainer.innerHTML = '<p class="text-xs text-amber-800 text-center">Memuat ucapan...</p>';

        fetch(CONFIG.scriptUrl)
            .then(res => res.json())
            .then(data => {
                commentsContainer.innerHTML = '';
                if (!data || data.length === 0) {
                    commentsContainer.innerHTML = '<p class="text-xs text-stone-500 text-center">Belum ada ucapan. Jadilah yang pertama!</p>';
                    return;
                }

                data.forEach(item => {
                    const el = document.createElement('div');
                    el.className = 'bg-amber-50/90 border border-amber-600/30 p-3.5 rounded-xl text-left space-y-1 shadow-sm';
                    el.innerHTML = `
                        <div class="flex justify-between items-center">
                            <span class="font-bold text-red-950 text-sm">${escapeHtml(item.name)}</span>
                            <span class="text-[10px] px-2 py-0.5 rounded-full ${item.status === 'Hadir' ? 'bg-red-900 text-amber-200' : 'bg-stone-300 text-stone-700'}">${item.status}</span>
                        </div>
                        <p class="text-xs text-stone-700">${escapeHtml(item.message)}</p>
                        <span class="text-[9px] text-stone-400 block pt-1">${item.date || ''}</span>
                    `;
                    commentsContainer.appendChild(el);
                });
            })
            .catch(err => {
                console.error("Gagal memuat ucapan:", err);
                commentsContainer.innerHTML = '<p class="text-xs text-red-700 text-center">Gagal memuat ucapan.</p>';
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
                alert("URL Database Google Script belum dipasang!");
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerText = "Mengirim...";

            const payload = { name: name, status: status, message: msg };

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
                alert('Terjadi kesalahan saat menyimpan ucapan.');
                submitBtn.disabled = false;
                submitBtn.innerText = "Kirim Ucapan";
            });
        });
    }
});

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
