'use client';

import * as React from 'react';
import {
  BookOpenCheckIcon,
  BookOpenIcon,
  Component,
  Frame,
  GraduationCapIcon,
  LayoutDashboard,
  Mail,
  Map,
  PieChart,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
// import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
// import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { TeamSwitcher } from './team-switcher';
import { Link } from 'react-router-dom';
import { useCategories } from '@/store/useCategories';
import { MyCourses } from './MyCourses';
import { AllCourseComponent } from './AllCoursesComponent';
import { DashboardComponentSideBar } from './DashboardComponentSidebar';

// This is sample data.


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
 const data = {
    teams: [
      {
        name: 'LMS Platform',
        logo: GraduationCapIcon,
        plan: 'Enterprise',
      },
    ],
    navMain: [
      {
        title: 'My Courses',
        component : MyCourses 
      
      },
      {
        title: 'All Courses',
        component : AllCourseComponent 
    
      },
      {
        title: 'Dashboards',
        component : DashboardComponentSideBar 
  
      },
    ],
    buttons: [
      {
        title: 'About',
        url: '#',
        icon: GraduationCapIcon,
      },
      {
        title: 'Contact Us',
        url: '#',
        icon: Mail,
      },
    ],
    projects: [
      {
        name: 'Design Engineering',
        url: '#',
        icon: Frame,
      },
      {
        name: 'Sales & Marketing',
        url: '#',
        icon: PieChart,
      },
      {
        name: 'Travel',
        url: '#',
        icon: Map,
      },
    ],
  }  
  const  { categories } = useCategories()
 

  return (
    <Sidebar
      collapsible="icon"
      side="left"
      {...props}
      className=" flex flex-col  items-center justify-between  h-full border-none hover:border-none focus:border-none focus:ring-0 "
    >
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} buttons={data.buttons} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser  />
      </SidebarFooter>
    </Sidebar>
  );
}
