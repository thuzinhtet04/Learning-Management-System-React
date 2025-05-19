import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { newCourseFormType } from '../useNewCourseForm';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

type Props = {
  form: newCourseFormType;
  src?: string;
};

export default function CourseThumbnailForm({ form, src }: Props) {
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
                  const file = e.target.files?.[0];
                  field.onChange(file); // pass the File object to react-hook-form

                  if (file) {
                    const url = URL.createObjectURL(file);
                    setProfilePic(url as string);
                  }
                  // if (file) {
                  //   const url = URL.createObjectURL(file);
                  //   setProfilePic(url); // or however you handle previews
                  // }
                }}
                // onChange={(e) => {
                //   field.onChange(e);

                //   const file = e.target.files?.[0];
                //   if (file) {
                //     const url = URL.createObjectURL(file);
                //     setProfilePic(url as string);
                //   }
                // }}
                placeholder="course photo"
                name={field.name}
                ref={field.ref}
              />
            </FormControl>
          </div>
          <div className="">
           <img className='w-40' src={profilePic || src} />
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
