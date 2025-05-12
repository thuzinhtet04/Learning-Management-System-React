import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { newCourseFormType } from '../useNewCourseForm';
import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useCategories } from '@/store/useCategories';
import { CategoryInterface } from '@/pages/studentCourse/types';

type Props = {
  form: newCourseFormType;
  category: CategoryInterface | null;
  onCategory: React.Dispatch<
    React.SetStateAction<CategoryInterface | null | undefined>
  >;
};

// const categories = [
//   { label: 'Web Development', value: 1 },
//   { label: 'Mobile Development', value: 2 },
//   { label: 'Data Science', value: 3 },
//   { label: 'Cloud Computing', value: 4 },
// ];

export default function CourseCategoryForm({
  form,
  category,
  onCategory,
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const categoryRef = useRef<HTMLInputElement | string>('');

  const handleSelect = (currentValue: string) => {
    // console.log(currentValue , "currentValue")
    const selectedOption = categories?.find(
      (option) => option.name === currentValue
    );
    if (selectedOption) {
      console.log('this is selectedOption', selectedOption);
      onCategory(selectedOption);

      // categoryRef.current.innerText = category?.name as string;
      form.setValue('category_id', selectedOption.id);
      form.setValue('category_name', selectedOption.name);
    }
    setOpen(false);
  };

  const handleClear = () => {
    onCategory(null);
    form.setValue('category_id', 0);
    form.setValue('category_name', '');
  };

  // console.log(
  //   'category name field >>>',
  //   form?.getValues('categoryName')
  // );
  const { categories } = useCategories();
  console.log(categories, 'cate4dfasl');

  return (
    <FormField
      control={form.control}
      name="category_name"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Category</FormLabel>

          <FormControl>
            <div className="relative">
              <Input
                // className=" border p-1 w-full h-full "
                {...field}
                ref={categoryRef}
                name="category_name"
                // placeholder="category"
                // value={field.value || ''}
                // value={categoryName}
                // value={category.name}
                onFocus={() => {
                  setOpen(true);
                }}
                onChange={(e) => {
                  if (e.target.value !== '') {
                    return;
                  }
                  onCategory(
                    categories?.find((el) => el.name.includes(e.target.value))
                  );

                  if (!open) {
                    setOpen(true);
                  }
                }}
              />

              {category && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-8 top-0 h-full px-2 py-0 hover:bg-transparent"
                  onClick={handleClear}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
              )}
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    role="combobox"
                    aria-expanded={open}
                    className="absolute right-0 top-0 h-full px-2 py-0 hover:bg-transparent"
                  >
                    <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto" align="end">
                  <Command>
                    <CommandInput value={search} onValueChange={setSearch} />
                    <CommandList>
                      {/* <CommandEmpty>{'emptyMessage'}</CommandEmpty> */}
                      <CommandGroup className="max-h-60 overflow-auto">
                        {categories
                          ?.filter((option) =>
                            option.name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          )
                          .map((option) => (
                            <CommandItem
                              key={option.id}
                              value={option.id}
                              onSelect={handleSelect}
                              className="flex items-center"
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  category === option.name
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {option.name}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
