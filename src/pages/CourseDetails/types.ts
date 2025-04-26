import { courseDetails, users } from '../studentCourse/types';

export type CourseDetailsResponse = {
  data: courseDetails;
  error?: null;
  message: string;
};

export type UserResponse = {
  status: string;
  data: users;
  error: null;
  message: string;
  details: null;
};
