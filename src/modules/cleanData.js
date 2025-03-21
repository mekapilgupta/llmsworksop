export const cleanText = (htmlContent) => {
    console.log("Cleaning text from HTML content");

    // Create a new DOMParser instance
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Extract text from the body
    const rawText = doc.body.textContent || "";
    console.log("raw text", rawText);
    
    return rawText
      .replace(/\s+/g, ' ') // Collapse whitespace
      .trim();
};

  