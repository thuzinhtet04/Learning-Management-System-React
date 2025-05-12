import { CourseResponse, instructor } from './../pages/studentCourse/types';
import API from '@/features/authentication/service/api';
import {
  CourseDetailsResponse,
  UserResponse,
} from '@/pages/CourseDetails/types';
import { AllCategoryResponse, AllCourseResponse } from '@/pages/Courses/types';

export async function getCourseById(formData: FormData) {
  const response = await API.post(`/courses`, formData);
  const data = await response.data;
  console.log(data, "course create response data")
  return data.data;

}

export const fetchCourseByInstructor = async (
  url: string,
  param: string = ''
): Promise<CourseResponse> => {
  try {
    const res = await API.get(url + '&' + param);
    const data = await res.data;
    return data.data;
  } catch (error) {
    throw new Error(`fail to fetch  courses by this instructor ${error}`);
  }
};
export const DestroyCourseByInstructor = async (id: number) => {
  try {
    const res = await API.delete('/courses/' + id);
    const data = await res.data;
    return data.data;
  } catch (error) {
    throw new Error(`fail to fetch  courses by this instructor ${error}`);
  }
};

export async function getAllCourses(
  param: string = '',
  category: number = 0,
  instructor: string = '',
  PageIndex: number = 0
) {
  try {
    const response = await API.get(
      '/courses' +
        `?category=` +
        category +
        '&search=' +
        param +
        '&instructor=' +
        instructor
    );

    const data = response.data;
    console.log('res axios >>>', response);

    return data.data;
  } catch (error) {
    throw new Error(`fail to fetch all courses ${error}`);
  }
}

export async function getAllCategories() {
  try {
    const response = await API.get<AllCategoryResponse>('/categories');
    const data = response.data;

    return data.data;
  } catch (error) {
    throw new Error(`fail to fetch all categories ${error}`);
  }
}

export async function getInstructorById(instructorId: number) {
  try {
    const response = await API.get<UserResponse>(
      `/instructors/${instructorId}`
    );
    const data = response.data;

    return data.data;
  } catch (error) {
    throw new Error(`Failed to fetch ${error}`);
  }
}
