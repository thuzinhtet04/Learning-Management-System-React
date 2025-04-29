import { courseDetails, instructor, users } from '../studentCourse/types';

export type CourseDetailsResponse = {
  data: courseDetails;
  error?: null;
  message: string;
};

export type UserResponse = {
  data: instructor;
  error?: null;
  message: string;};
