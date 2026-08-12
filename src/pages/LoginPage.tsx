import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Leaf, LogIn, ArrowRight, ShieldAlert, Lock, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  // If already logged in, redirect to /account
  React.useEffect(() => {
    if (user) {
      navigate('/account', { replace: true });
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data.email);
    navigate('/account');
  };

  return (
    <div className="bg-[#FAF8F5] text-[#241C15] py-16 px-4 sm:px-6 lg:px-12 min-h-[75vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#1A331E] text-[#8CAE92] flex items-center justify-center mx-auto shadow-md">
            <Leaf className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#1A331E]">Welcome Back</h1>
          <p className="text-xs text-stone-500 font-light">
            Sign in to view your orders, wishlist, and botanical rituals
          </p>
        </div>

        {/* Honest Demo Disclaimer Banner */}
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <span>
            <b>Demo Account Note:</b> This is a demo account system — no real password security yet.
          </span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 block">Email Address *</label>
            <div className="relative">
              <input
                type="email"
                placeholder="sara@example.co.uk"
                {...register('email')}
                className={`w-full pl-10 pr-3 py-3 text-xs rounded-xl border bg-[#FAF8F5] focus:bg-white focus:outline-none transition-all ${
                  errors.email ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-stone-200 focus:border-[#1A331E]'
                }`}
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            </div>
            {errors.email && (
              <span className="text-[11px] font-semibold text-red-600 block">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 block">Password *</label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                {...register('password')}
                className={`w-full pl-10 pr-3 py-3 text-xs rounded-xl border bg-[#FAF8F5] focus:bg-white focus:outline-none transition-all ${
                  errors.password ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-stone-200 focus:border-[#1A331E]'
                }`}
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            </div>
            {errors.password && (
              <span className="text-[11px] font-semibold text-red-600 block">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-full bg-[#1A331E] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#2D5233] transition-colors shadow-lg flex items-center justify-center gap-2 group"
          >
            <span>Log In to Account</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Register Link Footer */}
        <div className="pt-4 border-t border-stone-100 text-center text-xs text-stone-600">
          <span>New here? </span>
          <Link to="/register" className="font-bold text-[#1A331E] hover:underline">
            Create an account
          </Link>
        </div>

      </div>
    </div>
  );
};
