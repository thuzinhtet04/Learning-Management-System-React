export type TUserCourse = {
  id: number;
  category: string;
  title: string;
  progress: number;
  saved: boolean;
  instructor: string;
};

export interface CategoryInterface {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface InstructorUser {
  id: number;
  username: string;
  email?: string;
  phone?: string | null;
  dob?: string | null;
  address?: string | null;
  profile_photo: string | null;
  role_id?: number;
  is_available?: number;
  created_at?: string;
  updated_at?: string;
  laravel_through_key: number;

}

export type CourseResponse = {
  data: Course[];
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  per_page: number;
  total: number;
};
export interface Course {
  id: number;
  course_name: string;
  thumbnail: string;
  is_available: number;
  type: 'free' | 'paid';
  level: 'beginner' | 'intermediate' | 'advanced';
  description: string | null;
  duration: string;
  original_price: string;
  current_price: string;
  category_id: number;
  instructor_id: number;
  created_at: string;
  updated_at: string;
  instructor_user: InstructorUser;
  category: CategoryInterface;
}

export interface users {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  profilePhoto: string;
  available: boolean;
  roleName: Role;
  userId: number;
  nrc: string;
  eduBackground: string;
  createdAt: string;
  updatedAt: string;
}

export type Role = 'admin' | 'instructor' | 'student';

export interface categories {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface courseDetails {
  id: number;
  courseName: string;
  thumbnail: string;
  type: string;
  level: level;
  description: string;
  duration: number;
  original_price: number;
  current_price: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  available: boolean;
  instructorId?: number;
  categoryId: number;
  socialLinkId: number;
  category: categories;
  lessons: lesson[];
  socialLink: socialLinks;
  enrollment: enrollment[];
  instructor?: InstructorUser;
  instructorEducation : string;
}

export interface enrollment {
  id: number;
  studentId: number;
  courseId: number;
  enrollmentDate: string;
}
export interface enrollmentWithCourse {
  id: number;
  course_name: string;
  thumbnail: string;
  is_available: number;
  type: 'free' | 'paid';
  level: 'beginner' | 'intermediate' | 'advanced';
  description: string | null;
  duration: string;
  original_price: string;
  current_price: string;
  category_id: number;
  instructor_id: number;
  created_at: string;
  updated_at: string;
  pivot: {
    user_id: number;
    course_id: number;
    enrollment_date: string;
    is_completed: number;
    completed_date: string | null;
  };
  instructor_user: InstructorUser;
}

export function isEnrollmentArray(
  arr: enrollmentWithCourse[] | CourseResponse
): arr is enrollmentWithCourse[] {
  return arr?.length > 0 && 'pivot' in arr[0];
}

export type level = 'beginner' | 'intermediate' | 'advanced';

export interface lesson {
  id: number;
  title: string;
  videoUrl: string;
  lessonDetail: string;
  available: true;
  createdAt: string;
  updatedAt: string;
  courseId: number;
}

// no include
export interface socialLinks {
  id: number;
  facebook: string;
  x: string;
  telegram: string;
  phone: string;
  email: string;

  courseId?: number;
  course?: Course;
}
