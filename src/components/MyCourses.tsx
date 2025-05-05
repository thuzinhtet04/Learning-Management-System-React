'use client';

import { BookOpenCheckIcon, ChevronRight, type LucideIcon } from 'lucide-react';

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

export function MyCourses() {
  const { setRole } = useAuthStore();
  const { categories } = useCategories();
  return (
    <Collapsible asChild defaultOpen={true} className="group/collapsible">
      <Link to="/">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              tooltip="My Courses"
              size={'lg'}
              className="[&>svg]:size-6 group-data-[collapsible=icon]:[&>svg]:ml-1"
            >
              <BookOpenCheckIcon />
              <span className="mt-1">My Courses</span>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {/* <SidebarMenuSub className="space-y-5 ">
            {item.items?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title} className="mt-5">
                <SidebarMenuSubButton asChild>
                  <Link to={`${subItem.url}`}>
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
    
          </SidebarMenuSub> */}
          </CollapsibleContent>
        </SidebarMenuItem>
      </Link>
    </Collapsible>
  );
}
