'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LockIcon, MailIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import { GoogleOneTap, useSignIn } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { useState } from 'react';
import { type Route as NextRoute } from 'next';
import { routes } from '@/lib/routing';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { cn, errorToast } from '@/lib/utils';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/ui/logo';
import { useOAuth } from '../../oauth/use-oauth';
import { AuthMotionContainer } from '../../auth-motion-container';

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
});

export function SignInForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
  });

  const router = useRouter();

  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get('redirect_url');

  const { isAuthenticatingWithOAuth, authenticateWithOAuth } = useOAuth();

  const { isLoaded: isClerkLoaded, signIn, setActive } = useSignIn();

  const [isSigningIn, setIsSigningIn] = useState(false);

  const isDisabled = !isClerkLoaded || isSigningIn || isAuthenticatingWithOAuth;

  const onSubmit = async ({ email, password }: FormValues) => {
    if (isDisabled) {
      return;
    }

    try {
      setIsSigningIn(true);

      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({
          session: signInAttempt.createdSessionId,
        });

        if (redirectUrl) {
          router.push(redirectUrl as NextRoute);
        }
      } else {
        toast.info(
          'You need to verify your e-mail address before you can sign in.',
        );
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        errorToast(error);
      }
    } finally {
      setIsSigningIn(false);
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
                      Welcome back
                    </CardTitle>

                    <CardDescription>
                      Enter your details below to sign in.
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
                        <div className="flex w-full items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          {/* <ForgotPasswordDialog /> */}
                        </div>
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
                </div>
              </CardContent>

              <CardFooter className="grid gap-6">
                <Button
                  type="submit"
                  disabled={isDisabled}
                  loading={isSigningIn}
                  className="w-full text-base font-semibold"
                >
                  Sign In
                </Button>

                <span className="mx-auto text-sm text-foreground">
                  No account?{' '}
                  <Link
                    href={routes.auth.signUp}
                    aria-disabled={isDisabled}
                    className={cn(
                      isDisabled &&
                        'pointer-events-none opacity-50 transition-opacity',
                    )}
                  >
                    <u>Sign up</u>.
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
