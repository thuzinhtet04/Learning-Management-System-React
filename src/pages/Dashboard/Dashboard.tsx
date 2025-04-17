import React from 'react';
import StudentDashboard from '../StudentDashboard/StudentDashboard';
import InstructorDashboard from '../InstructorDashboard/InstructorDashboard';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import { useAuthStore } from '@/store/authStore';
import { Navigate } from 'react-router-dom';

type UserRole = 'student' | 'admin' | 'instructor';
interface DashboardProps {
  userRole?: UserRole;
}

const dashboardComponents: Record<UserRole, React.ReactNode> = {
  student: <StudentDashboard />,
  instructor : <InstructorDashboard />,
  admin: <AdminDashboard />,
};

const Dashboard: React.FC<DashboardProps> = () => {
  const { authUser } = useAuthStore();
  



  if (authUser == null) {
    <Navigate to="/login" /> ;
  }

  if (!authUser?.data) {
    return <h1 className="text-center text-4xl mt-10 text-red-500">Please log in</h1>;
  }



  return (
    dashboardComponents[authUser.data.roleName as UserRole] ?? (
      <h1 className="text-center mt-10 text-red-500">Invalid Role</h1>
    )
  );
};

export default Dashboard;
