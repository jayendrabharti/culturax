"use client";

import { Event } from "@prisma/client";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { SessionWithProfile } from "@/types/auth";
import {
  registerForTeamEvent,
  TeamRegistrationData,
  checkEmailsAlreadyRegistered,
  getEventDetails,
} from "@/actions/registration";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon, Trash2Icon } from "lucide-react";

const participantSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  year: z.string().optional(),
  course: z.string().optional(),
});

const teamRegistrationSchema = z.object({
  teamName: z.string().min(2, "Team name must be at least 2 characters"),
  teamDescription: z.string().optional(),
  participants: z
    .array(participantSchema)
    .min(1, "At least one participant is required"),
});

export function TeamEventRegistration({
  event,
  session,
}: {
  event: Event;
  session: SessionWithProfile;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<TeamRegistrationData>({
    resolver: zodResolver(teamRegistrationSchema),
    defaultValues: {
      teamName: "",
      teamDescription: "",
      participants: [
        {
          name: session?.user?.profile?.name || "",
          email: session?.user?.profile?.email || "",
          phone: session?.user?.profile?.phone || "",
          year: session?.user?.profile?.year || "",
          course: session?.user?.profile?.course || "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "participants",
  });

  const onSubmit = async (data: TeamRegistrationData) => {
    // Validate team size against event constraints
    const participantCount = data.participants.length;

    if (
      event.minParticipantsPerTeam &&
      participantCount < event.minParticipantsPerTeam
    ) {
      toast.error(
        `Team must have at least ${event.minParticipantsPerTeam} participants`
      );
      return;
    }

    if (
      event.maxParticipantsPerTeam &&
      participantCount > event.maxParticipantsPerTeam
    ) {
      toast.error(
        `Team cannot have more than ${event.maxParticipantsPerTeam} participants`
      );
      return;
    }

    // Ensure leader's email is provided
    const leaderEmail = session?.user?.profile?.email;
    if (!leaderEmail) {
      toast.error(
        "Unable to determine team leader. Please refresh and try again."
      );
      return;
    }

    // Check for duplicate emails within the team
    const emails = data.participants.map((p) => p.email);
    const uniqueEmails = new Set(emails);
    if (emails.length !== uniqueEmails.size) {
      toast.error(
        "Duplicate emails found within the team. Each participant must have a unique email."
      );
      return;
    }

    setIsSubmitting(true);
    try {
      // Check if any emails are already registered for this event
      const emailCheckResult = await checkEmailsAlreadyRegistered(
        event.id,
        emails
      );

      if (emailCheckResult.errorMessage) {
        toast.error("Error checking email availability");
        return;
      }

      if (emailCheckResult.data && emailCheckResult.data.length > 0) {
        const conflicts = emailCheckResult.data.map((p) =>
          p.team
            ? `• ${p.email} (${p.name}) is already in team "${p.team.name}"`
            : `• ${p.email} (${p.name}) is already registered`
        );
        toast.error(
          `The following emails are already registered for this event:\n\n${conflicts.join(
            "\n"
          )}`
        );
        return;
      }
      const eventDetails = await getEventDetails(event.id);
      if (!eventDetails) {
        toast.error("Event not found");
        return;
      }

      const result = await registerForTeamEvent(
        eventDetails,
        data,
        leaderEmail
      );

      if (result.errorMessage) {
        toast.error(result.errorMessage);
      } else {
        toast.success("Team registration successful!");
        router.push(`/events/${event.id}/register/pay`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addParticipant = () => {
    append({
      name: "",
      email: "",
      phone: "",
      year: "",
      course: "",
    });
  };

  const removeParticipant = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Team Event Registration</h2>
        <p className="text-muted-foreground">
          Register your team for {event.name}. As the team leader, please fill
          out the details for all team members.
        </p>
        <div className="mt-2 text-sm text-muted-foreground space-y-1">
          {event.registrationFee > 0 && (
            <p>Registration Fee: ₹{event.registrationFee} per participant</p>
          )}
          {event.minParticipantsPerTeam && (
            <p>
              Minimum team size: {event.minParticipantsPerTeam} participants
            </p>
          )}
          {event.maxParticipantsPerTeam && (
            <p>
              Maximum team size: {event.maxParticipantsPerTeam} participants
            </p>
          )}
          <p className="text-orange-600 font-medium">
            ⚠️ Each participant must have a unique email address and cannot be
            registered for this event already.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Team Information */}
          <Card>
            <CardHeader>
              <CardTitle>Team Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="teamName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your team name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teamDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About Team (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description about your team"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Team Members</CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addParticipant}
                disabled={
                  event.maxParticipantsPerTeam
                    ? fields.length >= event.maxParticipantsPerTeam
                    : false
                }
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {fields.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">
                      {index === 0 ? "Team Leader" : `Member ${index + 1}`}
                    </h4>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeParticipant(index)}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`participants.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`participants.${index}.email`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter email address"
                              {...field}
                              disabled={index === 0} // Leader's email is locked
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`participants.${index}.phone`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Enter phone number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`participants.${index}.year`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year of Study</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., 1st Year, 2nd Year"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`participants.${index}.course`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Computer Science"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Registering Team..." : "Register Team"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
