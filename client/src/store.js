import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUser = create(
  persist(
    (set) => ({
      user: null,
      setUser: (data) => set(() => ({ user: data })),
    }),
    {
      name: 'user',
    }
  )
);

export const useDateRange = create((set, get) => ({
  from: null,
  to: null,
  fromDate: () => get().from?.format('DD-MM-YYYY'),
  toDate: () => get().to?.format('DD-MM-YYYY'),
  setDateRange: (dateRange) =>
    set(() => ({ from: dateRange[0], to: dateRange[1] })),
}));

export const useRoomFilters = create((set) => ({
  searchQ: '',
  hotelType: 'all',
  setSearchQ: (value) => set({ searchQ: value }),
  setHotelType: (value) => set({ hotelType: value }),
}));
