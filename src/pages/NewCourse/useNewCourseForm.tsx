import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { CourseDetailsResponse } from '../CourseDetails/types';
import { File } from 'lucide-react';

// const lessonSchema = z.object({
//   title: z.string().min(1, 'Title is required'),
//   videoUrl: z.string().min(1, 'Video Url is required'),
//   lessonDetail: z.string().min(1, 'Lesson Details is required'),
//   available: z.boolean().default(true),
// });

export const newCourseFormSchema = z.object({
  course_name: z.string(),
  // min(2, {
  //   message: 'courseName must be at least 2 characters.',
  // }),
  category_id: z.number({ required_error: 'Category Name is required' }),
  category_name: z.string().default('sample category'),
  type: z.string({ required_error: 'type is required' }).optional(),
  level: z.string({ required_error: 'level is required' }).optional(),
  description: z.string({ required_error: 'description is required' }),
  duration: z.coerce
    .number({ required_error: 'duration is required' })
    .optional(),
  original_price: z.any().optional(),
  current_price: z.any().optional(),
  // available: z.boolean().default(),
  thumbnail: z.any().optional(),
  // .refine((file) => file.size <=  5 * 1024 * 1024 , 'File size is too large.'),
  // lessons: z.array(lessonSchema),
});

export type NewCourseFormData = UseFormReturn<
  z.infer<typeof newCourseFormSchema>
>;

export default function useNewCourseForm(
 courseData : CourseDetailsResponse | undefined 
): NewCourseFormData {
  const form = useForm({
    resolver: zodResolver(newCourseFormSchema),
    defaultValues: {
      course_name: courseData?.data.course_name ?? "",
      category_id: courseData?.data.category.id ?? 0,
      category_name: courseData?.data.category.name ?? "",
      type: courseData?.data.type,
      level: courseData?.data.level ,
      description: courseData?.data.description ?? "",
      thumbnail: courseData?.data.thumbnail,
      duration: courseData?.data.duration  ,
      original_price: courseData?.data.original_price ,
      current_price: courseData?.data.current_price ,
      // available: true,
      // lessons: [],
    },
  });

  // const { mutate, isPending } = useMutation({
  //   mutationKey: ['create', 'newCourse'],
  //   mutationFn: () => getCourseById(formData),
  //   onSettled: () => {
  //     form.reset;
  //   },
  // });
  // useEffect(() => {
  //   // form.reset(data.data);
  //   // if (courseId) getCourseById();
  // }, [courseId, form]);

  return form;
}

export type newCourseFormType = ReturnType<typeof useNewCourseForm>;
