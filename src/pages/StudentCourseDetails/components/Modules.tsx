import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Clock, Star } from 'lucide-react';
import { lesson } from '@/pages/studentCourse/types';

interface Module {
  title: string;
  duration: string;
  details?: { title: string; duration: string }[];
}

// const modules: Module[] = [
//   {
//     title: '01. Introduction to Public Speaking and Leadership',
//     duration: '40 min',
//     details: [
//       { title: 'Overview of public speaking', duration: '8 min' },
//       { title: 'Effective communication', duration: '15 min' },
//       { title: 'Personal leadership assessment', duration: '11 min' },
//       { title: 'Understanding audience dynamics', duration: '6 min' },
//     ],
//   },
//   { title: '02. Foundations of Public Speaking for adults', duration: '36 min' },
//   { title: '03. Creating clear and engaging messages', duration: '24 min' },
//   { title: '04. Mastering Non-Verbal Communication', duration: '55 min' },
//   { title: '05. Persuasion Techniques in Public Speaking', duration: '32 min' },
//   { title: '06. Advanced Speaking Techniques for Adults', duration: '18 min' },
// ];

const Modules = ({
  setLessonIndex,
  lessons,
  lessonIndex
}: {
  setLessonIndex: React.Dispatch<React.SetStateAction<number>>;
  lessons: lesson[];
  lessonIndex:number
}) => {
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const toggleModule = (index: number) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  console.log(lessons);
  return (
  

      <div className="space-y-2">
        {lessons
          ?.slice()
          .sort((a, b) => a.id - b.id)
          .map((lesson, index) => (
            <div
              key={index}
              style={{backgroundColor : lessonIndex === index ? "teal" : undefined}}
              className="rounded-lg border p-4"
              onClick={() => setLessonIndex(index)}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{lesson.title}</h3>
                {/* <span className="text-sm text-muted-foreground">{lesson}</span> */}
                <Button variant="ghost" onClick={() => toggleModule(index)} className=' hover:!bg-transparent'>
                  {expandedModule === index ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {lesson.lessonDetail && expandedModule === index && (
                <div className="mt-4 space-y-2">
                  {/* {lesson.lessonDetail.map((detail, ) => ( */}
                  <div className="flex items-center justify-between text-sm">
                    <span>{lesson.lessonDetail}</span>
                    {/* <span className="text-muted-foreground">{detail.duration}</span> */}
                  </div>
                  {/* ))} */}
                </div>
              )}
            </div>
          ))}
      </div>
  
  );
};

export default Modules;
