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
  orgPrice?: number;
};

export default function CourseOriginalPriceForm({ form, orgPrice }: Props) {
  return (
    <FormField
      control={form.control}
      name="original_price"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Original Price</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Original Price"
              {...field}
              value={field.value || orgPrice}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
