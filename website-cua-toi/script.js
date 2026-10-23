// =========================================================
// 1. DỮ LIỆU PHIM (DATA)
// =========================================================
const moviesData = [
  {
    id: 1,
    title: "Mai",
    originalTitle: "Mai - A Film by Tran Thanh",
    genres: ["Tâm lý", "Tình cảm", "Tôi yêu Việt Nam"],
    rating: 8.7,
    year: 2024,
    duration: "131 phút",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2G_bH-3xG7Lz-gH8qL6jI7x0fX8aK8fK8wA&s",
    backdrop: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2G_bH-3xG7Lz-gH8qL6jI7x0fX8aK8fK8wA&s",
    description: "Mai xoay quanh câu chuyện về cuộc đời của một người phụ nữ cùng tên có số phận cay đắng, nhiều sóng gió.",
    isHot: true,
    views: 1250000
  },
  {
    id: 2,
    title: "Lật Mặt 7: Một Điều Ước",
    originalTitle: "Face Off 7: One Wish",
    genres: ["Gia đình", "Tâm lý", "Tôi yêu Việt Nam"],
    rating: 9.1,
    year: 2024,
    duration: "138 phút",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_WkZ4M8-q4L4c1W1kK4dK8nK4m5N4b3V2A&s",
    backdrop: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_WkZ4M8-q4L4c1W1kK4dK8nK4m5N4b3V2A&s",
    description: "Câu chuyện cảm động về tình mẫu tử của bà Hai 73 tuổi và 5 người con xao lãng bổn phận nuôi dưỡng mẹ.",
    isHot: true,
    views: 980000
  },
  {
    id: 3,
    title: "Kẻ Ăn Hồn",
    originalTitle: "The Soul Eater",
    genres: ["Kinh dị", "Tôi yêu Việt Nam"],
    rating: 7.8,
    year: 2023,
    duration: "109 phút",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_M3N4b5V6C7D8E9F0A1B2C3D4E5F6G7H8I9J0&s",
    backdrop: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_M3N4b5V6C7D8E9F0A1B2C3D4E5F6G7H8I9J0&s",
    description: "Câu chuyện kỳ quái tại Làng Địa Ngục về loại thuật cổ xưa luyện rượu sọ người.",
    isHot: false,
    views: 450000
  },
  {
    id: 4,
    title: "Naruto",
    originalTitle: "Naruto Shippuden",
    genres: ["Hoạt hình", "Hành động", "Phiêu lưu"],
    rating: 8.9,
    year: 2016,
    duration: "106 phút",
    poster: "https://i.ebayimg.com/images/g/Or8AAOSwEDbdtMUc/s-l1200.jpg",
    backdrop: "https://i.ebayimg.com/images/g/Or8AAOSwEDbdtMUc/s-l1200.jpg",
    description: "Naruto là câu chuyện về Uzumaki Naruto, một ninja trẻ tuổi muốn tìm kiếm sự công nhận từ mọi người và mơ ước trở thành Hokage.",
    videoUrl: "videos/naruto.mp4", // ĐƯỜNG DẪN VIDEO CỤC BỘ DÀNH CHO PHIM NARUTO
    isHot: true,
    views: 1100000
  },
  {
    id: 5,
    title: "Spirited Away (Vùng Đất Linh Hồn)",
    originalTitle: "Sen to Chihiro no Kamikakushi",
    genres: ["Hoạt hình", "Phiêu lưu", "Gia đình"],
    rating: 8.6,
    year: 2001,
    duration: "125 phút",
    poster: "https://thumb.wikimedia.org/wikipedia/vi/thumb/3/30/Spirited_Away_poster.JPG/250px-Spirited_Away_poster.JPG",
    backdrop: "https://thumb.wikimedia.org/wikipedia/vi/thumb/3/30/Spirited_Away_poster.JPG/250px-Spirited_Away_poster.JPG",
    description: "Cô bé Chihiro 10 tuổi vô tình lạc vào thế giới phép thuật kỳ bí do các vị thần cai quản.",
    isHot: false,
    views: 890000
  }
];

// Biến lưu trữ trạng thái bộ lọc
let selectedGenres = [];
let searchQuery = "";

// =========================================================
// 2. CÁC PHƯƠNG THỨC RENDER GIAO DIỆN
// =========================================================

// Hiển thị danh sách thể loại phim tự động (Bài 2.2)
function renderGenreFilters() {
  const container = document.getElementById("genreFiltersContainer");
  if (!container) return;

  // Lấy danh sách thể loại không trùng lặp
  const allGenres = moviesData.flatMap(movie => movie.genres);
  const uniqueGenres = [...new Set(allGenres)];

  container.innerHTML = uniqueGenres.map(genre => `
    <label class="genre-checkbox-label">
      <input type="checkbox" value="${genre}" class="genre-checkbox" onchange="handleGenreChange(this)">
      <span>${genre}</span>
    </label>
  `).join("");
}

// Render các thẻ phim (Movie Cards) (Bài 2.1)
function renderMovies(movies) {
  const grid = document.getElementById("moviesGrid");
  const countEl = document.getElementById("movieCount");
  
  if (countEl) countEl.innerText = movies.length;
  if (!grid) return;

  if (movies.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #888;">
        <h3>Không tìm thấy bộ phim nào phù hợp!</h3>
        <p>Vui lòng thử lại với từ khóa hoặc thể loại khác.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = movies.map(movie => `
    <div class="movie-card" onclick="openModal(${movie.id})">
      <div class="movie-poster-wrapper">
        <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
        ${movie.isHot ? '<span class="hot-badge">HOT</span>' : ''}
        <span class="rating-badge">★ ${movie.rating}</span>
      </div>
      <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
        <p class="movie-year">${movie.year} • ${movie.duration}</p>
        <div class="movie-tags">
          ${movie.genres.map(g => `<span class="genre-tag">${g}</span>`).join("")}
        </div>
      </div>
    </div>
  `).join("");
}

// =========================================================
// 3. LOGIC LỌC & TÌM KIẾM (Tích hợp & Debounce)
// =========================================================

// Xử lý sự kiện chọn Checkbox thể loại
function handleGenreChange(checkbox) {
  if (checkbox.checked) {
    selectedGenres.push(checkbox.value);
  } else {
    selectedGenres = selectedGenres.filter(g => g !== checkbox.value);
  }
  filterAndRenderMovies();
}

// Hàm lọc kết hợp cả Thể loại và Từ khóa tìm kiếm (Bài 2.4)
function filterAndRenderMovies() {
  const filtered = moviesData.filter(movie => {
    // Kiểm tra tên phim
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.originalTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Kiểm tra thể loại (phải chứa tất cả các thể loại đang tick)
    const matchesGenre = selectedGenres.length === 0 || 
                         selectedGenres.every(g => movie.genres.includes(g));

    return matchesSearch && matchesGenre;
  });

  renderMovies(filtered);
}

// Kỹ thuật Debounce cho ô tìm kiếm (Bài 2.5)
function debounce(func, delay = 350) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// Sự kiện gõ phím ô tìm kiếm kèm Debounce
const handleSearchInput = debounce((e) => {
  searchQuery = e.target.value.trim();
  filterAndRenderMovies();
}, 350);

// =========================================================
// 4. BẢNG POPUP (MODAL) VÀ PHÁT VIDEO MP4
// =========================================================

// Mở Modal chi tiết phim (Bài 3.1 & Phát Video)
function openModal(movieId) {
  const movie = moviesData.find(m => m.id === movieId);
  if (!movie) return;

  const modal = document.getElementById("movieModal");
  const modalBody = document.getElementById("modalBody");
  if (!modal || !modalBody) return;

  // KIỂM TRA NẾU PHIM CÓ PHÁT VIDEO (NHƯ PHIM NARUTO) THÌ RENDER THẺ <video>
  const mediaHTML = movie.videoUrl ? `
    <div style="margin-bottom: 20px; border-radius: 12px; overflow: hidden; background: #000; box-shadow: 0 5px 20px rgba(0,0,0,0.5);">
      <video width="100%" controls autoplay style="display: block; max-height: 400px; outline: none;">
        <source src="${movie.videoUrl}" type="video/mp4">
        Trình duyệt của bạn không hỗ trợ phát video này.
      </video>
    </div>
  ` : `
    <div style="margin-bottom: 20px; border-radius: 12px; overflow: hidden; max-height: 350px;">
      <img src="${movie.backdrop || movie.poster}" alt="${movie.title}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
  `;

  modalBody.innerHTML = `
    ${mediaHTML}
    <div style="padding: 0 10px;">
      <h2 style="font-size: 1.8rem; margin-bottom: 5px; color: var(--text-color);">${movie.title}</h2>
      <p style="color: #888; font-size: 0.95rem; margin-bottom: 15px;">Tên gốc: ${movie.originalTitle}</p>
      
      <div style="display: flex; gap: 15px; margin-bottom: 15px; font-weight: bold; color: var(--primary-color);">
        <span>★ ${movie.rating}/10</span>
        <span>Năm: ${movie.year}</span>
        <span>Thời lượng: ${movie.duration}</span>
      </div>

      <p style="line-height: 1.6; margin-bottom: 15px; color: var(--text-color);">${movie.description}</p>
      
      <div style="margin-bottom: 15px;">
        <strong>Thể loại:</strong> ${movie.genres.map(g => `<span class="genre-tag" style="margin-left: 5px;">${g}</span>`).join("")}
      </div>
    </div>
  `;

  modal.style.display = "flex";
}

// Đóng Modal
function closeModal() {
  const modal = document.getElementById("movieModal");
  if (modal) {
    modal.style.display = "none";
    // Tắt âm thanh video khi đóng Modal
    const video = modal.querySelector("video");
    if (video) video.pause();
  }
}

// =========================================================
// 5. CHẾ ĐỘ SÁNG / TỐI (LIGHT/DARK MODE & LOCALSTORAGE)
// =========================================================
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const toggleBtn = document.getElementById("themeToggle");

  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.body.classList.add("dark-mode");
    if (toggleBtn) toggleBtn.checked = true;
  } else {
    document.body.classList.remove("dark-mode");
    if (toggleBtn) toggleBtn.checked = false;
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// =========================================================
// 6. KHỞI TẠO TRANG (INITIALIZATION)
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  // Khởi tạo theme
  initTheme();

  // Đổ danh sách thể loại & danh sách phim
  renderGenreFilters();
  renderMovies(moviesData);

  // Lắng nghe sự kiện ô tìm kiếm
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", handleSearchInput);
  }

  // Sự kiện đóng Modal khi click ra ngoài hoặc nhấn phím ESC
  window.addEventListener("click", (e) => {
    const modal = document.getElementById("movieModal");
    if (e.target === modal) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});