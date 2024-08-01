'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LockIcon, MailIcon, UserIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { GoogleOneTap, useSignUp } from '@clerk/nextjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { toast } from 'sonner';
import Link from 'next/link';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { routes } from '@/lib/routing';
import { Button } from '@/components/ui/button';
import { cn, errorToast } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';
import { AuthMotionContainer } from '../../auth-motion-container';
import { useOAuth } from '../../oauth/use-oauth';

type FormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Please enter a valid e-mail.',
    })
    .email(),
  password: z
    .string({
      required_error: 'Please enter a valid password.',
    })
    .min(8, {
      message: 'Password must be at least 8 characters.',
    }),
  fullName: z
    .string({
      required_error: 'Please enter a valid name.',
    })
    .refine(
      (value) => value.trim().split(/\s+/).length >= 2,
      'Full name must contain at least two words.',
    )
    .refine((value) => {
      const firstName = value.trim().split(/\s+/)[0];

      return firstName.length >= 2;
    }, `First name must be at least 2 characters long.`),
});

export function SignUpForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
  });

  const router = useRouter();

  const { isAuthenticatingWithOAuth, authenticateWithOAuth } = useOAuth();

  const { isLoaded: isClerkLoaded, signUp } = useSignUp();

  const [isSigningUp, setIsSigningUp] = useState(false);

  const isDisabled = !isClerkLoaded || isSigningUp || isAuthenticatingWithOAuth;

  const onSubmit = async ({ email, password, fullName }: FormValues) => {
    if (isDisabled) {
      return;
    }

    try {
      setIsSigningUp(true);

      await signUp.create({
        emailAddress: email,
        password,
        firstName: fullName.split(' ')[0],
        lastName: fullName.split(' ')[1],
      });

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      router.push(routes.auth.verify);
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        errorToast(error);
      }
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <>
      <AuthMotionContainer>
        <Form {...form}>
          <form onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}>
            <Card className="relative grid shadow dark:shadow-none">
              <CardHeader className="gap-1 text-center">
                <div className="flex flex-col items-center gap-6">
                  <Logo />

                  <div className="flex flex-col gap-1">
                    <CardTitle className="font-feature text-4xl font-bold tracking-tight">
                      Get started
                    </CardTitle>

                    <CardDescription>
                      Enter your details below to sign up.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="grid gap-5">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isDisabled}
                  loading={isAuthenticatingWithOAuth}
                  onClick={() => {
                    void authenticateWithOAuth('oauth_google');
                  }}
                >
                  <Icons.Google className="mr-2 h-4 w-4" />
                  Google
                </Button>

                <div className="flex items-center">
                  <span className="flex-1 border-t" />

                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 font-semibold text-muted-foreground">
                      Or continue with
                    </span>
                  </div>

                  <span className="flex-1 border-t" />
                </div>

                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isDisabled}
                            hasError={Boolean(fieldState.error)}
                            leftIcon={
                              <MailIcon className="w-4 text-muted-foreground" />
                            }
                            placeholder="Enter your e-mail address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isDisabled}
                            hasError={Boolean(fieldState.error)}
                            leftIcon={
                              <LockIcon className="w-4 text-muted-foreground" />
                            }
                            placeholder="Enter your password"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isDisabled}
                            hasError={Boolean(fieldState.error)}
                            leftIcon={
                              <UserIcon className="w-4 text-muted-foreground" />
                            }
                            placeholder="Enter your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>

              <CardFooter className="grid gap-6">
                <Button
                  className="w-full text-base font-bold"
                  disabled={isDisabled}
                  loading={isSigningUp}
                  type="submit"
                >
                  Sign Up
                </Button>

                <span className="mx-auto text-sm text-foreground">
                  Already have an account?{' '}
                  <Link
                    href={routes.auth.signIn}
                    aria-disabled={isDisabled}
                    className={cn(
                      isDisabled &&
                        'pointer-events-none opacity-50 transition-opacity',
                    )}
                  >
                    <u>Sign in</u>.
                  </Link>
                </span>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </AuthMotionContainer>

      <GoogleOneTap />
    </>
  );
}
