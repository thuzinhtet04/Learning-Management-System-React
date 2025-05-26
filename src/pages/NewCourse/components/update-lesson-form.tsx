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

import { Checkbox } from '@/components/ui/checkbox';
// import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getLessonById,
  updateLesson,
} from '@/features/authentication/service/services';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const newLessonFormSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'lesson title must be at least 5 character long' })
    .optional(),
  lesson_detail: z
    .string()
    .min(10, { message: 'lesson details must be at least 5 character long' })
    .optional(),
  is_available: z.boolean().default(true),
  video_url: z
    .string()
    .min(5, { message: 'lesson video url must be at least 5 character long' })
    .startsWith('https://', 'please enter valid video url link')
    .optional(),
});

export type newLessonForm = z.infer<typeof newLessonFormSchema>;

export default function UpdateLessonForm() {
  // const { authUser } = useAuthStore();
  const { lessonId } = useParams();

  const { data: lesson, isLoading } = useQuery({
    queryKey: ['show', 'lessons'],
    queryFn: () => getLessonById(lessonId!),
    // staleTime: 60 * 1000,
  });
  console.log(lesson);

  const { mutate } = useMutation({
    mutationFn: (lessonData: newLessonForm) => {
      return updateLesson(lessonId!, lessonData);
    },
    mutationKey: [],
    onSuccess: () => {
      form.reset();
    },
  });

  const form = useForm<newLessonForm>({
    resolver: zodResolver(newLessonFormSchema),
    defaultValues: {
      title: lesson?.data.title,
      lesson_detail: lesson?.data.lessonDetail,
      is_available: lesson?.data?.is_available == 1 ? true : false,
      video_url: lesson?.data.videoUrl,
    },
  });

  const onSubmit = (data: newLessonForm) => {
    console.log(data, 'lesson form data');
    console.log('submit');
    mutate({
      title: data.title ?? lesson.data.title,
      lesson_detail: data.lesson_detail ?? lesson.data.lessonDetail,
      video_url: data.video_url ?? lesson.data.videoURL,
      is_available: data.is_available ?? lesson.data.is_available,
    });
  };
  if (isLoading) return <div>Loading ...</div>;

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="border border-gray-600 p-4 rounded-lg space-y-2">
            {/* <FormField
              control={form.control}
              name="course_id" // or whatever your field name is
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses?.data.map((course) => (
                          <SelectItem key={course.id} value={`${course.id}`}>
                            {course.course_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name={`title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Title </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter lesson title"
                      {...field}
                      onChange={field.onChange}
                      value={field.value ?? lesson.data.title}
                    />
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
                      {...field}
                      value={field.value ?? lesson?.data?.lessonDetail}
                      className="resize-none"
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
                    <Input
                      placeholder="Enter video URL"
                      {...field}
                      value={field.value ?? lesson?.data?.videoUrl}
                    />
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
                      onCheckedChange={field.onChange}
                      checked={field.value ?? lesson.data.is_available}
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
    </div>
  );
}
