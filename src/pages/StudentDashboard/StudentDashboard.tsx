import StudentHeader from './StudentHeader';

import StudentCourses from '../studentCourse/StudentCourses';
import { useState } from 'react';

const StudentDashboard = () => {
  const [categoryId, setCategoryId] = useState(0);

  return (
    <main>
      <StudentHeader setCategoryId={setCategoryId} categoryId={categoryId} />
      <StudentCourses categoryId={categoryId} />
    </main>
  );
};

export default StudentDashboard;
