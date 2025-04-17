import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { RadioGroup, RadioGroupItem } from '';
import Footer from '@/Layouts/Footer';
import Figure from '@/assets/undraw_hello_ccwj.svg';
import { useTheme } from '@/provider/theme-provide';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  EyeIcon,
  EyeOff,
  LockKeyhole,
  Mail,
  Loader2,
  User,
} from 'lucide-react';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { RadioGroup } from '@radix-ui/react-dropdown-menu';
import { API_BASE_URL } from '@/config/serverApiConfig';
import { RegisterUserFn } from '@/features/authentication/service/authApi';

const registerSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    role: z
      .string()
      .refine((val) => val === 'instructor' || val === 'student', {
        message: 'Please select a role',
        path: ['role'],
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export   type FormData = z.infer<typeof registerSchema>;
 
const Register = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate: registerUser, isPending } = useMutation({

    mutationFn: RegisterUserFn,
    onSuccess: () => {
      toast.success('Registration successful! Please login.');
      navigate('/login');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Registration failed. Please try again.');
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
    registerUser(data);
  };

  return (
    <div className="grid md:grid-cols-2  md:h-[80vh] justify-center items-center border-t-2 border-gray-200 md:p-4">
      {/* left side image & text */}
      <div className="flex flex-col items-center justify-center space-y-3">
        <img src={Figure} alt="" className="w-60" />
        <div className="max-w-96">
          <h2 className="text-2xl font-bold text-center">
            Welcome to Your Ultimate Learning Companion{' '}
            <span className="font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              LMS Platform
            </span>
          </h2>
          <p className="text-center mt-2 text-sm text-gray-400">
            Discover Knowledge, Stay on Track, and Achieve Your Dreams with Ease
          </p>
        </div>
      </div>

      {/* form box */}
      <div className="flex justify-center md:mt-0 mt-10">
        <div
          className={`md:min-w-[450px] max-w-[600px] ${
            theme === 'light' ? 'bg-white' : ''
          } border flex flex-col space-y-5 border-gray-200 p-10 rounded-xl shadow-lg`}
        >
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Create Account
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {/* Username field */}
              <div>
                <label htmlFor="email" className="text-sm text-gray-400">
                  Username
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    className="mt-1 h-10 ps-12 text-sm"
                    {...register('username')}
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <User className="w-5" />
                  </span>
                </div>
                {errors.username && (
                  <p className="text-sm mt-1 text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>
              {/* email field */}
              <div>
                <label htmlFor="email" className="text-sm text-gray-400">
                  Email
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter your email"
                    className="mt-1 h-10 ps-12 text-sm"
                    {...register('email')}
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail className="w-5" />
                  </span>
                </div>
                {errors.email && (
                  <p className="text-sm mt-1 text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              {/* password field */}
              <div>
                <label htmlFor="password" className="text-sm text-gray-400">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="mt-1 h-10 ps-12 text-sm"
                    {...register('password')}
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <LockKeyhole className="w-5" />
                  </span>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 ">
                    {showPassword ? (
                      <EyeIcon
                        className="w-5"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <EyeOff
                        className="w-5"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-sm mt-1 text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* confirm password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-sm text-gray-400"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    className="mt-1 h-10 ps-12 text-sm"
                    {...register('confirmPassword')}
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <LockKeyhole className="w-5" />
                  </span>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showConfirmPassword ? (
                      <EyeIcon
                        className="w-5 cursor-pointer"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    ) : (
                      <EyeOff
                        className="w-5 cursor-pointer"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    )}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm mt-1 text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              {/* Role Choosing */}
              <div className="flex items-center mb-4">
                <input
                  id="role-student"
                  type="radio"
              
                  value="student"
                  {...register("role")}
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  checked
                />
                <label
                  htmlFor="role-student"
                  className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Student
                </label>
              </div>{' '}
              <div className="flex items-center mb-4">
                <input
                  id="instructor"
                  type="radio"
                  required
                  {...register("role")}
              
                  value="instructor"
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="instructor"
                  className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Instructor
                </label>
              </div>
              {errors.role && (
                <p className="text-sm mt-1 text-red-500">
                  {errors.role.message}
                </p>
              )}
              <Button
                type="submit"
                className="w-full h-10 mt-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </div>
          </form>
          <Link to={'/login'}>
            <p className="text-center">
              Do you have an account?{' '}
              <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent cursor-pointer">
                Sign in
              </span>
            </p>
          </Link>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Register;
