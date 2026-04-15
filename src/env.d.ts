// src/env.d.ts
interface Window {
  showModal: (type: 'success' | 'error', title: string, message: string) => void;
}