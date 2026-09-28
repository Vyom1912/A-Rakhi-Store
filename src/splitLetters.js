// split a name into the letters that will be woven, keeping Gujarati and Hindi
// letters together with their vowel signs (e.g. "રા" stays one letter)
export const splitLetters = (text) => {
  const clean = text.trim();
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    return [...new Intl.Segmenter("en", { granularity: "grapheme" }).segment(clean)]
      .map((part) => part.segment)
      .filter((letter) => letter.trim());
  }
  return Array.from(clean).filter((letter) => letter.trim());
};
