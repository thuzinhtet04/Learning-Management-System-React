import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@/services';

interface Props {
  onCategoryId: (categoryId: number) => void;
  category : number
}

export default function ExploreNavigationMenu({ onCategoryId , category }: Props) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['allCategories'],
    queryFn: getAllCategories,
    staleTime: 60 * 1000,
  });

  if (isError) return <div>Something Wrong</div>;
  if (!data) return null;

  const categories = [
    {
      id: 0,
      name: 'All',
      createdAt: '2025-03-06T05:43:18.035Z',
      updatedAt: '2025-03-06T05:43:18.035Z',
    },
    ...data,
  ];
  
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger disabled={isLoading}>
            {isLoading && 'loading...' }
            { data && `${categories.find( el => el.id === category)?.name}` }

          </NavigationMenuTrigger>
          <NavigationMenuContent className="">
            <ScrollArea className="  w-48 rounded-md border max-h-[400px]">
              {/* <ScrollArea className="h-72 w-48 rounded-md border"> */}
              <ul className="max-h-[400px] overflow-y-auto overflow-x-hidden ">
                {categories.map((data) => (
                  <li key={data.id}>
                    <NavigationMenuLink
                      onClick={() => {
                        onCategoryId(data.id);
                      }}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground w-[200px]"
                    >
                      {data.name}
                    </NavigationMenuLink>
                  </li>
                ))}
                <ScrollBar />
              </ul>

              {/* <ScrollBar /> */}
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
