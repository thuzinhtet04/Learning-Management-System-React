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
  curPrice? : number | string
};

export default function CourseCurrentPriceForm({ form , curPrice }: Props) {
  return (
    <FormField
      control={form.control}
      name="current_price"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Current Price</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Current Price" {...field} value={field.value || curPrice} onChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
