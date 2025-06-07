
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { MapPinned, Route as RouteIconLucide, CalendarIcon, Loader2 } from 'lucide-react';
import { PlanTripInputSchema, type PlanTripInput } from '@/ai/schemas/trip-schemas';
import { planTrip, type PlanTripOutput } from '@/ai/flows/plan-trip-flow';
import { useState } from 'react';
import TripPlanDisplay from './TripPlanDisplay';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { z } from 'zod'; // Added missing import

// Define a schema for the form's internal state, using Date for travelDate
const FormSchemaInternal = PlanTripInputSchema.extend({
  travelDate: z.date().optional(), // Internally, travelDate will be a Date object or undefined
});
type PlanTripFormInternalData = z.infer<typeof FormSchemaInternal>;


export default function TripPlannerForm() {
  const [tripPlan, setTripPlan] = useState<PlanTripOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<PlanTripFormInternalData>({
    resolver: zodResolver(FormSchemaInternal),
    defaultValues: {
      origin: '',
      destination: '',
      travelDate: undefined,
    },
  });

  async function onSubmit(data: PlanTripFormInternalData) {
    setIsLoading(true);
    setError(null);
    setTripPlan(null);

    // Convert internal form data (with Date object) to the AI flow input type (with string date)
    const submissionData: PlanTripInput = {
      origin: data.origin,
      destination: data.destination,
      travelDate: data.travelDate ? format(data.travelDate, "yyyy-MM-dd") : undefined,
    };

    try {
      const result = await planTrip(submissionData);
      setTripPlan(result);
    } catch (e: any) {
      setError(e.message || 'Failed to generate trip plan. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full shadow-lg border border-border">
      <CardHeader>
        <CardTitle className="font-headline flex items-center text-2xl">
          <RouteIconLucide className="mr-2 h-7 w-7 text-primary" />
          AI Trip Planner
        </CardTitle>
        <CardDescription>Plan your journey with AI-powered route and weather insights.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><MapPinned className="mr-1.5 h-4 w-4 text-muted-foreground" />Origin</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="E.g., Mumbai" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><MapPinned className="mr-1.5 h-4 w-4 text-muted-foreground" />Destination</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="E.g., Pune" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="travelDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-center"><CalendarIcon className="mr-1.5 h-4 w-4 text-muted-foreground" />Travel Date (Optional)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => field.onChange(date)}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0)) // Disable past dates
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-6 text-base">
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <RouteIconLucide className="mr-2 h-5 w-5" />
              )}
              {isLoading ? 'Planning Your Trip...' : 'Plan My Trip'}
            </Button>
          </form>
        </Form>

        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {tripPlan && !isLoading && (
          <TripPlanDisplay plan={tripPlan} />
        )}
      </CardContent>
    </Card>
  );
}
