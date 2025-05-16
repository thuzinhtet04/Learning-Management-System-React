import { CategoryInterface, users } from '@/pages/studentCourse/types';
import API from './api';
import { CourseDetailsResponse } from '@/pages/CourseDetails/types';
import { newCourseFormSchema } from '@/pages/NewCourse/useNewCourseForm';
import { createCourseData } from '@/pages/NewCourse/NewCourse';

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
export const fetchProfile = async (): Promise<users> => {
  const res = await API.get('/auth/me');
  const data = await res.data;
  console.log(data, 'profile');
  return data.data;
};
export const updateProfile = async (
  formData: FormData,
  id: number
): Promise<users> => {
  const res = await API.post('/users/' + id + '/profile-photo', formData);
  const data = await res.data;
  console.log(data, 'profile');
  return data.data;
};

export const createCourse = async (courseData: FormData) => {
  const res = await API.post('/courses', courseData);
  const data = await res.data;
  return data;
};

export const getCourseById = async (courseId: string) => {
  const res = await API.get('/courses/' + courseId);
  // const response = await fetch(`${API_BASE_URL}/courses/${courseId}`);
  const data = (await res.data) as CourseDetailsResponse;
  console.log(data);
  return data;
};
export const fetchEnrollCourses = async () => {
  try {
    const res = await API.get('/courses/my-courses');
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
