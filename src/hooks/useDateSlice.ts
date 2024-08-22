import {StateCreator} from 'zustand'
import {MiniDateSlice} from './useMiniDateSlice'

interface DateType {
  year: number
  month: number
}

export interface DateSlice {
  date: DateType;
  setDate: (date: DateType) => void;
  todaySet: () => void;
  incrementMonth: () => void;
  decrementMonth: () => void;
}

const today = new Date();

const defaultState = { year: today.getFullYear(), month: today.getMonth()+1,}

export const createDateSlice:StateCreator<DateSlice & MiniDateSlice, [], [], DateSlice> = (set, get) => ({
  date: defaultState,
  setDate: (date: DateType) => {set({ date })},
  todaySet: () => {
    set({date: defaultState});
    set({miniDate: defaultState});
  },
  incrementMonth: () => {
    let year: number = get().date.year;
    let month: number = get().date.month;

    if(month == 12) {
      year += 1;
      month = 1;
    }
    else {
      month += 1;
    }

    set({date:{year:year, month:month}});
    set({miniDate:{year:year, month:month}});
  },
  decrementMonth: () => {
    let year: number = get().date.year;
    let month: number = get().date.month;

    if(month == 1) {
      year -= 1;
      month = 12;
    }
    else {
      month -= 1;
    }

    set({date:{year:year, month:month}});
    set({miniDate:{year:year, month:month}});
  }
});