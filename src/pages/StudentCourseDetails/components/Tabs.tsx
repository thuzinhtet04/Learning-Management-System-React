import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

const Tabs = () => {
  //! nned to check lesson response and integrate with the tabs and lesons list
  return (
    <div className="flex items-center gap-4 border-b">
      <Button
        variant="ghost"
        className="text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary"
      >
        Description
      </Button>
      <div className="ml-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
          
            const url = window.location.href; // or use any custom string
            navigator.clipboard
              .writeText(url)
              .then(() => {
                toast.success('URL copied to clipboard!');
                console.log('URL copied to clipboard!');
              })
              .catch((err) => {
                toast.error('Failed to copy: ', err);
              });
          }}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share lesson
        </Button>
      </div>
    </div>
  );
};

export default Tabs;
