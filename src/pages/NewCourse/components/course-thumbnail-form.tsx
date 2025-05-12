import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { newCourseFormType } from '../useNewCourseForm';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';

type Props = {
  form: newCourseFormType;
};

export default function CourseThumbnailForm({ form }: Props) {
  const [profilePic, setProfilePic] = useState('');

  return (
    <FormField
      control={form.control}
      name="thumbnail"
      render={({ field }) => (
        <FormItem className="flex items-end gap-2">
          <div className="flex-grow">
            <FormLabel>Course Profile Photo</FormLabel>
            <FormControl>
              <Input
                type="file"
                onChange={(e) => {
                  field.onChange(e);

                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setProfilePic(url as string);
                  }
                }}
                placeholder="course photo"
              />
            </FormControl>
          </div>
          <div className="w-2">
            {!!field.value && (
              <Avatar>
                <AvatarImage src={profilePic} alt="@shadcn" />
                <AvatarFallback>{profilePic}</AvatarFallback>
              </Avatar>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
