import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { newCourseFormType } from '../useNewCourseForm';
import { Input } from '@/components/ui/input';

type Props = {
  form: newCourseFormType;
  name? : string
};

export default function CourseNameForm({ form , name }: Props) {
  return (
    <FormField
      control={form.control}
      name="course_name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Course Name</FormLabel>
          <FormControl>
            <Input placeholder="course name" name={field.name} value={ field.value || name } onChange={field.onChange}  />
          </FormControl>
                    <FormMessage />
        </FormItem>
      )}
    />
  );
}
