const board = document.getElementById("board");
const imageUpload = document.getElementById("imageUpload");
const addTextBtn = document.getElementById("addText");
const saveBtn = document.getElementById("saveBoard");
const exportBtn = document.getElementById("exportBoard");
const templateSelect = document.getElementById("templateSelect");
const addAffirmationBtn = document.getElementById("addAffirmation");
const yearInput = document.getElementById("yearInput");

/* ---------------- DRAG (MOBILE + DESKTOP) ---------------- */
function makeDraggable(el) {
  let startX = 0, startY = 0;
  let initialX = 0, initialY = 0;

  el.style.touchAction = "none";

  el.addEventListener("pointerdown", (e) => {
    el.setPointerCapture(e.pointerId);
    startX = e.clientX;
    startY = e.clientY;
    initialX = el.offsetLeft;
    initialY = el.offsetTop;
  });

  el.addEventListener("pointermove", (e) => {
    if (!el.hasPointerCapture(e.pointerId)) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    el.style.left = initialX + dx + "px";
    el.style.top = initialY + dy + "px";
  });
}

/* ---------------- IMAGE UPLOAD ---------------- */
imageUpload.addEventListener("change", () => {
  const file = imageUpload.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const div = document.createElement("div");
    div.className = "item";
    div.style.left = "20px";
    div.style.top = "20px";

    const img = document.createElement("img");
    img.src = reader.result;

    div.appendChild(img);
    board.appendChild(div);
    makeDraggable(div);
  };

  reader.readAsDataURL(file);
});

/* ---------------- ADD TEXT ---------------- */
addTextBtn.addEventListener("click", () => {
  const div = document.createElement("div");
  div.className = "item text-item";
  div.contentEditable = true;

  const year = yearInput.value ? ` ${yearInput.value}` : '';
  div.innerText = `Your goal here${year}`;

  div.style.left = "30px";
  div.style.top = "30px";

  board.appendChild(div);
  makeDraggable(div);
});

/* ---------------- TEMPLATES ---------------- */
const templates = {
  career: ["Financial Freedom 💰", "Dream Job", "Successful Business"],
  health: ["Strong Body 🏋️", "Mental Peace 🧘", "Daily Consistency"],
  travel: ["Paris ✈️", "Tokyo 🌸", "New Adventures"],
  growth: ["Confidence", "Self Discipline", "Purpose"],
  blank: []
};

templateSelect.addEventListener("change", () => {
  board.innerHTML = "";
  const year = yearInput.value ? ` ${yearInput.value}` : '';
  const items = templates[templateSelect.value] || [];

  items.forEach((text, i) => {
    const div = document.createElement("div");
    div.className = "item text-item";
    div.contentEditable = true;
    div.innerText = text + year;
    div.style.left = 40 + i * 150 + "px";
    div.style.top = "60px";

    board.appendChild(div);
    makeDraggable(div);
  });
});

/* ---------------- AI AFFIRMATIONS ---------------- */
const affirmations = {
  career: [
    "I attract success effortlessly.",
    "My skills create wealth and freedom.",
    "Opportunities align with my goals."
  ],
  health: [
    "My body is strong and energized.",
    "I choose health every day.",
    "I respect my wellbeing."
  ],
  growth: [
    "I grow daily with confidence.",
    "I trust my journey.",
    "I am disciplined and focused."
  ],
  travel: [
    "The world opens to me.",
    "Adventure enriches my life.",
    "I travel freely and safely."
  ]
};

addAffirmationBtn.addEventListener("click", () => {
  const type = templateSelect.value || "growth";
  const list = affirmations[type];
  const text = list[Math.floor(Math.random() * list.length)];
  const year = yearInput.value ? ` ${yearInput.value}` : '';

  const div = document.createElement("div");
  div.className = "item text-item";
  div.contentEditable = true;
  div.innerText = text + year;
  div.style.left = "100px";
  div.style.top = "100px";

  board.appendChild(div);
  makeDraggable(div);
});

/* ---------------- SAVE & LOAD ---------------- */
saveBtn.addEventListener("click", () => {
  localStorage.setItem("visionBoard", board.innerHTML);
  alert("Vision board saved!");
});

window.onload = () => {
  const saved = localStorage.getItem("visionBoard");
  if (saved) {
    board.innerHTML = saved;
    document.querySelectorAll(".item").forEach(makeDraggable);
  }
};

/* ---------------- EXPORT PNG ---------------- */
exportBtn.addEventListener("click", () => {
  html2canvas(board).then(canvas => {
    const link = document.createElement("a");
    link.download = "vision-board.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});
