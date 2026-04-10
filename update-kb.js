const fs = require('fs');

// Читаем обновленную knowledge_base.md
const kb = fs.readFileSync('knowledge_base.md', 'utf8');

// Читаем index.html
let html = fs.readFileSync('index.html', 'utf8');

// Простой поиск и замена: найти `const knowledgeBase = ` и найти следующий backtick
const startMarker = 'const knowledgeBase = `';
const startIdx = html.indexOf(startMarker);

if (startIdx === -1) {
  console.error('❌ Переменная не найдена');
  process.exit(1);
}

// Ищем конец - первый backtick после начала переменной, который не экранирован
let i = startIdx + startMarker.length;
let endIdx = -1;

while (i < html.length - 1) {
  if (html[i] === '`') {
    // Проверяем, не экранирован ли
    let backslashCount = 0;
    let j = i - 1;
    while (j >= 0 && html[j] === '\\') {
      backslashCount++;
      j--;
    }
    if (backslashCount % 2 === 0) {
      endIdx = i;
      break;
    }
  }
  i++;
}

if (endIdx === -1) {
  console.error('❌ Конец переменной не найден');
  process.exit(1);
}

// Заменяем
const newHtml = html.slice(0, startIdx + startMarker.length) + kb + html.slice(endIdx);

fs.writeFileSync('index.html', newHtml, 'utf8');
console.log('✅ index.html обновлён');
console.log('📊 Размер knowledge_base:', Math.round(kb.length / 1024), 'KB');
