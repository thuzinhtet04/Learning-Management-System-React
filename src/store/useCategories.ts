import { CategoryInterface } from '@/pages/studentCourse/types';
import { create } from 'zustand';
interface CategoriesState {
  categories: CategoryInterface[] | null;
  setCategories: (categories: CategoryInterface[]) => void;
  getCategoryByName: (name: string) => CategoryInterface;
  getCategoryById: (id: number) => CategoryInterface;
}

export const useCategories = create<CategoriesState>()((set, get) => ({
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
}));
