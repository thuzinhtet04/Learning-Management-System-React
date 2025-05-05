'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';

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
import React, { useId } from 'react';
import { useCategories } from '@/store/useCategories';
import { randomBytes } from 'crypto';

type navMainProps = {
     
  items:  {
    title: string,
    component : React.FC
  }[];

  buttons: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
};


export function NavMain({ items, buttons }: navMainProps) {
  const { setRole } = useAuthStore();
  const { categories } = useCategories()

  console.log(items , 'items')
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform </SidebarGroupLabel>
      <SidebarMenu className="space-y-5">
        {items.map((item  , index) => ( < item.component key={index} /> )
          // <Collapsible
          //   key={item.title}
          //   asChild
          //   defaultOpen={item.isActive}
          //   className="group/collapsible"
          // >
          //   <SidebarMenuItem>
          //     <CollapsibleTrigger asChild>
          //       <SidebarMenuButton
          //         tooltip={item.title}
          //         size={'lg'}
          //         className="[&>svg]:size-6 group-data-[collapsible=icon]:[&>svg]:ml-1"
          //       >
          //         {item.icon && <item.icon />} helo
          //         <span className="mt-1">{item.title}</span>
          //         {item.items && <ChevronRight className=" ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />}
          //       </SidebarMenuButton>
          //     </CollapsibleTrigger>
          //     <CollapsibleContent>
          //       <SidebarMenuSub className="space-y-5 ">
          //         {item.items?.map((subItem) => (
          //             <SidebarMenuSubItem key={subItem.title} className="mt-5">
          //             <SidebarMenuSubButton asChild>
          //               <Link to={`${subItem.url}`}>
          //                 <span>{subItem.title}</span>
          //                 </Link>
          //             </SidebarMenuSubButton>
          //           </SidebarMenuSubItem>
          //         ))}
          //         {/* for dashboard category buttons */}
          //         {item.dashboardCategory?.map((subItem) => (
          //           <SidebarMenuSubItem key={subItem.title} className="mt-5">
          //             <SidebarMenuSubButton asChild>
          //               <button
          //                 onClick={() => {
          //                   if (
          //                     subItem.url === 'student' ||
          //                     subItem.url === 'instructor' ||
          //                     subItem.url === 'admin'
          //                   ) {
          //                     setRole(subItem.url);
          //                   } else {
          //                     console.error(`Invalid role: ${subItem.url}`);
          //                   }
          //                 }}
          //               >
          //                 <span>{subItem.title}</span>
          //               </button>
          //             </SidebarMenuSubButton>
          //           </SidebarMenuSubItem>
          //         ))}
          //       </SidebarMenuSub>
          //     </CollapsibleContent>
          //   </SidebarMenuItem>
          // </Collapsible>
        )}
        {/* about and contact us */}
        {/* {buttons.map((button,index) => (
          <SidebarMenuButton
            asChild
            key={index}
            tooltip={button.title}
            size={'lg'}
            className="[&>svg]:size-6 group-data-[collapsible=icon]:[&>svg]:ml-1"
          >
            <Link to={`${button.url}`}>
              {button.icon && <button.icon size={24} />}
              <span className="mt-1">{button.title}</span>
            </Link>
          </SidebarMenuButton>
        ))} */}
      </SidebarMenu>
    </SidebarGroup>
  );
}
