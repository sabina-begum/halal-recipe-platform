/**
 * Data URL for a simple cooking/recipe placeholder SVG.
 * Use as fallback when recipe images fail to load (e.g. in OptimizedImage).
 */
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 2v6"/><path d="M8 2v6"/><path d="M12 2v20"/><path d="M4 8v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/></svg>`;
export const PLACEHOLDER_IMAGE_SVG =
  "data:image/svg+xml," + encodeURIComponent(svg);
