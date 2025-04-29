import { CategoryInterface } from '@/pages/studentCourse/types';
import API from './api';

export const fetchCategories = async (): Promise<CategoryInterface[]> => {
  try {
    const res = await API.get('/categories');
    const data = await res.data;
    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchEnrollCourses = async (param: string) => {
  try {
    const res = await API.get('/courses/my-courses?' + param);
    const data = await res.data;
    console.log(data, 'enrolled-course');
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const fetchCourses = async (param: string) => {
  try {
    const res = await API.get('/courses?' + param);
    const data = await res.data;
    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const fetchCourseDetails = async (courseId: string) => {
  try {
    const res = await API.get('/courses/' + courseId);
    const data = await res.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
