import React from 'react';

const Breadcrumb = ({courseName , lessonTitle} : { courseName : string , lessonTitle : string}) => {
  return (
    <div className="px-2 py-3 text-sm text-gray-700">
      <div className="flex items-center gap-2">
        <span className="font-extrabold">My courses</span> / 
        <span className="font-extrabold">{courseName}</span> / 
        <span className="font-extrabold">{lessonTitle}</span>
      </div>
    </div>
  );
};

export default Breadcrumb;