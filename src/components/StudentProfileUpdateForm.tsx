import { useIsMobile } from '@/hooks/use-mobile';
import React, { useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import {  CalendarIcon, Camera, User } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select';
import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '@/features/authentication/service/services';
import { Skeleton } from './ui/skeleton';
import { users } from '@/pages/studentCourse/types';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';
import { format } from 'path';

const StudentProfileUpdateForm = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState<Date>()
  const isMobile = useIsMobile();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<users>({
    queryKey: ['me', 'profile'],
    queryFn: fetchProfile,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (isLoading)
    return (
      <Card className="w-full max-w-3xl mx-auto shadow-md">
        <CardHeader className="space-y-2">
          <Skeleton className="h-8 w-[200px] mx-auto" />
          <Skeleton className="h-4 w-[300px] mx-auto" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Profile Image Skeleton */}
            <div className="flex flex-col items-center mb-6">
              <Skeleton className="h-24 w-24 rounded-full mb-4" />
              <Skeleton className="h-4 w-[180px]" />
            </div>

            {/* Form Fields Skeleton */}
            <div
              className={`grid ${
                isMobile ? 'grid-cols-1' : 'grid-cols-2'
              } gap-4`}
            >
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <div
              className={`grid ${
                isMobile ? 'grid-cols-1' : 'grid-cols-2'
              } gap-4`}
            >
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-[80px] w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    );
  return (
    <Card className="w-full max-w-3xl mx-auto shadow-md">
    <CardHeader className="space-y-1">
      <CardTitle className="text-2xl font-bold text-center">Update Profile</CardTitle>
      <CardDescription className="text-center">Update your personal information and preferences</CardDescription>
    </CardHeader>
    <CardContent>
      <form className="space-y-6">
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <Avatar className="w-24 h-24 border-2 border-primary/20">
              <AvatarImage src={profileImage || ""} />
              <AvatarFallback className="bg-muted">
                <User className="w-12 h-12 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 rounded-full"
              onClick={triggerFileInput}
            >
              <Camera className="h-4 w-4" />
            </Button>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
          </div>
          <p className="text-sm text-muted-foreground">Click the camera icon to upload a profile photo</p>
        </div>

        <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-4`}>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="johndoe" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john.doe@example.com" />
          </div>
        </div>

        <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-4`}>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !user?.dob && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
               { user.dob ? format(user.dob, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
              <DayPicker
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
                {/* <Calendar mode="single" selected={`${user?.dob}`} onSelect={setDate} initialFocus /> */}
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" placeholder="123 Main St, City, State, Zip" className="min-h-[80px]" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select>
            <SelectTrigger id="role">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="moderator">Moderator</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
    </CardContent>
    <CardFooter>
      <Button className="w-full">Save Changes</Button>
    </CardFooter>
  </Card>
  );
};

export default StudentProfileUpdateForm;
