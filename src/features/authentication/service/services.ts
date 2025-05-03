import { CategoryInterface } from '@/pages/studentCourse/types';
import API from './api';
import { CourseDetailsResponse } from '@/pages/CourseDetails/types';

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
export const  getCourseById =   async  (courseId : string) => {
  const res = await API.get("/courses/"+courseId);
  // const response = await fetch(`${API_BASE_URL}/courses/${courseId}`);
  const data = (await res.data) as CourseDetailsResponse;
  console.log(data) 
  return data;
}
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
