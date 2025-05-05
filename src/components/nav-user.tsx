'use client';

import {
  BadgeCheck,
  CreditCard,
  LogIn,
  LogOut,
  LucideLogIn,
  ChevronsUpDown,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@/provider/theme-provide';
import { useAuthStore } from '@/store/authStore';

export function NavUser() {
  const { isMobile } = useSidebar();
  const { theme } = useTheme();
  const { authUser, logout } = useAuthStore();
  const nav = useNavigate();

  const data = authUser?.data;
  const isLoggedIn = !!data; // Check if the user is logged in

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={`${
                theme == 'light'
                  ? 'hover:bg-gray-600 data-[state=open]:bg-gray-300'
                  : 'data-[state=open]:bg-sidebar-accent'
              } data-[state=open]:text-sidebar-accent-foreground`}
            >
              <Avatar
                className={`h-8 w-8 rounded-lg" ${
                  theme == 'light' ? 'text-black' : 'text-white'
                }`}
              >
                <AvatarImage
                  width={20}
                  height={20}
                  src={data?.profile_photo}
                  alt={data?.username}
                />
                <AvatarFallback className="rounded-lg">
                  {data?.username?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {data?.username} Need to Login
                </span>
                <span className="truncate text-xs">{data?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal cursor-pointer">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage alt={data?.username} />
                  <AvatarFallback className="rounded-lg">
                    {data?.username?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {data?.username}
                  </span>
                  <span className="truncate text-xs">{data?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <CreditCard />
                Billing
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            {/* Conditionally render Logout or Login/Register based on auth state */}
            {isLoggedIn && (
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  nav('/login');
                  logout();
                }}
              >
                <LogOut />
                Log out
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
