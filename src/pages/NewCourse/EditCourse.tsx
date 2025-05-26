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
// import CourseLessonForm from './components/course-lesson-form';
import { CategoryInterface } from '../studentCourse/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  editCourse,
  getCourseByIdNormal,
} from '@/features/authentication/service/services';
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

export default function EditCourse() {
  // const [categoryId, setCategoryId] = useState(0);
  const [category, setCategory] = useState<CategoryInterface | null>();
  const { state } = useLocation();
  const courseId = state?.courseId as number | undefined;
  const [is_available, setIsAvailable] = useState<boolean>(true);
  const { authUser } = useAuthStore();

  const { data: courseData } = useQuery({
    queryKey: ['edit', 'course', courseId],
    queryFn: () => {
      return getCourseByIdNormal(`${courseId}`);
    },
  });

  const form = useNewCourseForm(courseData);
  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => {
      return editCourse(courseId!, data);
    },
    mutationKey: ['create', 'course'],
    onSuccess: async () => {
      if (is_available) {
        if (courseData?.data.is_available) return;
        //make route for courses that is enrolled
        const res = await API.post(`/courses/${courseId}/request`);
        const message = await res.data.message;
        toast(message);
      } else {
        const res = await API.patch('/courses/unpublish/' + courseId, {
          "is_available": false,
        });
        await res.data;
        if (res.status) toast('Unpublish your course successfully ');
      }
    },
  });

  useEffect(() => {
    setIsAvailable(courseData?.data.is_available as boolean);
  }, [courseData]);

  const onSubmit = async (data: createCourseData) => {
    console.log('submit edit ', data);
    const formData = new FormData();

    formData.append(
      'course_name',
      data.course_name
        ? data.course_name
        : (courseData?.data.course_name as string)
    );
    formData.append('category_id', String(data.category_id));
    formData.append(
      'type',
      data.type ? `${data.type}` : (courseData?.data.type as string)
    );
    formData.append(
      'level',
      data.level ? `${data.level}` : (courseData?.data.level as string)
    );
    formData.append(
      'description',
      data.description || (courseData?.data.description as string)
    );
    formData.append(
      'duration',
      data.duration ? `${data.duration}` : `${courseData?.data.duration}`
    );
    formData.append(
      'original_price',
      data.original_price
        ? String(data.original_price)
        : String(courseData?.data.original_price)
    );
    formData.append(
      'current_price',
      data.current_price
        ? String(data.current_price)
        : String(courseData?.data.current_price)
    );
    // min(2, {
    //   message: 'courseName must be at least 2 characters.',
    // }),
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    if (data.thumbnail && data.thumbnail instanceof File) {
      formData.append('thumbnail', data.thumbnail);
    }

    // mutate({...data , duration : "3" , original_price : "100" , current_price : "50"});
    mutate(formData); //fix update course in php
  };
  const imagePlaceHolder =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShpzLoP8w4TO5SHlH-boYRjN1Lth9K8QiHbQrDogf2MILT4rZ6E6Xvea1DegiYs81ld50&usqp=CAU';
  console.log(form.formState.errors, 'error');

  if (authUser?.data.roleName !== 'instructor') return <Navigate to="/" />; // console.log('courseId >>>', courseId ?? 'not exist');

  // if(isLoading) return
  return (
    <div>
      {/* <Sample /> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <CourseNameForm
            form={form}
            name={courseData?.data.course_name ?? ''}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 items-end gap-1">
            {/* categoryName */}
            <div>
              <CourseCategoryForm
                categoryName={courseData?.data.category.name ?? ''}
                categoryId={courseData?.data.category.id ?? 0}
                form={form}
                onCategory={setCategory}
                category={category!}
              />
            </div>

            <div>
              {/* type */}
              <CourseTypeForm form={form} type={courseData?.data.type ?? ''} />
            </div>
            <div>
              {/* level */}
              <CourseLevelForm
                form={form}
                level={courseData?.data.level ?? 'beginner'}
              />
            </div>
          </div>

          {/* description */}
          <CourseDescriptionForm
            form={form}
            description={courseData?.data.description ?? ''}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center">
            {/* duration */}
            <CourseDurationForm
              form={form}
              duration={`${courseData?.data.duration}` || ''}
            />

            {/* originalPrice */}
            <CourseOriginalPriceForm
              form={form}
              orgPrice={courseData?.data.original_price ?? 0}
            />

            {/* currentPrice */}
            <CourseCurrentPriceForm
              form={form}
              curPrice={courseData?.data.current_price ?? 0}
            />
          </div>
          <div className="grid grid-cols-8 items-end">
            {/* thumbnail */}
            <div className="col-span-7">
              <CourseThumbnailForm
                form={form}
                src={courseData?.data.thumbnail || imagePlaceHolder}
              />
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
