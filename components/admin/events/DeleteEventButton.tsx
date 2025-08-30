"use client";
import { deleteEvent } from "@/actions/events";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useTransition } from "react";

export default function DeleteEventButton({ eventId }: { eventId: string }) {
  const [deleting, startDeleting] = useTransition();

  const handleDelete = () => {
    startDeleting(async () => {
      await deleteEvent(eventId);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"} size={"sm"}>
          Delete <Trash2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            event.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button variant={"destructive"} onClick={handleDelete}>
            {deleting ? "Deleting..." : "Delete"}
            {deleting ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <Trash2Icon />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
