const movies = [
  {id:1,title:"The Dark Knight",year:2008,rating:9.0,genres:["Hành động","Tội phạm","Chính kịch"],director:"Christopher Nolan",cast:["Christian Bale","Heath Ledger"],desc:"Batman đối đầu Joker, kẻ gieo rắc hỗn loạn khắp Gotham.",poster:"images/phim1.jpg"},
  {id:2,title:"Inception",year:2010,rating:8.8,genres:["Hành động","Khoa học viễn tưởng"],director:"Christopher Nolan",cast:["Leonardo DiCaprio","Elliot Page"],desc:"Tên trộm đánh cắp bí mật trong giấc mơ nhận nhiệm vụ cấy một ý tưởng.",poster:"images/phim2.jpg"},
  {id:3,title:"Interstellar",year:2014,rating:8.7,genres:["Khoa học viễn tưởng","Chính kịch"],director:"Christopher Nolan",cast:["Matthew McConaughey","Anne Hathaway"],desc:"Các nhà du hành xuyên hố giun tìm ngôi nhà mới cho nhân loại.",poster:"images/phim3.jpg"},
  {id:4,title:"Titanic",year:1997,rating:7.9,genres:["Tình cảm","Chính kịch"],director:"James Cameron",cast:["Leonardo DiCaprio","Kate Winslet"],desc:"Mối tình khác biệt giai cấp trên con tàu định mệnh.",poster:"images/phim4.jpg"},
  {id:5,title:"Toy Story",year:1995,rating:8.3,genres:["Hoạt hình","Hài","Phiêu lưu"],director:"John Lasseter",cast:["Tom Hanks","Tim Allen"],desc:"Những món đồ chơi biết nói lạc khỏi cậu chủ.",poster:"images/phim5.jpg"},
  {id:6,title:"Finding Nemo",year:2003,rating:8.2,genres:["Hoạt hình","Phiêu lưu","Hài"],director:"Andrew Stanton",cast:["Albert Brooks","Ellen DeGeneres"],desc:"Cá hề Marlin vượt đại dương tìm con trai.",poster:"images/phim6.jpg"},
  {id:7,title:"The Godfather",year:1972,rating:9.2,genres:["Tội phạm","Chính kịch"],director:"Francis Ford Coppola",cast:["Marlon Brando","Al Pacino"],desc:"Gia tộc mafia Corleone và cuộc chuyển giao quyền lực.",poster:"images/phim7.jpg"},
  {id:8,title:"Parasite",year:2019,rating:8.5,genres:["Hồi hộp","Chính kịch","Hài"],director:"Bong Joon-ho",cast:["Song Kang-ho","Choi Woo-shik"],desc:"Gia đình nghèo len lỏi vào cuộc sống của gia đình giàu có.",poster:"images/phim8.jpg"},
  {id:9,title:"Forrest Gump",year:1994,rating:8.8,genres:["Chính kịch","Tình cảm","Hài"],director:"Robert Zemeckis",cast:["Tom Hanks","Robin Wright"],desc:"Cuộc đời phi thường của một người đàn ông giản dị.",poster:"images/phim9.jpg"},
  {id:10,title:"The Matrix",year:1999,rating:8.7,genres:["Hành động","Khoa học viễn tưởng"],director:"The Wachowskis",cast:["Keanu Reeves","Laurence Fishburne"],desc:"Hacker phát hiện thế giới chỉ là một mô phỏng.",poster:"images/phim10.jpg"},
  {id:11,title:"Se7en",year:1995,rating:8.6,genres:["Hồi hộp","Tội phạm"],director:"David Fincher",cast:["Brad Pitt","Morgan Freeman"],desc:"Hai thám tử truy lùng kẻ giết người theo bảy mối tội lỗi.",poster:"images/phim11.jpg"},
  {id:12,title:"Avengers: Endgame",year:2019,rating:8.4,genres:["Hành động","Phiêu lưu","Khoa học viễn tưởng"],director:"Anthony & Joe Russo",cast:["Robert Downey Jr.","Chris Evans"],desc:"Các Avengers đảo ngược thảm họa do Thanos gây ra.",poster:"images/phim12.jpg"}
];

const $ = id => document.getElementById(id);

// hiển thị danh sách phim
function render(list){
  $("count").textContent = `Tìm thấy ${list.length} bộ phim`;
  $("grid").innerHTML = list.length ? list.map(m => `
    <div class="card" onclick="openModal(${m.id})">
      <img class="poster" src="${m.poster}" alt="Poster ${m.title}">
      <div class="info"><h4>${m.title}</h4>
        <p>Năm phát hành: ${m.year}</p><p>⭐ ${m.rating}/10</p>
        <p>${m.genres.join(" · ")}</p></div>
    </div>`).join("") : "<p>Không có phim phù hợp.</p>";
}

// checkbox thể loại tự sinh
const allGenres = [...new Set(movies.flatMap(m => m.genres))].sort((a,b)=>a.localeCompare(b,"vi"));
$("genres").innerHTML = allGenres.map(g => `<label><input type="checkbox" value="${g}"> ${g}</label>`).join("");

// lọc kết hợp thể loại + tìm kiếm
function filter(){
  const sel = [...document.querySelectorAll("#genres input:checked")].map(i => i.value);
  const kw = $("search").value.trim().toLowerCase();
  render(movies.filter(m =>
    (!sel.length || m.genres.some(g => sel.includes(g))) && m.title.toLowerCase().includes(kw)));
}

// debounce 400ms
let timer;
$("search").addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(filter, 400); });
$("genres").addEventListener("change", filter);
$("clear").onclick = () => {
  $("search").value = "";
  document.querySelectorAll("#genres input").forEach(i => i.checked = false);
  filter();
};

// modal chi tiết phim
function openModal(id){
  const m = movies.find(x => x.id === id);
  $("detail").innerHTML = `
    <img class="poster" src="${m.poster}" alt="Poster ${m.title}">
    <div><h2>${m.title} (${m.year})</h2>
      ${m.genres.map(g => `<span class="tag">${g}</span>`).join("")}
      <p>⭐ ${m.rating}/10</p><p>${m.desc}</p>
      <p><b>Đạo diễn:</b> ${m.director}</p>
      <p><b>Diễn viên:</b> ${m.cast.join(", ")}</p></div>`;
  $("modal").classList.add("open");
}
const closeModal = () => $("modal").classList.remove("open");
$("close").onclick = closeModal;
$("modal").onclick = e => { if(e.target.id === "modal") closeModal(); };
document.onkeydown = e => { if(e.key === "Escape") closeModal(); };

// chế độ sáng/tối + localStorage
function setTheme(dark){
  document.body.classList.toggle("dark-mode", dark);
  $("themeBtn").textContent = dark ? "☀️ Chế độ sáng" : "🌙 Chế độ tối";
}
try { setTheme(localStorage.getItem("theme") === "dark"); } catch(e){}
$("themeBtn").onclick = () => {
  const dark = !document.body.classList.contains("dark-mode");
  setTheme(dark);
  try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch(e){}
};

render(movies);
