import { StateCreator } from 'zustand'

interface MiniDateType {
  year: number
  month: number
}

export interface MiniDateSlice {
  miniDate: MiniDateType;
  setMiniDate: (date: MiniDateType) => void;
  setMiniToday: () => void;
  incrementMiniMonth: () => void;
  decrementMiniMonth: () => void;
}

const today = new Date();

const defaultState = { year: today.getFullYear(), month: today.getMonth()+1,}

export const createMiniDateSlice: StateCreator<MiniDateSlice> = (set, get) => ({
  miniDate: defaultState,
  setMiniDate: (miniDate: MiniDateType) => {set({ miniDate })},
  setMiniToday: () => {set({miniDate: defaultState})},
  incrementMiniMonth: () => {
    let year: number = get().miniDate.year;
    let month: number = get().miniDate.month;

    if(month == 12) {
      year += 1;
      month = 1;
    }
    else {
      month += 1;
    }

    set({miniDate:{year:year, month:month}});
  },
  decrementMiniMonth: () => {
    let year: number = get().miniDate.year;
    let month: number = get().miniDate.month;

    if(month == 1) {
      year -= 1;
      month = 12;
    }
    else {
      month -= 1;
    }

    set({miniDate:{year:year, month:month}});
  }
});