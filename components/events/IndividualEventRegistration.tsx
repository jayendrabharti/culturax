"use client";

import { Event } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SessionWithProfile } from "@/types/auth";
import {
  registerForIndividualEvent,
  IndividualRegistrationData,
  checkEmailsAlreadyRegistered,
} from "@/actions/registration";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const individualRegistrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  year: z.string().optional(),
  course: z.string().optional(),
});

export function IndividualEventRegistration({
  event,
  session,
}: {
  event: Event;
  session: SessionWithProfile;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<IndividualRegistrationData>({
    resolver: zodResolver(individualRegistrationSchema),
    defaultValues: {
      name: session?.user?.profile?.name || "",
      email: session?.user?.profile?.email || "",
      phone: session?.user?.profile?.phone || "",
      year: session?.user?.profile?.year || "",
      course: session?.user?.profile?.course || "",
    },
  });

  const onSubmit = async (data: IndividualRegistrationData) => {
    setIsSubmitting(true);
    try {
      // Check if email is already registered
      const emailCheckResult = await checkEmailsAlreadyRegistered(event.id, [
        data.email,
      ]);

      if (emailCheckResult.errorMessage) {
        toast.error("Error checking email availability");
        return;
      }

      if (emailCheckResult.data && emailCheckResult.data.length > 0) {
        const existingParticipant = emailCheckResult.data[0];
        if (existingParticipant.team) {
          toast.error(
            `Email ${data.email} is already registered in team "${existingParticipant.team.name}" for this event`
          );
        } else {
          toast.error(
            `Email ${data.email} is already registered for this event`
          );
        }
        return;
      }

      const result = await registerForIndividualEvent(event.id, data);

      if (result.errorMessage) {
        toast.error(result.errorMessage);
      } else {
        toast.success("Registration successful!");
        router.push(`/events/${event.id}/register/pay`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">
          Individual Event Registration
        </h2>
        <p className="text-muted-foreground">
          Register for {event.name}. Please fill out the form below.
        </p>
        {event.registrationFee > 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            Registration Fee: ₹{event.registrationFee}
          </p>
        )}
        <p className="text-sm text-orange-600 font-medium mt-2">
          ⚠️ You can only register once per event with each email address.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year of Study</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 1st Year, 2nd Year" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Computer Science, Mechanical"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register for Event"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
