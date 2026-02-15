// Lightweight adapter so feature components can use a stable API.
// Internally we use the ToastProvider in src/components/ui/Toast.jsx
// which exposes { push }. Some parts of the app expect { addToast }.

import { useToast as useToastBase } from "../components/ui/Toast";

/**
 * @returns {{ addToast: (toast: {title?: string, message?: string, type?: string, duration?: number}) => void, push: Function }}
 */
export function useToast() {
  const { push } = useToastBase();
  return {
    push,
    addToast: push,
  };
}
