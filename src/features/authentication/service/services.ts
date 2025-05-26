import { lesson } from './../../../pages/studentCourse/types';
import { CategoryInterface, users } from '@/pages/studentCourse/types';
import API from './api';
import { CourseDetailsResponse } from '@/pages/CourseDetails/types';
import { newCourseFormSchema } from '@/pages/NewCourse/useNewCourseForm';
import { createCourseData } from '@/pages/NewCourse/NewCourse';
import { newLessonForm } from '@/pages/NewCourse/components/course-lesson-form';

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
  return data.data;
};
export const editCourse = async (courseId: number, courseData: any) => {
  const res = await API.post('/courses/' + courseId, courseData);
  console.log(res, 'res');
  const data = await res.data;
  return data.data;
};

export const getCourseById = async (courseId: string) => {
  const res = await API.get('/courses/' + courseId);
  // const response = await fetch(`${API_BASE_URL}/courses/${courseId}`);
  const data = (await res.data) as CourseDetailsResponse;
  console.log(data);
  return data;
};
export const getCourseByIdNormal = async (courseId: string = '0') => {
  const res = await API.get('/courses/' + courseId + '/normal');
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

export const createLesson = async (courseId: string, lessonData: unknown) => {
  try {
    const res = await API.post('/courses/' + courseId + '/lessons', lessonData);
    const data = await res.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const updateLesson = async (LessonId: string, lessonData: unknown) => {
  try {
    const res = await API.put('/lessons/' + LessonId, lessonData);
    const data = await res.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getLessonById = async (lessonId: string) => {
  try {
    const res = await API.get('/lessons/' + lessonId);
    const data = await res.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
