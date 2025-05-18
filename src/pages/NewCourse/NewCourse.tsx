import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import useNewCourseForm, { newCourseFormSchema } from './useNewCourseForm';
import CourseTypeForm from './components/course-type-form';
import CourseLevelForm from './components/course-level-form';
import CourseDescriptionForm from './components/course-description-form';
import CourseCategoryForm from './components/course-category-form';
import CourseNameForm from './components/course-name-form';
import CourseDurationForm from './components/course-duration-form';
import CourseOriginalPriceForm from './components/course-original-price-form';
import CourseCurrentPriceForm from './components/course-current-price-form';
import CourseThumbnailForm from './components/course-thumbnail-form';
import CourseAvailableForm from './components/course-available-form';
import { Navigate, useLocation } from 'react-router-dom';
import CourseLessonForm from './components/course-lesson-form';
import { CategoryInterface } from '../studentCourse/types';
import { useMutation } from '@tanstack/react-query';
import { createCourse } from '@/features/authentication/service/services';
import { useAuthStore } from '@/store/authStore';
import API from '@/features/authentication/service/api';
import { toast } from 'sonner';

// const categories = [
//   { label: 'Web Development', value: 1 },
//   { label: 'Mobile Development', value: 2 },
//   { label: 'Data Science', value: 3 },
//   { label: 'Cloud Computing', value: 4 },
// ];
export type createCourseData = z.infer<typeof newCourseFormSchema>;

export default function NewCourse() {
  // const [categoryId, setCategoryId] = useState(0);
  const [category, setCategory] = useState<CategoryInterface | null>();
  const { state } = useLocation();
  const courseId = state?.courseId as number | undefined;
  const [is_available, setIsAvailable] = useState<boolean>(true);
  const { authUser } = useAuthStore();

  useEffect(() => {
    // const id = categories?.find((check) => check.label === category)?.value;
    // setCategoryId(id ?? 0);
  }, [category]);

  const form = useNewCourseForm(courseId);

  const { mutate, isPending } = useMutation({
    mutationFn: createCourse,
    mutationKey: ['create', 'course'],
    onSuccess: async (courseData) => {
      if (is_available) {
        //make route for courses that is enrolled
        const res = await API.post(`/courses/${courseData.id}/request`);
        const message = await res.data.message;
        toast(message);
      }
    },
  });

  const onSubmit = async (data: createCourseData) => {
    // console.log(
    //   { ...data, categoryId, categoryName: category?.name },
    //   'course DAta'
    // );
    const formData = new FormData();

    formData.append('course_name', data.course_name);
    formData.append('category_id', String(data.category_id));
    formData.append('type', data.type);
    formData.append('level', data.level);
    formData.append('description', data.description);
    formData.append('duration', data.duration);
    formData.append('original_price', String(data.original_price));
    formData.append('current_price', String(data.current_price));
    // min(2, {
    //   message: 'courseName must be at least 2 characters.',
    // }),

    if (data.thumbnail && data.thumbnail instanceof File) {
      formData.append('thumbnail', data.thumbnail);
    }
    mutate(formData);
  };
  console.log(form.formState.errors, 'error');

  if (authUser?.data.roleName !== 'instructor') return <Navigate to="/" />; // console.log('courseId >>>', courseId ?? 'not exist');

  return (
    <div>
      {/* <Sample /> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <CourseNameForm form={form} />

          <div className="grid grid-cols-2 md:grid-cols-3 items-end gap-1">
            {/* categoryName */}
            <div>
              <CourseCategoryForm
                form={form}
                onCategory={setCategory}
                category={category!}
              />
            </div>

            <div>
              {/* type */}
              <CourseTypeForm form={form} />
            </div>
            <div>
              {/* level */}
              <CourseLevelForm form={form} />
            </div>
          </div>

          {/* description */}
          <CourseDescriptionForm form={form} />

          {/* lessons */}
          {/* <CourseLessonForm  /> */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center">
            {/* duration */}
            <CourseDurationForm form={form} />

            {/* originalPrice */}
            <CourseOriginalPriceForm form={form} />

            {/* currentPrice */}
            <CourseCurrentPriceForm form={form} />
          </div>
          <div className="grid grid-cols-8 items-end">
            {/* thumbnail */}
            <div className="col-span-7">
              <CourseThumbnailForm form={form} />
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* available */}
            <CourseAvailableForm
              is_available={is_available}
              setIsAvailable={setIsAvailable}
            />

            <Button disabled={isPending} type="submit">
              {isPending ? 'Loading...0' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
