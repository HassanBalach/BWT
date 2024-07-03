const inputTag = document.getElementById("inputTag");

inputTag.addEventListener("input", (event) => {
  const text = event.target.value;
  
  const characterCount = text.length;

  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  const wordCount = words.length;

  const sentences = text
    .split(/[.!?]+/)
    .filter((sentence) => sentence.trim().length > 0);
  const sentenceCount = sentences.length;

  const paragraphs = text
    .split(/\n\n+/)
    .filter((paragraph) => paragraph.trim().length > 0);
  const paragraphCount = paragraphs.length;

  const spaceCount = (text.match(/\s/g) || []).length;

  const letterCount = text.replace(/[^a-zA-Z]/g, "").length;

  const digitCount = text.replace(/\D/g, "").length;

  const specialCharCount = text.replace(/[a-zA-Z0-9\s]/g, "").length;

  document.getElementById("characterCount").innerText = characterCount;
  document.getElementById("wordCount").innerText = wordCount;
  document.getElementById("sentenceCount").innerText = sentenceCount;
  document.getElementById("paragraphCount").innerText = paragraphCount;
  document.getElementById("spaceCount").innerText = spaceCount;
  document.getElementById("letterCount").innerText = letterCount;
  document.getElementById("digitCount").innerText = digitCount;
  document.getElementById("specialCharCount").innerText = specialCharCount;

});
