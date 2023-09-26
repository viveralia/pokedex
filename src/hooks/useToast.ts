import { nanoid } from "nanoid";
import { create } from "zustand";

export interface ToastItem {
  id: string;
  title: string;
  duration?: number;
  onPress?: () => void;
}

type CreateToast = Omit<ToastItem, "id"> & Partial<Pick<ToastItem, "id">>;

interface ToastState {
  toasts: ToastItem[];
  showToast: (toast: CreateToast) => void;
  dismissToast: (toastId: ToastItem["id"]) => void;
}

export const useToast = create<ToastState>()((set) => ({
  toasts: [],
  showToast: (toast) => {
    const toastId = toast.id ?? nanoid();

    set((state) => {
      const isDuplicatedToast = !!state.toasts.find((t) => t.id === toastId);
      if (isDuplicatedToast) return state;
      return { toasts: [...state.toasts, { ...toast, id: toastId }] };
    });

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== toastId),
      }));
    }, toast.duration ?? 3500);
  },
  dismissToast: (toastId) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== toastId),
    }));
  },
}));
