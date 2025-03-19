import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const ForgotPassword: FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement actual password reset logic here
      // For now, we'll simulate a successful email send
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEmailSent(true);
      
      toast({
        title: 'Success',
        description: 'Password reset instructions have been sent to your email.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="space-y-4 text-center">
        <h2 className="text-lg font-medium">Check your email</h2>
        <p className="text-sm text-muted-foreground">
          We have sent you a password reset link. Please check your email.
        </p>
        <Button asChild className="w-full">
          <Link to="/login">Back to login</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          required
          disabled={isLoading}
        />
      </div>
      <div className="flex items-center justify-between">
        <Link to="/login" className="text-sm text-primary hover:underline">
          Back to login
        </Link>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Sending reset link...' : 'Send reset link'}
      </Button>
    </form>
  );
};

export default ForgotPassword; 