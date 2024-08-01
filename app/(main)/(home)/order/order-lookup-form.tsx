'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { routes } from '@/lib/routing';
import { MotionDiv } from '@/lib/motion';

const FormSchema = z.object({
  orderId: z.string().min(36, {
    message: 'Order ID must be at least 36 characters.',
  }),
});

export function OrderLookupForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      orderId: 'c411ca33-53dd-4d4f-b959-6c6dffcc88e5',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    router.push(`${routes.order}/${data.orderId}`);
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex w-1/2 md:w-1/3"
    >
      <Form {...form}>
        <form
          onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
          className="flex w-full flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="orderId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order ID</FormLabel>

                <FormControl>
                  <Input placeholder="Enter order ID..." {...field} />
                </FormControl>

                <FormDescription>
                  Please provide the ID of the order to look up.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Search</Button>
        </form>
      </Form>
    </MotionDiv>
  );
}
