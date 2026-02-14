/**
 * Copy text to clipboard with fallback for browsers that don't support the Clipboard API
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Try modern Clipboard API first
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn("Clipboard API failed, trying fallback", err);
    }
  }

  // Fallback method for older browsers or insecure contexts
  try {
    // Create a temporary textarea element
    const textarea = document.createElement("textarea");
    textarea.value = text;

    // Make it invisible and non-interactive
    textarea.style.position = "fixed";
    textarea.style.left = "-999999px";
    textarea.style.top = "-999999px";
    textarea.setAttribute("readonly", "");
    textarea.setAttribute("aria-hidden", "true");

    document.body.appendChild(textarea);

    // Select and copy the text
    textarea.select();
    textarea.setSelectionRange(0, text.length);

    const successful = document.execCommand("copy");
    document.body.removeChild(textarea);

    if (successful) {
      return true;
    }
  } catch (err) {
    console.error("Fallback copy failed", err);
  }

  return false;
}
