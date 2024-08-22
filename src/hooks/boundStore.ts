import { create } from 'zustand'
import { createDateSlice, DateSlice} from './useDateSlice';
import { createMiniDateSlice, MiniDateSlice} from './useMiniDateSlice';
import { createTodoSlice, TodoSlice } from './todoSlice';
import { createMenuDataSlice, MenuDataSlice } from './menuData';

export const useBoundStore = create<DateSlice & MiniDateSlice & TodoSlice & MenuDataSlice>((...a) => ({
    ...createDateSlice(...a),
    ...createMiniDateSlice(...a),
    ...createTodoSlice(...a),
    ...createMenuDataSlice(...a),
}));