import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { newCourseFormType } from '../useNewCourseForm';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  form: newCourseFormType;
  description? : string
};

export default function CourseDescriptionForm({ form , description}: Props) {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Description"
              className="resize-none"
              {...field}
              value={field.value || description}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
