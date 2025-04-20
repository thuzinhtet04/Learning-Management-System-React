import React from 'react';
import StudentDashboard from '../StudentDashboard/StudentDashboard';
import InstructorDashboard from '../InstructorDashboard/InstructorDashboard';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import { useAuthStore } from '@/store/authStore';
import { Navigate } from 'react-router-dom';
import NoAuthDashboard from '../NoAuthDashboard/NoAuthDashboard';

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
  



  





  return (
    dashboardComponents[authUser?.data.roleName as UserRole] ?? <NoAuthDashboard />
    )


};

export default Dashboard;
