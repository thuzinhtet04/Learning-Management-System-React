import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { newCourseFormType } from '../useNewCourseForm';
import { level } from '@/pages/studentCourse/types';

type Props = {
  form: newCourseFormType;
  level?: level;
};

export default function CourseLevelForm({ form, level }: Props) {
  return (
    <FormField
      control={form.control}
      name="level"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Level</FormLabel>
          <Select onValueChange={field.onChange} value={field.value || level}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advance">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
