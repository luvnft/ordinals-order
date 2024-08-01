'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSignUp } from '@clerk/nextjs';
import { useState } from 'react';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { toast } from 'sonner';
import Link from 'next/link';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import { routes } from '@/lib/routing';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { cn, errorToast } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';
import { AuthMotionContainer } from '../../auth-motion-container';

type FormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  code: z.string().min(6, {
    message: 'Your one-time code must be 6 characters.',
  }),
});

export function VerifyForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
  });

  const { isLoaded: isClerkLoaded, signUp, setActive } = useSignUp();

  const [isVerifying, setIsVerifying] = useState(false);

  const isDisabled = !isClerkLoaded || isVerifying;

  const onSubmit = async ({ code }: FormValues) => {
    if (isDisabled) {
      return;
    }

    try {
      setIsVerifying(true);

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({
          session: completeSignUp.createdSessionId,
        });
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        error.errors.forEach((err) => {
          toast.error(err.longMessage);
        });
      } else {
        errorToast(error);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <AuthMotionContainer>
      <Form {...form}>
        <form onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}>
          <Card className="relative grid shadow dark:shadow-none">
            <CardHeader className="gap-1 text-center">
              <div className="flex flex-col items-center gap-6">
                <Logo />

                <div className="flex flex-col gap-1">
                  <CardTitle className="font-feature text-4xl font-bold tracking-tight">
                    Verify
                  </CardTitle>

                  <CardDescription>
                    We need to check that you are a real person.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP disabled={isDisabled} maxLength={6} {...field}>
                        <InputOTPGroup className="h-[64px] w-full">
                          <InputOTPSlot
                            index={0}
                            className="h-full flex-1 text-lg"
                          />
                          <InputOTPSlot
                            index={1}
                            className="h-full flex-1 text-lg"
                          />
                          <InputOTPSlot
                            index={2}
                            className="h-full flex-1 text-lg"
                          />
                          <InputOTPSlot
                            index={3}
                            className="h-full flex-1 text-lg"
                          />
                          <InputOTPSlot
                            index={4}
                            className="h-full flex-1 text-lg"
                          />
                          <InputOTPSlot
                            index={5}
                            className="h-full flex-1 text-lg"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>

                    <FormDescription className="text-center">
                      Please enter the one-time code sent to your email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="grid gap-6">
              <Button
                className="w-full text-base font-bold"
                disabled={isDisabled}
                loading={isVerifying}
                type="submit"
              >
                Verify
              </Button>

              <span className="mx-auto text-sm text-foreground">
                Need to try again?{' '}
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
  );
}
