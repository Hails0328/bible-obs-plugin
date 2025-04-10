async function loadBible() {
  try {
    const res = await fetch('https://hails0328.github.io/bible-obs-plugin/EntireBible-DR.json');
    const data = await res.json();
    bible = data;

    console.log("📖 Bible loaded:", Object.keys(bible));

    const bookSelect = document.getElementById('book');
    Object.keys(bible).forEach(book => {
      const option = document.createElement('option');
      option.value = book;
      option.textContent = book;
      bookSelect.appendChild(option);
    });

    bookSelect.addEventListener('change', e => {
      selectedBook = e.target.value;
      populateChapters();
    });

    document.getElementById('chapter').addEventListener('change', e => {
      selectedChapter = e.target.value;
      populateVerses();
    });

    bookSelect.value = Object.keys(bible)[0];
    bookSelect.dispatchEvent(new Event('change'));
  } catch (error) {
    console.error("❌ Failed to load Bible JSON:", error);
  }
}
