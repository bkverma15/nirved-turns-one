document.addEventListener('DOMContentLoaded', () => {
    // 1. Countdown Logic
    // Set for 8 June 2026
    const targetDate = new Date("June 8, 2026 00:00:00").getTime();
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    const heroTitle = document.querySelector('.title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const countdownContainer = document.getElementById('countdown');
    const confettiCanvas = document.getElementById('confetti');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {
            // Birthday Mode!
            clearInterval(countdownInterval);
            if (countdownContainer) countdownContainer.style.display = 'none';
            if (heroTitle) heroTitle.innerHTML = "Happy Birthday Nirved 🎉🎂";
            if (heroSubtitle) heroSubtitle.textContent = "Our little prince turns one today!";
            if (confettiCanvas) triggerConfetti();
            
            // Render zeros just in case
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // 2. Simple Confetti Effect for Birthday Mode
    function triggerConfetti() {
        confettiCanvas.classList.remove('hidden');
        const ctx = confettiCanvas.getContext('2d');
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;

        const pieces = [];
        const colors = ['#A9D0F5', '#D4AF37', '#FF69B4', '#87CEFA', '#FFD700', '#ffffff'];

        for (let i = 0; i < 200; i++) {
            pieces.push({
                x: Math.random() * confettiCanvas.width,
                y: Math.random() * confettiCanvas.height - confettiCanvas.height,
                w: Math.random() * 12 + 5,
                h: Math.random() * 12 + 5,
                c: colors[Math.floor(Math.random() * colors.length)],
                dy: Math.random() * 4 + 2,
                rot: Math.random() * 360,
                dRot: Math.random() * 5 - 2.5
            });
        }

        function animate() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            pieces.forEach(p => {
                ctx.save();
                ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
                ctx.rotate(p.rot * Math.PI / 180);
                ctx.fillStyle = p.c;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();

                p.y += p.dy;
                p.rot += p.dRot;

                if (p.y > confettiCanvas.height) {
                    p.y = -20;
                    p.x = Math.random() * confettiCanvas.width;
                }
            });
            requestAnimationFrame(animate);
        }
        animate();

        window.addEventListener('resize', () => {
            confettiCanvas.width = window.innerWidth;
            confettiCanvas.height = window.innerHeight;
        });
    }

    // 3. Gallery Lightbox
    const galleryImages = document.querySelectorAll('.gallery-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxBtn = document.querySelector('.close-lightbox');

    if (lightbox && closeLightboxBtn) {
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        closeLightboxBtn.addEventListener('click', closeLightbox);
        
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
                closeLightbox();
            }
        });

        function closeLightbox() {
            lightbox.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }

    // 4. Wishes Form with LocalStorage
    const wishForm = document.getElementById('wish-form');
    const wishesContainer = document.getElementById('wishes-container');

    // Default blessings to pre-populate
    const defaultWishes = [
        { name: "Dadaji & Dadi", message: "Happy 1st Birthday humare pyare bache ko! Jug jug jiyo. ❤️" },
        { name: "Nanaji & Nani", message: "Nirved, tumhara aana humare liye sabse bada aashirwad hai. Happy Birthday! ✨" },
        { name: "Priya Bua", message: "Happy Birthday cutie! Tum hum sabki jaan ho. Lots of love! 🎈" }
    ];

    // Load existing wishes
    function loadWishes() {
        let wishes = JSON.parse(localStorage.getItem('nirved_wishes_v2'));
        
        // Pre-populate if empty
        if (!wishes || wishes.length === 0) {
            wishes = [...defaultWishes];
            localStorage.setItem('nirved_wishes_v2', JSON.stringify(wishes));
        }

        wishesContainer.innerHTML = '';
        wishes.forEach(wish => {
            const card = document.createElement('div');
            card.className = 'glass-panel rounded-2xl p-6 star-card group hover:scale-[1.02] transition-transform';
            const initials = wish.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || '✨';
            card.innerHTML = `
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center font-label-lg text-on-primary-container">${initials}</div>
                    <div>
                        <p class="font-label-lg text-label-lg text-on-surface">${escapeHTML(wish.name)}</p>
                        <p class="font-label-sm text-label-sm text-tertiary/60">Just now</p>
                    </div>
                </div>
                <p class="font-body-md text-body-md text-on-surface-variant">${escapeHTML(wish.message)}</p>
            `;
            wishesContainer.appendChild(card);
        });
    }

    if (wishForm) {
        wishForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('wish-name').value.trim();
            const messageInput = document.getElementById('wish-message').value.trim();

            if (nameInput && messageInput) {
                const wishes = JSON.parse(localStorage.getItem('nirved_wishes_v2')) || [];
                // Add new wish to the beginning of the array
                wishes.unshift({ name: nameInput, message: messageInput });
                localStorage.setItem('nirved_wishes_v2', JSON.stringify(wishes));
                
                wishForm.reset();
                loadWishes();
                
                alert('Thank you! Your blessing has been added. ❤️');
            }
        });
    }

    loadWishes();

    // 5. Music Play/Pause
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.innerHTML = '<span class="material-symbols-outlined text-2xl">music_note</span>';
            } else {
                bgMusic.play().then(() => {
                    musicBtn.innerHTML = '<span class="material-symbols-outlined text-2xl">music_off</span>';
                }).catch(error => {
                    console.log("Audio play failed:", error);
                });
            }
            isPlaying = !isPlaying;
        });
    }

    // 6. Share Feature
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const shareData = {
                title: 'Nirved Turns One 🎂',
                text: 'Join us in counting down to Nirved’s first birthday 🎂',
                url: window.location.href
            };

            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else {
                    // Fallback
                    await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
                    alert('Website link copied to clipboard! 📋');
                }
            } catch (err) {
                console.error('Error sharing:', err);
                // Secondary fallback
                try {
                    await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
                    alert('Website link copied to clipboard! 📋');
                } catch (e) {
                    // Ignore
                }
            }
        });
    }

    // Utility: Prevent XSS in wishes
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});
