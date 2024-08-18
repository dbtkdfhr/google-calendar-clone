import { create } from 'zustand'

interface MiniDateType {
  year: number
  month: number
}

interface MiniDateState {
    miniDate: MiniDateType
}

interface MiniDateActions {
  setMiniDate: (date: MiniDateType) => void
  setMiniToday: () => void
}

const today = new Date();

const defaultState = { year: today.getFullYear(), month: today.getMonth()+1,}

const useMiniDate  = create<MiniDateState & MiniDateActions>((set) => ({
  miniDate: defaultState,
  setMiniDate: (miniDate: MiniDateType) => {set({ miniDate })},
  setMiniToday: () => {set({miniDate: defaultState})},
}))

export default useMiniDate