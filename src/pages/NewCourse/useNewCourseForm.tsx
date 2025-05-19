import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

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
  category_name: z.string().default("sample category"),
  type: z.string({ required_error: 'type is required' }),
  level: z.string({ required_error: 'level is required' }),
  description: z.string({ required_error: 'description is required' }),
  duration: z.coerce.number({ required_error: 'duration is required' }),
  original_price: z.any(),
  current_price: z.any(),
  // available: z.boolean().default(),
  thumbnail: z
    .instanceof(File).optional()
    // .refine((file) => file.size <=  5 * 1024 * 1024 , 'File size is too large.'),
  // lessons: z.array(lessonSchema),
});

export type NewCourseFormData = UseFormReturn<
  z.infer<typeof newCourseFormSchema>
>;

export default function useNewCourseForm(
 
): NewCourseFormData {
  const form = useForm({
    resolver: zodResolver(newCourseFormSchema),
    defaultValues: {
      course_name: '',
      category_id: undefined,
      category_name: '',
      type: 'free',
      level: 'beginner',
      description: '',
      thumbnail:  undefined,
      duration: 0 ,
      original_price: 0,
      current_price: 0,
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
