'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const FormSchema = z.object({
  location: z.string().min(2, {
    message: 'Location must be at least 2 characters.',
  }),
});

interface LocationSearchFormProps {
  onSearch: (location: string) => void;
  isSearching?: boolean;
}

export default function LocationSearchForm({ onSearch, isSearching }: LocationSearchFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      location: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    onSearch(data.location);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 items-end w-full max-w-md">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input type="text" placeholder="E.g., London, New York, Tokyo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSearching} className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Search className="mr-2 h-4 w-4" /> {isSearching ? 'Searching...' : 'Search'}
        </Button>
      </form>
    </Form>
  );
}
