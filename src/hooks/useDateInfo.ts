import { create } from 'zustand'

interface DateType {
  year: number
  month: number
}

interface DateState {
  date: DateType
}

interface DateActions {
  setDate: (date: DateType) => void
  todaySet: () => void
}

const today = new Date();

const defaultState = { year: today.getFullYear(), month: today.getMonth()+1,}

const useDate  = create<DateState & DateActions>((set) => ({
  date: defaultState,
  setDate: (date: DateType) => {set({ date })},
  todaySet: () => {set({date: defaultState})},
}))

export default useDate