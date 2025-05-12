import { categories } from './../pages/studentCourse/types';
import { CategoryInterface } from '@/pages/studentCourse/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface CategoriesState {
  categories: CategoryInterface[] | null;
  setCategories: (categories: CategoryInterface[]) => void;
  getCategoryByName: (name: string) => CategoryInterface;
  getCategoryById: (id: number) => CategoryInterface;
}

export const useCategories = create<CategoriesState>()(
  persist(
    (set, get) => ({
      categories: null,
      setCategories: (categories) => set({ categories: categories }),
      getCategoryByName: (name) => {
        const category = get().categories?.find(
          (el) => el.name === name
        ) as CategoryInterface;
        return category;
      },
      getCategoryById: (id: number) => {
        const category = get().categories?.find(
          (el) => el.id === id
        ) as CategoryInterface;
        return category;
      },
    }),
    { name: 'categories' }
  )
);
