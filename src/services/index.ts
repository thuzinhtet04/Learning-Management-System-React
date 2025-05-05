import API from '@/features/authentication/service/api';
import { UserResponse } from '@/pages/CourseDetails/types';
import { AllCategoryResponse, AllCourseResponse } from '@/pages/Courses/types';

export async function getAllCourses(param : string , category : number = 0) {
  try {
    const response = await API.get('/courses'+`?category=`+category+"&search=" +param);

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
