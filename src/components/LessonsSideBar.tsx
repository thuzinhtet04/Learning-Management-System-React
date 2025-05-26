'use client';

import { BookOpenCheckIcon, ChevronRight, List, type LucideIcon } from 'lucide-react';

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

export function LessonsSideBar() {
  return (
    <Collapsible asChild defaultOpen={true} className="group/collapsible">
      <Link to="/lessons">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              tooltip="Lessons"
              size={'lg'}
              className="[&>svg]:size-6 group-data-[collapsible=icon]:[&>svg]:ml-1"
            >
              <List />
              <span className="mt-1">Lessons</span>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          
        </SidebarMenuItem>
      </Link>
    </Collapsible>
  );
}
