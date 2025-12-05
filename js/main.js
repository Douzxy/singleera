/**
 * main.js - Three.js Scene with Photo Gallery & Music Player
 * Particles, photo gallery modal, and music controls
 */

// ============================================
// Global Variables
// ============================================
let scene, camera, renderer;
let particles;
let mouseX = 0,
  mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let audioPlayer = null;
let isPlaying = false;

// ============================================
// Initialize Three.js
// ============================================
function initThree() {
  const container = document.createElement("div");
  container.id = "canvas-container";
  document.body.insertBefore(container, document.body.firstChild);

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0a0a, 0.001);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera.position.z = 1000;

  createParticles();

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  document.addEventListener("mousemove", onMouseMove);
  window.addEventListener("resize", onWindowResize);

  animate();
}

// ============================================
// Create Particle System
// ============================================
function createParticles() {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const colors = [];
  const particleCount = 1500;

  for (let i = 0; i < particleCount; i++) {
    const x = Math.random() * 2000 - 1000;
    const y = Math.random() * 2000 - 1000;
    const z = Math.random() * 2000 - 1000;
    vertices.push(x, y, z);

    const color = new THREE.Color();
    const hue = 0.6 + Math.random() * 0.1;
    const saturation = 0.3 + Math.random() * 0.3;
    const lightness = 0.4 + Math.random() * 0.3;
    color.setHSL(hue, saturation, lightness);
    colors.push(color.r, color.g, color.b);
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);
}

// ============================================
// Animation Loop
// ============================================
function animate() {
  requestAnimationFrame(animate);

  camera.position.x += (mouseX - camera.position.x) * 0.02;
  camera.position.y += (-mouseY - camera.position.y) * 0.02;
  camera.lookAt(scene.position);

  if (particles) {
    particles.rotation.x += 0.0002;
    particles.rotation.y += 0.0003;

    const scrollProgress = window.scrollProgress || 0;
    particles.rotation.z = scrollProgress * Math.PI * 0.5;

    const positions = particles.geometry.attributes.position.array;
    const time = Date.now() * 0.0005;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(time + positions[i] * 0.01) * 0.2;
    }
    particles.geometry.attributes.position.needsUpdate = true;
  }

  renderer.render(scene, camera);
}

function onMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) * 0.5;
  mouseY = (event.clientY - windowHalfY) * 0.5;
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// ============================================
// Generate Month Sections HTML
// ============================================
function generateMonthSections() {
  const container = document.getElementById("months-container");
  if (!container) return;

  let html = "";

  MONTHS_DATA.forEach((month, index) => {
    const isEven = index % 2 === 0;
    const paddedIndex = String(index + 1).padStart(2, "0");
    const previewPhotos = month.photos.slice(0, 3); // Show 3 preview photos
    const extraCount = month.photos.length - 3;

    html += `
        <section class="month-section" data-month="${index}" style="--accent-color: ${
      month.accentColor
    }">
            <div class="month-bg-circle" style="left: ${
              isEven ? "10%" : "60%"
            }; top: 20%;"></div>
            <div class="month-inner ${isEven ? "" : "reverse"}">
                <div class="month-content">
                    <div class="month-number">${paddedIndex}</div>
                    <div class="month-label">Bulan ke-${index + 1}</div>
                    <h2 class="month-name">${month.name}</h2>
                    <p class="month-desc">${month.description}</p>
                    <div class="photo-count">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                        </svg>
                        <span>${month.photos.length} Foto</span>
                    </div>
                </div>
                <div class="month-gallery">
                    <div class="gallery-preview">
                        <div class="preview-main" onclick="openGallery(${index}, 0)">
                            <img src="${previewPhotos[0] || ""}" alt="${
      month.name
    } foto 1" loading="lazy">
                            <div class="preview-overlay">
                                <span>Klik untuk lihat</span>
                            </div>
                        </div>
                        <div class="preview-side">
                            ${
                              previewPhotos[1]
                                ? `
                            <div class="preview-small" onclick="openGallery(${index}, 1)">
                                <img src="${previewPhotos[1]}" alt="${month.name} foto 2" loading="lazy">
                            </div>
                            `
                                : ""
                            }
                            ${
                              previewPhotos[2]
                                ? `
                            <div class="preview-small ${
                              extraCount > 0 ? "has-more" : ""
                            }" onclick="openGallery(${index}, 2)">
                                <img src="${previewPhotos[2]}" alt="${
                                    month.name
                                  } foto 3" loading="lazy">
                                ${
                                  extraCount > 0
                                    ? `<div class="more-count">+${extraCount}</div>`
                                    : ""
                                }
                            </div>
                            `
                                : ""
                            }
                        </div>
                    </div>
                    <button class="view-all-btn" onclick="openGallery(${index}, 0)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="7" height="7"/>
                            <rect x="14" y="3" width="7" height="7"/>
                            <rect x="14" y="14" width="7" height="7"/>
                            <rect x="3" y="14" width="7" height="7"/>
                        </svg>
                        <span>Lihat Semua Foto (${month.photos.length})</span>
                        <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
        `;
  });

  container.innerHTML = html;
}

// ============================================
// Photo Gallery Modal
// ============================================
function createGalleryModal() {
  const modal = document.createElement("div");
  modal.id = "gallery-modal";
  modal.className = "gallery-modal";
  modal.innerHTML = `
        <div class="modal-overlay" onclick="closeGallery()"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="closeGallery()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>
            <div class="modal-header">
                <h3 id="modal-title">Galeri Foto</h3>
                <span id="modal-counter">1 / 5</span>
            </div>
            <div class="modal-main">
                <button class="nav-arrow prev" onclick="prevPhoto()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>
                <div class="modal-image-container">
                    <img id="modal-image" src="" alt="">
                </div>
                <button class="nav-arrow next" onclick="nextPhoto()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
            <div class="modal-thumbnails" id="modal-thumbnails"></div>
        </div>
    `;
  document.body.appendChild(modal);
}

let currentMonthPhotos = [];
let currentPhotoIndex = 0;

function openGallery(monthIndex, photoIndex) {
  const modal = document.getElementById("gallery-modal");
  const month = MONTHS_DATA[monthIndex];

  currentMonthPhotos = month.photos;
  currentPhotoIndex = photoIndex;

  document.getElementById("modal-title").textContent = `Foto ${month.name}`;
  updateModalImage();
  generateThumbnails();

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  const modal = document.getElementById("gallery-modal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function updateModalImage() {
  const img = document.getElementById("modal-image");
  const counter = document.getElementById("modal-counter");

  img.src = currentMonthPhotos[currentPhotoIndex];
  counter.textContent = `${currentPhotoIndex + 1} / ${
    currentMonthPhotos.length
  }`;

  // Update thumbnail active state
  document.querySelectorAll(".thumb").forEach((thumb, i) => {
    thumb.classList.toggle("active", i === currentPhotoIndex);
  });
}

function generateThumbnails() {
  const container = document.getElementById("modal-thumbnails");
  container.innerHTML = currentMonthPhotos
    .map(
      (photo, i) => `
        <div class="thumb ${
          i === currentPhotoIndex ? "active" : ""
        }" onclick="goToPhoto(${i})">
            <img src="${photo}" alt="Thumbnail ${i + 1}">
        </div>
    `
    )
    .join("");
}

function goToPhoto(index) {
  currentPhotoIndex = index;
  updateModalImage();
}

function prevPhoto() {
  currentPhotoIndex =
    (currentPhotoIndex - 1 + currentMonthPhotos.length) %
    currentMonthPhotos.length;
  updateModalImage();
}

function nextPhoto() {
  currentPhotoIndex = (currentPhotoIndex + 1) % currentMonthPhotos.length;
  updateModalImage();
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("gallery-modal");
  if (!modal || !modal.classList.contains("active")) return;

  if (e.key === "Escape") closeGallery();
  if (e.key === "ArrowLeft") prevPhoto();
  if (e.key === "ArrowRight") nextPhoto();
});

// ============================================
// Music Player
// ============================================
function createMusicPlayer() {
  const player = document.createElement("div");
  player.id = "music-player";
  player.className = "music-player";
  const lastMusic = localStorage.getItem("lastMusic") || "music/lagu.mp3";
  player.innerHTML = `
        <audio id="audio-player" loop>
            <source src="${lastMusic}" type="audio/mpeg">
        </audio>
        <button class="music-btn" onclick="toggleMusic()" title="Play/Pause Music">
            <div class="music-icon">
                <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                </svg>
                <svg class="pause-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
            </div>
            <div class="music-waves">
                <span></span><span></span><span></span><span></span>
            </div>
        </button>
        <div class="music-tooltip">🎵 Klik untuk putar musik</div>
    `;
  document.body.appendChild(player);

  audioPlayer = document.getElementById("audio-player");
}

function toggleMusic() {
  const btn = document.querySelector(".music-btn");
  const tooltip = document.querySelector(".music-tooltip");

  if (isPlaying) {
    audioPlayer.pause();
    btn.classList.remove("playing");
    tooltip.textContent = "🎵 Klik untuk putar musik";
  } else {
    audioPlayer.play().catch((e) => {
      console.log("Audio autoplay blocked, user interaction needed");
      tooltip.textContent = "⚠️ Klik lagi untuk putar";
    });
    btn.classList.add("playing");
    tooltip.textContent = "🎵 Sedang memutar...";
  }
  isPlaying = !isPlaying;
}

// ============================================
// Generate Navigation Dots
// ============================================
function generateNavDots() {
  const navDots = document.querySelector(".nav-dots");
  if (!navDots) return;

  let html = "";
  MONTHS_DATA.forEach((month, index) => {
    html += `<div class="nav-dot" data-index="${index}" data-label="${month.shortName}"></div>`;
  });
  navDots.innerHTML = html;

  navDots.querySelectorAll(".nav-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.index);
      const section = document.querySelectorAll(".month-section")[index];
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });
}

// ============================================
// Custom Cursor
// ============================================
function initCustomCursor() {
  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");

  if (!cursor || !follower) return;

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    follower.style.left = e.clientX + "px";
    follower.style.top = e.clientY + "px";
  });

  // Refresh hover listeners
  refreshCursorListeners();
}

function refreshCursorListeners() {
  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");
  if (!cursor || !follower) return;

  document
    .querySelectorAll("a, button, .photo-card, .nav-dot, .thumb")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("hover");
        follower.classList.add("hover");
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("hover");
        follower.classList.remove("hover");
      });
    });
}

// ============================================
// Welcome Modal (Music Prompt)
// ============================================
function createWelcomeModal() {
  // Check for autoplay consent
  if (localStorage.getItem("musicAutoplay") === "true") {
    // Try to autoplay immediately
    const audio = document.getElementById("audio-player");
    if (audio) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const btn = document.querySelector(".music-btn");
        const tooltip = document.querySelector(".music-tooltip");

        audio
          .play()
          .then(() => {
            isPlaying = true;
            if (btn) btn.classList.add("playing");
            if (tooltip) tooltip.textContent = "🎵 Sedang memutar...";
          })
          .catch((e) => {
            console.log("Autoplay blocked:", e);
            if (tooltip) {
              tooltip.textContent = "⚠️ Klik di mana saja untuk memutar musik";
            }

            // Wait for first interaction
            const playOnInteraction = () => {
              audio
                .play()
                .then(() => {
                  isPlaying = true;
                  if (btn) btn.classList.add("playing");
                  if (tooltip) tooltip.textContent = "🎵 Sedang memutar...";
                  // Remove listener after success
                  document.removeEventListener("click", playOnInteraction);
                  document.removeEventListener("keydown", playOnInteraction);
                })
                .catch((err) => console.log("Still blocked:", err));
            };

            document.addEventListener("click", playOnInteraction);
            document.addEventListener("keydown", playOnInteraction);
          });
      }, 500);
    }
    return; // Skip creating modal
  }

  const modal = document.createElement("div");
  modal.id = "welcome-modal";
  modal.className = "welcome-modal";
  modal.innerHTML = `
        <div class="welcome-overlay"></div>
        <div class="welcome-content">
            <div class="welcome-icon">🎵</div>
            <h2 class="welcome-title">Journey of the Year</h2>
            <p class="welcome-subtitle">2025</p>
            <p class="welcome-desc">Lanjutkan memutar musik?</p>
            <div class="welcome-buttons">
                <button class="welcome-btn primary" onclick="acceptMusic()">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                    <span>Ya, Putar Musik</span>
                </button>
                <button class="welcome-btn secondary" onclick="skipMusic()">
                    <span>Tidak, Terima Kasih</span>
                </button>
            </div>
            <p class="welcome-credit">Created by <a href="https://edopriyatna.vercel.app" target="_blank" class="credit-link">Edo Priyatna (Douzxy)</a></p>
        </div>
    `;
  document.body.appendChild(modal);

  // Show modal
  setTimeout(() => {
    modal.classList.add("active");
  }, 500);
}

function acceptMusic() {
  localStorage.setItem("musicAutoplay", "true");
  closeWelcomeModal();
  // Start playing music
  setTimeout(() => {
    toggleMusic();
  }, 300);
}

function skipMusic() {
  // Optional: localStorage.setItem("musicAutoplay", "false");
  // If we want to ask again if they said no, don't save "false".
  // The user said "If you click 'Ya', it will remember". Implies 'No' might not remember or just closes.
  // I'll leave it as is (don't save false) so it asks again next time, unless user explicitly wants "Never ask again".
  // The prompt says "Next time you refresh, it will try to play automatically without asking" ONLY IF "Ya" was clicked.
  closeWelcomeModal();
}

function closeWelcomeModal() {
  const modal = document.getElementById("welcome-modal");
  if (modal) {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
    }, 500);
  }
}

// ============================================
// Initialize
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  generateMonthSections();
  generateNavDots();
  createGalleryModal();
  createMusicPlayer();
  createWelcomeModal();
  initThree();
  initCustomCursor();

  // Refresh cursor listeners after content loads
  setTimeout(refreshCursorListeners, 500);
});

// Expose globally
window.openGallery = openGallery;
window.closeGallery = closeGallery;
window.prevPhoto = prevPhoto;
window.nextPhoto = nextPhoto;
window.goToPhoto = goToPhoto;
window.toggleMusic = toggleMusic;
window.acceptMusic = acceptMusic;
window.skipMusic = skipMusic;
window.initCustomCursor = initCustomCursor;
