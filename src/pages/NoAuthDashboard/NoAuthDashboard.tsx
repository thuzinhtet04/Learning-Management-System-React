import React, { useState } from 'react'
import StudentHeader from '../StudentDashboard/StudentHeader'
import StudentCourses from '../studentCourse/StudentCourses'
import IndexCourses from '../studentCourse/IndexCourses';

const NoAuthDashboard = () => {
    
      const [categoryId, setCategoryId] = useState(0);
  return (
      <main>
        <h1 className=' text-xl bg-yellow-300 p-2  text-center text-black'>You are in Guest Mode . Please Login <a className='text-blue text-blue-500 underline ' href='/login'>here</a></h1>
        <StudentHeader setCategoryId={setCategoryId} categoryId={categoryId} />
        <IndexCourses categoryId={categoryId} />
        {/* <StudentCourses categoryId={categoryId} /> */}
      </main>
  )
}

export default NoAuthDashboard