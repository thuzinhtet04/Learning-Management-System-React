import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
// import { newCourseFormType } from '../useNewCourseForm';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useParams } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createLesson,
  getCourseByIdNormal,
} from '@/features/authentication/service/services';

const newLessonFormSchema = z.object({
  course_id: z.string(),
  title: z
    .string()
    .min(5, { message: 'lesson title must be at least 5 character long' }),
  lesson_detail: z
    .string()
    .min(10, { message: 'lesson details must be at least 5 character long' }),
  is_available: z.boolean().default(true),
  video_url: z
    .string()
    .min(5, { message: 'lesson video url must be at least 5 character long' })
    .startsWith('https://', 'please enter valid video url link'),
  // lessons: z.array(lessonSchema),
});

export type newLessonForm = z.infer<typeof newLessonFormSchema>;

export default function CourseLessonForm() {
  const { courseId } = useParams();

  const { data: courseData } = useQuery({
    queryKey: [courseId, 'show'],
    queryFn: () => {
      return getCourseByIdNormal(courseId!);
    },
  });
  const { mutate } = useMutation({
    mutationFn: (lessonData: newLessonForm) => {
      return createLesson(courseId!, lessonData);
    },
    mutationKey: [courseId, 'lesson'],
    onSuccess: () => {
      form.reset();
    },
  });

  const form = useForm<newLessonForm>({
    resolver: zodResolver(newLessonFormSchema),
    defaultValues: {
      course_id: courseId,
      title: '',
      lesson_detail: '',
      is_available: true,
      video_url: '',
    },
  });

  const onSubmit = (data: newLessonForm) => {
    console.log(data, 'lesson form data');
    mutate({ ...data, course_id: courseId });
  };

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="border border-gray-600 p-4 rounded-lg space-y-2">
            <h2>Create Lesson for {courseData?.data.course_name}</h2>
            <FormField
              control={form.control}
              name={`title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Title </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter lesson title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`lesson_detail`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter lesson details"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`video_url`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Url</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter video URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`is_available`}
              render={({ field }) => (
                <FormItem className="flex items-end gap-1 mb-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <FormLabel>Available</FormLabel>
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
      {/* <Button
        type="button"
      >
        Add New Lesson
      </Button> */}
    </div>
  );
}
