import { Button } from '@/components/ui/button';
import LoaderButton from '@/components/ui/loaderButton';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { courseDummyCategory } from '@/constant/dummy-data';
import { fetchCategories } from '@/features/authentication/service/services';
import { useQuery } from '@tanstack/react-query';

interface Props {
  categoryId: number;
  setCategoryId: (id: number) => void;
}
const arr = Array.from({length : 5 }).map((_ , index) => index + 1)
export default function StudentHeader({ categoryId, setCategoryId }: Props) {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryFn: fetchCategories,
    queryKey: ['categories'],
  });

console.log(arr)

  return (
    <header className="h-20 w-full flex justify-between items-center space-x-2 ">
      <div className="hidden md:block md:text-xl font-bold mb-2">
        My Courses
      </div>
      <div className="flex items-center gap-1 ">
        <Button
          variant={`${categoryId === 0 ? 'default' : 'outline'}`}
          onClick={() => {
            setCategoryId(0);
          }}
          className="mb-2"
        >
          All Courses
        </Button>
        <ScrollArea className="max-w-[180px] md:max-w-md whitespace-nowrap rounded-md pb-1">
          <div className="flex flex-row gap-1  justify-between items-center overflow-x-auto w-auto p-1 pb-2">
          {isLoading && arr.map(index => <LoaderButton key={index} />) }
            {!isLoading && !isError && categories!?.map((category) => (
              <Button
                variant={`${
                  categoryId === category.id ? 'default' : 'outline'
                }`}
     
                key={category.id}
                onClick={() => {
                  setCategoryId(category.id);
                }}
              >
                {category.name}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </header>
  );
}
