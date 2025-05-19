import {
  FormControl,
  
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
// import { newCourseFormType } from '../useNewCourseForm';
import { Checkbox } from '@/components/ui/checkbox';

type Props = {
  is_available: boolean;
  setIsAvailable: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CourseAvailableForm({
  is_available,
  setIsAvailable,
}: Props) {
  return (
    <FormItem className="flex items-end gap-1 mb-2">
      <FormControl>
        <Checkbox
          checked={is_available }
          onCheckedChange={(checked) => setIsAvailable(checked === true)}
        />
      </FormControl>

      <FormLabel>Set Public</FormLabel>
      <FormMessage />
    </FormItem>
  );
}
