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
};

export default function CourseDurationForm({ form }: Props) {
  return (
    <FormField
      control={form.control}
      name="duration"
      render={({ field }) => (
        <FormItem className=''>
          <FormLabel>Course Duration(Hours)</FormLabel>
          <FormControl className=''>
            <Input type="number" placeholder="2 hours" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
//! need to make duration 
