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

type Props = {
  form: newCourseFormType;
  type? : string
};

export default function CourseTypeForm({ form , type }: Props) {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>Type</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || type}  >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="free">Free</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
