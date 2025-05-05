'use client';

import { BookOpenIcon, ChevronRight, type LucideIcon } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import React from 'react';
import { useCategories } from '@/store/useCategories';
import { createGzip } from 'zlib';

type navMainProps = {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
    dashboardCategory?: {
      title: string;
      url: string;
    }[];
  }[];
  buttons: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
};

export function AllCourseComponent() {
  const { setRole } = useAuthStore();
  const { categories } = useCategories();

  // const items = [
  //   {
  //     name: 'Computer Science',
  //     url: '#',
  //   },
  //   {
  //     title: 'History',
  //     url: '#',
  //   },
  //   {
  //     title: 'Web Development',
  //     url: '#',
  //   },
  //   {
  //     title: 'Software Engineer',
  //     url: '#',
  //   },
  // ]

  return (
    <Collapsible asChild defaultOpen={true} className="group/collapsible">
      <Link to="/courses">
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="All Courses"
            size={'lg'}
            className="[&>svg]:size-6 group-data-[collapsible=icon]:[&>svg]:ml-1"
          >
            <BookOpenIcon />
            <span className="mt-1">All Courses</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </Link>
    </Collapsible>
  );
}
