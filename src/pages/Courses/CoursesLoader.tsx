import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import DiamondIcon from '../studentCourse/diamond-icon';

const  CoursesLoader = ({count} : {count : number})  => {
  return (
    <div className="grid md:grid-cols-3 gap-4">
    {Array.from({ length: count }).map((_, index) => (
      <Card
        key={index}
        className="animate-pulse bg-gray-100 flex flex-col rounded-[30px] border-[#000] border-2"
      >
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="flex-grow">
            <div className="w-[80%]  h-14 bg-yellow-300 rounded-[12px]" />
          </CardTitle>
          <div className="flex">
            <DiamondIcon level="beginner" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-0 pt-6">
          <div className="w-3/4 h-5 bg-gray-300 rounded-md" />
          <div className="space-y-2">
            <div className="flex flex-row justify-between items-center">
              <div className="w-20 h-4 bg-gray-300 rounded" />
              <div className="w-16 h-4 bg-gray-300 rounded" />
            </div>
            <div className="h-2 bg-gray-300 rounded-full w-full" />
          </div>
        </CardContent>

        <CardFooter className="flex items-end flex-grow  justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            <div className="w-24 h-4 bg-gray-300 rounded" />
          </div>
          <div className="w-20 h-8 bg-orange-600  rounded-lg hover:bg-orange-700" />
        </CardFooter>
      </Card>
    ))}
  </div>
  )
}

export default CoursesLoader