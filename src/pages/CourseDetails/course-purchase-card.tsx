import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/utils';
import { Badge } from '@/components/ui/badge';
import { Clock, Globe, GraduationCap } from 'lucide-react';
import { courseDetails } from '../studentCourse/types';
import { useNavigate } from 'react-router-dom';

type Props = {
  courseData: courseDetails;
};

export default function CoursePurchaseCard({ courseData }: Props) {
  const nav = useNavigate();
  // Calculate discount percentage
  const discountPercentage = Math.round(
    ((courseData?.original_price - courseData?.current_price) /
      courseData?.original_price) *
      100
  );
  const handleEnrollNOAuth = () => {
    nav('/login');  
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        {/* <div className="flex flex-col items-center gap-2"> */}
        <div className="flex gap-2 justify-between items-end">
          <div className="flex flex-col items-end">
            <div>
              {courseData?.original_price > courseData?.current_price && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(courseData?.original_price)}
                </span>
              )}
            </div>
            <span className="text-3xl font-bold">
              {formatPrice(courseData?.current_price)}
            </span>
          </div>
          <div className="mb-3">
            {courseData?.original_price > courseData?.current_price && (
              <Badge className="ml-auto">{discountPercentage}% off</Badge>
            )}
          </div>
        </div>

        <Button
          onClick={() => {
            handleEnrollNOAuth();
          }}
          className="w-full"
          size="lg"
        >
          Enroll Now
        </Button>

        <div className="text-sm text-muted-foreground space-y-2">
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Full lifetime access</span>
          </p>
          <p className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>Access on all devices</span>
          </p>
          <p className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span>Certificate of completion</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
