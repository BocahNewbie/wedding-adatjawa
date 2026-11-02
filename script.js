document.addEventListener('DOMContentLoaded', () => {
    // 1. INTEGRASI CONFIG & TAMPILAN UTAMA
    if (typeof CONFIG !== 'undefined') {
        // Tambahkan di dalam fungsi rendering background script.js:
        const bgMap = {
            'sec-cover': CONFIG.backgrounds?.cover,
            'sec-hero': CONFIG.backgrounds?.hero,
            'sec-quote': CONFIG.backgrounds?.quote,
            'sec-mempelai': CONFIG.backgrounds?.mempelai,
            'sec-story': CONFIG.backgrounds?.story,
            'sec-acara': CONFIG.backgrounds?.acara,
            'sec-galeri': CONFIG.backgrounds?.galeri,
            'sec-amplop': CONFIG.backgrounds?.amplop,
            'sec-rsvp': CONFIG.backgrounds?.rsvp,
            'sec-thanks': CONFIG.backgrounds?.thanks
        };

        // Pasang background khusus pada kartu terima kasih jika ada:
        const thanksCardBg = document.getElementById('thanks-bg-card');
        if (thanksCardBg && CONFIG.backgrounds?.thanks) {
            thanksCardBg.style.backgroundImage = `url('${CONFIG.backgrounds.thanks}')`;
        }
        
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

        // Render Profile Mempelai Jawa Dynasty (Simetris 100%)
        const coverHeading = document.getElementById('cover-heading');
        const heroHeading = document.getElementById('hero-heading');
        const thanksCouples = document.getElementById('thanks-couples');
        const profileContainer = document.getElementById('profile-container');

        if (CONFIG.type === 'wedding' && CONFIG.wedding) {
            const p = CONFIG.wedding.pria;
            const w = CONFIG.wedding.wanita;
            
            const pCall = p.panggilan || p.nama.split(',')[0];
            const wCall = w.panggilan || w.nama.split(',')[0];

            if (coverHeading) coverHeading.innerHTML = `<span class="font-script text-4xl sm:text-5xl font-normal text-amber-700 block my-1">${pCall}</span> <span class="text-amber-600 font-serif text-xl">&amp;</span> <span class="font-script text-4xl sm:text-5xl font-normal text-amber-700 block my-1">${wCall}</span>`;
            if (heroHeading) heroHeading.innerHTML = `<span class="font-script text-4xl sm:text-6xl font-normal text-amber-700 block my-1">${pCall}</span> <span class="text-amber-600 font-serif text-2xl">&amp;</span> <span class="font-script text-4xl sm:text-6xl font-normal text-amber-700 block my-1">${wCall}</span>`;
            if (thanksCouples) thanksCouples.innerText = `${pCall} & ${wCall}`;

            if (profileContainer) {
                profileContainer.innerHTML = `
                    <div class="text-center space-y-3 mb-8">
                        <h2 class="font-serif text-3xl sm:text-4xl font-bold text-red-950">Pasangan Mempelai</h2>
                    </div>
                    <div class="grid md:grid-cols-2 gap-8 items-stretch">
                        <!-- Kartu Mempelai Pria -->
                        <div class="bg-amber-50/80 border border-amber-600/30 p-6 rounded-3xl text-center shadow-md hover:shadow-xl transition-all h-full flex flex-col justify-between space-y-4">
                            <div class="space-y-4">
                                <div class="relative w-36 h-36 mx-auto">
                                    <img src="${p.foto}" class="w-full h-full rounded-full object-cover border-4 border-amber-600 shadow-lg">
                                    <div class="absolute inset-0 rounded-full border-2 border-amber-400/40 transform scale-105"></div>
                                </div>
                                <div class="min-h-[72px] flex items-center justify-center">
                                    <h3 class="font-serif text-2xl font-bold text-red-950 leading-snug">${p.nama}</h3>
                                </div>
                                <p class="text-xs text-stone-600 leading-relaxed">${p.orangTua}</p>
                            </div>
                            <div class="pt-2">
                                <a href="${getIgUrl(p.instagram)}" target="_blank" class="inline-flex items-center space-x-2 text-xs text-amber-800 hover:text-amber-950 transition-colors bg-amber-100/60 px-3.5 py-1.5 rounded-full border border-amber-600/20">
                                    <i class="fa-brands fa-instagram text-amber-700"></i><span>${p.instagram}</span>
                                </a>
                            </div>
                        </div>

                        <!-- Kartu Mempelai Wanita -->
                        <div class="bg-amber-50/80 border border-amber-600/30 p-6 rounded-3xl text-center shadow-md hover:shadow-xl transition-all h-full flex flex-col justify-between space-y-4">
                            <div class="space-y-4">
                                <div class="relative w-36 h-36 mx-auto">
                                    <img src="${w.foto}" class="w-full h-full rounded-full object-cover border-4 border-amber-600 shadow-lg">
                                    <div class="absolute inset-0 rounded-full border-2 border-amber-400/40 transform scale-105"></div>
                                </div>
                                <div class="min-h-[72px] flex items-center justify-center">
                                    <h3 class="font-serif text-2xl font-bold text-red-950 leading-snug">${w.nama}</h3>
                                </div>
                                <p class="text-xs text-stone-600 leading-relaxed">${w.orangTua}</p>
                            </div>
                            <div class="pt-2">
                                <a href="${getIgUrl(w.instagram)}" target="_blank" class="inline-flex items-center space-x-2 text-xs text-amber-800 hover:text-amber-950 transition-colors bg-amber-100/60 px-3.5 py-1.5 rounded-full border border-amber-600/20">
                                    <i class="fa-brands fa-instagram text-amber-700"></i><span>${w.instagram}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        // Render Perjalanan Cinta (Story Timeline)
        const storyContainer = document.getElementById('story-container');
        if (storyContainer && CONFIG.loveStory) {
            storyContainer.innerHTML = '<div id="journey-line" class="absolute top-0 left-[-2px] w-[2px] bg-gradient-to-b from-amber-600 via-amber-400 to-red-900 transition-all duration-300 ease-out h-0"></div>';
            CONFIG.loveStory.forEach((item) => {
                const card = document.createElement('div');
                card.className = 'relative pl-2 space-y-2 group';
                card.innerHTML = `
                    <div class="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-amber-100 border-2 border-amber-600 flex items-center justify-center shadow-sm group-hover:scale-125 transition-transform">
                        <div class="w-1.5 h-1.5 rounded-full bg-red-900"></div>
                    </div>
                    <div class="bg-amber-50/90 border border-amber-600/30 p-5 rounded-2xl shadow-md hover:shadow-lg transition-all space-y-2">
                        <span class="px-3 py-1 bg-red-900 text-amber-200 text-xs font-bold rounded-full shadow-sm inline-block">${item.year}</span>
                        <h3 class="font-serif text-lg font-bold text-red-950">${item.title}</h3>
                        <p class="text-xs text-stone-600 leading-relaxed pt-1">${item.description}</p>
                    </div>
                `;
                storyContainer.appendChild(card);
            });
        }

        // Render Jadwal Acara
        const schedContainer = document.getElementById('schedule-container');
        if (schedContainer && CONFIG.schedules) {
            schedContainer.innerHTML = '';
            CONFIG.schedules.forEach(item => {
                const card = document.createElement('div');
                card.className = 'bg-amber-50/90 border border-amber-600/30 rounded-2xl overflow-hidden shadow-lg text-center space-y-4 group transition-all duration-300 hover:-translate-y-1';
                card.innerHTML = `
                    ${item.image ? `<div class="h-44 w-full overflow-hidden relative"><img src="${item.image}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"><div class="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent"></div></div>` : ''}
                    <div class="p-5 space-y-2">
                        <h3 class="font-serif text-2xl font-bold text-red-950">${item.name}</h3>
                        <p class="text-amber-800 text-sm font-semibold border-y border-amber-600/20 py-1 inline-block px-3">${item.time}</p>
                        <p class="text-xs text-stone-600 leading-relaxed">${item.location}<br>${item.address}</p>
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
                wrap.className = 'overflow-hidden rounded-2xl border-2 border-amber-600/40 shadow-md group cursor-pointer relative';
                wrap.innerHTML = `
                    <img src="${url}" class="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-stone-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xl">
                        <i class="fa-solid fa-magnifying-glass-plus"></i>
                    </div>
                `;
                wrap.addEventListener('click', () => openGalleryModal(url));
                galleryGrid.appendChild(wrap);
            });
        }

        // Render Amplop Digital
        const bankContainer = document.getElementById('bank-container');
        if (bankContainer && CONFIG.bankAccounts) {
            bankContainer.innerHTML = '';
            CONFIG.bankAccounts.forEach((acc, idx) => {
                const el = document.createElement('div');
                el.className = 'bg-amber-50/95 border border-amber-600/40 p-5 rounded-2xl space-y-2 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-all';
                el.innerHTML = `
                    <div class="h-8 flex items-center justify-center mb-1">
                        ${acc.icon ? `<img src="${acc.icon}" alt="${acc.bank}" class="h-7 object-contain max-w-[100px]">` : `<span class="text-xs font-bold text-red-950 uppercase">${acc.bank}</span>`}
                    </div>
                    <p id="bank-num-${idx}" class="text-xl font-mono font-bold text-red-950 tracking-wider">${acc.number}</p>
                    <p class="text-xs text-stone-600">a.n. ${acc.owner}</p>
                    <button onclick="copyAccNumber('bank-num-${idx}')" class="px-4 py-1.5 bg-gradient-to-r from-red-900 to-amber-900 hover:from-red-950 hover:to-amber-950 text-amber-200 text-xs font-semibold rounded-lg flex items-center space-x-2 transition-all shadow-sm active:scale-95">
                        <i class="fa-solid fa-copy"></i> <span>Salin Rekening</span>
                    </button>
                `;
                bankContainer.appendChild(el);
            });
        }
    }

    // Interactive Scroll Journey Line Effect
    window.addEventListener('scroll', () => {
        const storyContainer = document.getElementById('story-container');
        const journeyLine = document.getElementById('journey-line');
        if (storyContainer && journeyLine) {
            const rect = storyContainer.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight && rect.bottom > 0) {
                const totalHeight = rect.height;
                const visibleHeight = windowHeight - rect.top;
                const progress = Math.min(Math.max(visibleHeight / totalHeight, 0), 1);
                journeyLine.style.height = `${progress * 100}%`;
            }
        }
    });

    // Smooth Transition saat Buka Undangan
    const btnOpen = document.getElementById('btn-open');
    const audio = document.getElementById('wedding-audio');
    const audioControl = document.getElementById('audio-control');
    const audioIcon = document.getElementById('audio-icon');
    let isPlaying = false;

    if (btnOpen) {
        btnOpen.addEventListener('click', () => {
            const cover = document.getElementById('sec-cover');
            const mainContent = document.getElementById('main-content');
            
            if (cover) {
                cover.classList.add('opacity-0', 'scale-105', 'pointer-events-none');
            }
            
            setTimeout(() => {
                if (cover) cover.style.display = 'none';
                if (mainContent) {
                    mainContent.classList.remove('hidden');
                    setTimeout(() => mainContent.classList.remove('opacity-0'), 50);
                }
                if (audioControl) audioControl.classList.remove('hidden');
            }, 800);

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

    // Modal Lightbox Handlers
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModalBtn = document.getElementById('close-modal');

    function openGalleryModal(url) {
        if (modal && modalImg) {
            modalImg.src = url;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
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
            // Render Teks Ucapan Terima Kasih dari CONFIG
if (CONFIG.thanks) {
    if (document.getElementById('thanks-title')) document.getElementById('thanks-title').innerText = CONFIG.thanks.title || 'Maturnuwun';
    if (document.getElementById('thanks-message')) document.getElementById('thanks-message').innerText = CONFIG.thanks.message;
    if (document.getElementById('thanks-subtext')) document.getElementById('thanks-subtext').innerText = CONFIG.thanks.subtext;
    if (document.getElementById('thanks-family')) document.getElementById('thanks-family').innerText = CONFIG.thanks.family;
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
                showToast("URL Database Google Script belum dipasang!");
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
                showToast('Terima kasih! Ucapan Anda telah tersimpan.');
                document.getElementById('input-message').value = '';
                submitBtn.disabled = false;
                submitBtn.innerText = "Kirim Ucapan";
                fetchComments();
            })
            .catch(err => {
                console.error("Gagal mengirim ucapan:", err);
                showToast('Terjadi kesalahan saat menyimpan ucapan.');
                submitBtn.disabled = false;
                submitBtn.innerText = "Kirim Ucapan";
            });
        });
    }
});

function escapeHtml(text) {
    return text ? text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : '';
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    if (toast && toastMsg) {
        toastMsg.innerText = message;
        toast.classList.remove('opacity-0', 'pointer-events-none');
        toast.classList.add('opacity-100');
        setTimeout(() => {
            toast.classList.remove('opacity-100');
            toast.classList.add('opacity-0', 'pointer-events-none');
        }, 3000);
    }
}

function copyAccNumber(id) {
    const el = document.getElementById(id);
    if (el) {
        navigator.clipboard.writeText(el.innerText).then(() => {
            showToast('Nomor rekening berhasil disalin!');
        });
    }
}
