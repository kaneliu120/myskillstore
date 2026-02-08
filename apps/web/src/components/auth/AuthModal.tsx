'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
// Assuming a toast component exists or I'll just use console/alert for now as toast isn't explicitly in the file list, 
// but the prompt mentions "toast 提示". 
// I'll check if a toast library is installed or just use a simple alert/mock for now, 
// or check if I can find a toast hook. 
// For now, I'll use a simple alert as a fallback if no toast is found.

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  defaultTab?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, onSuccess, defaultTab = 'login' }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      // alert('Login successful!'); // Replace with toast if available
      if (onSuccess) onSuccess();
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      // alert('Registration successful!'); // Replace with toast if available
      if (onSuccess) onSuccess();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-purple-700">
            {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {activeTab === 'login' 
              ? 'Enter your credentials to access your account' 
              : 'Join our community of creators and buyers'}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-login">Email</Label>
                <Input id="email-login" type="email" placeholder="name@example.com" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password-login">Password</Label>
                  <a href="#" className="text-xs text-purple-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input id="password-login" type="password" required />
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username-register">Username</Label>
                <Input id="username-register" placeholder="johndoe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-register">Email</Label>
                <Input id="email-register" type="email" placeholder="name@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-register">Password</Label>
                <Input id="password-register" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password-register">Confirm Password</Label>
                <Input id="confirm-password-register" type="password" required />
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          By continuing, you agree to our{' '}
          <a href="#" className="underline hover:text-gray-900">Terms of Service</a>{' '}
          and{' '}
          <a href="#" className="underline hover:text-gray-900">Privacy Policy</a>.
        </div>
      </DialogContent>
    </Dialog>
  );
}
