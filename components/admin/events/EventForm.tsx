"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon, LoaderCircle, SaveIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTransition } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/utils";
import { Label } from "@/components/ui/label";
import EventCoverImage from "@/components/admin/events/EventCoverImage";
import RichTextEditor from "@/components/RichTextEditor";
import { createEvent, updateEvent } from "@/actions/events";
import { useRouter } from "next/navigation";
import { Event } from "@prisma/client";

const eventSchema = z
  .object({
    name: z.string().min(2, "Event name must be at least 2 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
    location: z.string().min(2, "Location is required"),
    coverImage: z.string().url("Please enter a valid image URL"),
    about: z.any().optional(),
    eventType: z.enum(["INDIVIDUAL", "TEAM"]),
    minParticipantsPerTeam: z.number().min(1).optional(),
    maxParticipantsPerTeam: z.number().min(1).optional(),
    minTeams: z.number().min(1).optional(),
    maxTeams: z.number().min(1).optional(),
    registrationFee: z.number().min(0, "Registration fee cannot be negative"),
    startsAt: z.date(),
    endsAt: z.date(),
    registrationStartsAt: z.date(),
    registrationEndsAt: z.date(),
  })
  .refine((data) => data.startsAt < data.endsAt, {
    message: "Event end date must be after start date",
    path: ["endsAt"],
  })
  .refine((data) => data.registrationStartsAt < data.registrationEndsAt, {
    message: "Registration end date must be after start date",
    path: ["registrationEndsAt"],
  })
  .refine((data) => data.registrationEndsAt <= data.startsAt, {
    message: "Registration must end before event starts",
    path: ["registrationEndsAt"],
  });

export type EventFormData = z.infer<typeof eventSchema>;

export default function EventForm({
  event,
  type = "update",
}: {
  event?: Event;
  type?: "create" | "update";
}) {
  const router = useRouter();
  const [saving, startSaving] = useTransition();

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: event?.name || "",
      description: event?.description || "",
      location: event?.location || "",
      coverImage: event?.coverImage || "",
      about: event?.about || undefined,
      eventType: event?.eventType || "TEAM",
      registrationFee: event?.registrationFee || 0,
      minParticipantsPerTeam: event?.minParticipantsPerTeam || undefined,
      maxParticipantsPerTeam: event?.maxParticipantsPerTeam || undefined,
      minTeams: event?.minTeams || undefined,
      maxTeams: event?.maxTeams || undefined,
      startsAt: event?.startsAt || undefined,
      endsAt: event?.endsAt || undefined,
      registrationStartsAt: event?.registrationStartsAt || undefined,
      registrationEndsAt: event?.registrationEndsAt || undefined,
    },
  });

  const eventType = form.watch("eventType");

  const handleCoverImageReady = (imageUrl: string) => {
    form.setValue("coverImage", imageUrl);
  };

  const handleCreate = async (data: EventFormData) => {
    try {
      // Convert complex objects to serializable format
      const cleanData = {
        ...data,
        // Convert Quill Delta to plain object if it exists
        about: data.about ? JSON.parse(JSON.stringify(data.about)) : undefined,
        // Convert dates to ISO strings
        startsAt: data.startsAt.toISOString(),
        endsAt: data.endsAt.toISOString(),
        registrationStartsAt: data.registrationStartsAt.toISOString(),
        registrationEndsAt: data.registrationEndsAt.toISOString(),
      };

      const { errorMessage } = await createEvent(cleanData);
      if (errorMessage) {
        toast.error(getErrorMessage(errorMessage, "Failed to create event"));
        return;
      }
      toast.success("Event created successfully!");
      form.reset();
      router.push("/admin/events");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to create event"));
    }
  };

  const handleUpdate = async (data: EventFormData) => {
    try {
      if (!event) return;
      // Convert complex objects to serializable format
      const cleanData = {
        ...data,
        // Convert Quill Delta to plain object if it exists
        about: data.about ? JSON.parse(JSON.stringify(data.about)) : undefined,
        // Convert dates to ISO strings
        startsAt: data.startsAt.toISOString(),
        endsAt: data.endsAt.toISOString(),
        registrationStartsAt: data.registrationStartsAt.toISOString(),
        registrationEndsAt: data.registrationEndsAt.toISOString(),
      };

      const { errorMessage } = await updateEvent(event.id, cleanData);
      if (errorMessage) {
        toast.error(getErrorMessage(errorMessage, "Failed to update event"));
        return;
      }
      toast.success("Event updated successfully!");
      form.reset();
      router.push("/admin/events");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update event"));
    }
  };

  function onSubmit(data: EventFormData) {
    startSaving(async () => {
      if (type === "create") {
        await handleCreate(data);
      } else {
        await handleUpdate(data);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-3 w-full max-w-4xl"
      >
        <EventCoverImage
          initialImageUrl={event?.coverImage || ""}
          onImageReady={handleCoverImageReady}
          disabled={saving}
        />

        <Separator />

        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Basic Information</h3>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description *</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter event description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Main Campus" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* Event Type and Participation */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Event Type & Participation</h3>

          <FormField
            control={form.control}
            name="eventType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Type *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="INDIVIDUAL">Individual</SelectItem>
                    <SelectItem value="TEAM">Team</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            {eventType === "TEAM" && (
              <>
                <FormField
                  control={form.control}
                  name="minParticipantsPerTeam"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Participants per Team</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="min per team"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxParticipantsPerTeam"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Participants per Team</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="max per team"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="minTeams"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Teams</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="min teams"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : undefined
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxTeams"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Teams</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="max teams"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : undefined
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="registrationFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Fee (₹)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    min="0"
                    step="0.01"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseFloat(e.target.value) : 0
                      )
                    }
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  Enter 0 for free events
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* Event Dates */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Event Schedule</h3>

          <div className="flex flex-col gap-4">
            <div className="flex flex-row flex-wrap gap-10">
              <FormField
                control={form.control}
                name="startsAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Start Time *</FormLabel>
                    <div className="flex gap-4">
                      {/* Date Picker */}
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="startsAt-date" className="px-1">
                          Date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="startsAt-date"
                              className="w-32 justify-between font-normal"
                            >
                              {field.value
                                ? field.value.toLocaleDateString()
                                : "Select date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                if (date) {
                                  // preserve time if already set
                                  const prev = field.value ?? new Date();
                                  date.setHours(
                                    prev.getHours(),
                                    prev.getMinutes(),
                                    prev.getSeconds()
                                  );
                                  field.onChange(date);
                                }
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      {/* Time Picker */}
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="startsAt-time" className="px-1">
                          Time
                        </Label>
                        <Input
                          type="time"
                          id="startsAt-time"
                          step="1"
                          value={
                            field.value
                              ? field.value.toLocaleTimeString("en-GB", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                })
                              : "10:30:00"
                          }
                          onChange={(e) => {
                            const [h, m, s] = e.target.value
                              .split(":")
                              .map(Number);
                            const date = field.value
                              ? new Date(field.value)
                              : new Date();
                            date.setHours(h, m, s ?? 0);
                            field.onChange(date);
                          }}
                          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endsAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event End Time *</FormLabel>
                    <div className="flex gap-4">
                      {/* Date Picker */}
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="endsAt-date" className="px-1">
                          Date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="endsAt-date"
                              className="w-32 justify-between font-normal"
                            >
                              {field.value
                                ? field.value.toLocaleDateString()
                                : "Select date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                if (date) {
                                  const prev = field.value ?? new Date();
                                  date.setHours(
                                    prev.getHours(),
                                    prev.getMinutes(),
                                    prev.getSeconds()
                                  );
                                  field.onChange(date);
                                }
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      {/* Time Picker */}
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="endsAt-time" className="px-1">
                          Time
                        </Label>
                        <Input
                          type="time"
                          id="endsAt-time"
                          step="1"
                          value={
                            field.value
                              ? field.value.toLocaleTimeString("en-GB", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                })
                              : "10:30:00"
                          }
                          onChange={(e) => {
                            const [h, m, s] = e.target.value
                              .split(":")
                              .map(Number);
                            const date = field.value
                              ? new Date(field.value)
                              : new Date();
                            date.setHours(h, m, s ?? 0);
                            field.onChange(date);
                          }}
                          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row flex-wrap gap-10">
              <FormField
                control={form.control}
                name="registrationStartsAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Start Time *</FormLabel>
                    <div className="flex gap-4">
                      {/* Date Picker */}
                      <div className="flex flex-col gap-3">
                        <Label
                          htmlFor="registrationStartsAt-date"
                          className="px-1"
                        >
                          Date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="registrationStartsAt-date"
                              className="w-32 justify-between font-normal"
                            >
                              {field.value
                                ? field.value.toLocaleDateString()
                                : "Select date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                if (date) {
                                  const prev = field.value ?? new Date();
                                  date.setHours(
                                    prev.getHours(),
                                    prev.getMinutes(),
                                    prev.getSeconds()
                                  );
                                  field.onChange(date);
                                }
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      {/* Time Picker */}
                      <div className="flex flex-col gap-3">
                        <Label
                          htmlFor="registrationStartsAt-time"
                          className="px-1"
                        >
                          Time
                        </Label>
                        <Input
                          type="time"
                          id="registrationStartsAt-time"
                          step="1"
                          value={
                            field.value
                              ? field.value.toLocaleTimeString("en-GB", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                })
                              : "10:30:00"
                          }
                          onChange={(e) => {
                            const [h, m, s] = e.target.value
                              .split(":")
                              .map(Number);
                            const date = field.value
                              ? new Date(field.value)
                              : new Date();
                            date.setHours(h, m, s ?? 0);
                            field.onChange(date);
                          }}
                          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="registrationEndsAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration End Time *</FormLabel>
                    <div className="flex gap-4">
                      {/* Date Picker */}
                      <div className="flex flex-col gap-3">
                        <Label
                          htmlFor="registrationEndsAt-date"
                          className="px-1"
                        >
                          Date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="registrationEndsAt-date"
                              className="w-32 justify-between font-normal"
                            >
                              {field.value
                                ? field.value.toLocaleDateString()
                                : "Select date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                if (date) {
                                  const prev = field.value ?? new Date();
                                  date.setHours(
                                    prev.getHours(),
                                    prev.getMinutes(),
                                    prev.getSeconds()
                                  );
                                  field.onChange(date);
                                }
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      {/* Time Picker */}
                      <div className="flex flex-col gap-3">
                        <Label
                          htmlFor="registrationEndsAt-time"
                          className="px-1"
                        >
                          Time
                        </Label>
                        <Input
                          type="time"
                          id="registrationEndsAt-time"
                          step="1"
                          value={
                            field.value
                              ? field.value.toLocaleTimeString("en-GB", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                })
                              : "10:30:00"
                          }
                          onChange={(e) => {
                            const [h, m, s] = e.target.value
                              .split(":")
                              .map(Number);
                            const date = field.value
                              ? new Date(field.value)
                              : new Date();
                            date.setHours(h, m, s ?? 0);
                            field.onChange(date);
                          }}
                          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* About Event Section */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">About Event Section</h3>
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <RichTextEditor
                content={field.value}
                setContent={field.onChange}
              />
            )}
          />
        </div>

        <div className="flex gap-3 pt-6">
          <Button type="submit" disabled={saving} className="flex-1">
            {saving ? (
              <>
                <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                {type === "create" ? "Creating..." : "Updating..."}
              </>
            ) : (
              <>
                <SaveIcon className="w-4 h-4 mr-2" />
                {type === "create" ? "Create Event" : "Update Event"}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
