import RevealHero from "@/components/animations/RevealHero";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const contacts: Array<{
  name: string;
  designation: string;
  phone: string;
  email?: string;
}> = [
  {
    name: "Agman Yadav",
    designation: "Iqlipse CEO",
    phone: "+91 93681 72591",
  },
  {
    name: "Aryan Kumar",
    designation: "Iqlipse Founder",
    phone: "+91 62066 31341",
  },
  {
    name: "Gaurav",
    designation: "Collegeye CEO",
    phone: "+91 89300 29200",
  },
  {
    name: "Jayendra Bharti",
    designation: "Iqlipse CTO",
    phone: "+91 88005 34849",
    email: "jay.bharti2804@gmail.com",
  },
];

export default function ContactUsPage() {
  return (
    <section className="flex w-full flex-col p-4 items-center">
      <RevealHero className="font-extrabold text-3xl">Contact Us</RevealHero>
      <div className="mt-6 w-full max-w-md space-y-4">
        {contacts.map((contact, idx) => (
          <Card key={idx}>
            <CardContent className="flex flex-col gap-1">
              <CardTitle className="text-lg">{contact.name}</CardTitle>
              <CardDescription>{contact.designation}</CardDescription>
              <Separator className="my-2" />
              <span className="text-sm text-muted-foreground">
                Phone:{" "}
                <a href={`tel:${contact.phone}`} className="underline">
                  {contact.phone}
                </a>
              </span>
              {contact.email && (
                <span className="text-sm text-muted-foreground">
                  Email:{" "}
                  <a href={`mailto:${contact.email}`} className="underline">
                    {contact.email}
                  </a>
                </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
