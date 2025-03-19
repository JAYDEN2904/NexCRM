import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(
        values.email
      );

      if (error) {
        throw error;
      }

      setSubmitted(true);
      toast.success('Password reset instructions sent to your email');
    } catch (error) {
      toast.error('Failed to send reset instructions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="container relative flex min-h-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Check your email
            </h1>
            <p className="text-sm text-muted-foreground">
              We've sent you instructions to reset your password.
            </p>
          </div>
          <Button asChild>
            <Link to="/login">Back to Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Forgot your password?
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and we'll send you instructions to reset it
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Send Instructions
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          Remember your password?{' '}
          <Link
            to="/login"
            className="text-primary underline underline-offset-4 hover:text-primary/90"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}