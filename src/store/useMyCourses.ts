import { Course } from '@/pages/studentCourse/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MyCourses {
  courses: Course[] | undefined;
  filteredCourses: Course[] | undefined;
  setCourses: (courses: Course[]) => void;
  getCourseByName: (name: string) => Course | any;
  getCourseByCategory: (id: number) => void;
}

export const useMyCourses = create<MyCourses>()(
  persist(
    (set, get) => ({
      courses: undefined,
      filteredCourses: undefined,
      setCourses: (courses) => set({ courses, filteredCourses: courses }),
      getCourseByName: (name) => {
        const course = get().courses!?.filter((course) =>
          course.course_name.toLowerCase().includes(name.toLowerCase())
        );
        return course;
      },
      getCourseByCategory: (id) => {
        console.log(id , "id at zustand")
        if (id === 0) {

          return set({ filteredCourses: get().courses! });
        }
        const filterCourses = get().courses!?.filter(
          (course) => course.category?.id === id
        );
        set({ filteredCourses: filterCourses });
      },
    }),
    { name: 'mycourse' }
  )
);
