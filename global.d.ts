export {}; // Ensure it's treated as a module

declare global {
  interface Window {
    puter?: any; // Use a more specific type if available
  }
}