"use client";
import RevealHero from "@/components/animations/RevealHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  TrophyIcon,
  HeartIcon,
  StarIcon,
  GraduationCapIcon,
  CircleIcon,
  GamepadIcon,
  PaletteIcon,
  MicIcon,
  CameraIcon,
  Zap,
} from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function AboutUsPage() {
  const { theme } = useTheme();
  const isDarkMode: boolean = theme === "dark";

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="py-20 px-4 flex flex-col items-center">
        <RevealHero className="font-extrabold text-3xl">
          About Cultrax 2025
        </RevealHero>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Discover the most anticipated cultural fest of the year, where
          creativity meets innovation and talent finds its stage.
        </p>
      </section>

      {/* fest Overview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Fest Overview</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <CalendarIcon className="h-12 w-12 mx-auto text-primary mb-2" />
                <CardTitle>Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  20 Days of Non-stop Entertainment
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPinIcon className="h-12 w-12 mx-auto text-primary mb-2" />
                <CardTitle>Venue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  College Campus & Auditorium
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <UsersIcon className="h-12 w-12 mx-auto text-primary mb-2" />
                <CardTitle>Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  500+ Expected Participants
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrophyIcon className="h-12 w-12 mx-auto text-primary mb-2" />
                <CardTitle>Prize Pool</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">₹2,00,000+ in Prizes</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-gradient-to-r from-secondary/5 to-primary/5">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <HeartIcon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To create a vibrant platform that celebrates creativity,
                  fosters talent, and brings together diverse communities
                  through the universal language of culture and arts. We aim to
                  provide students with opportunities to showcase their skills
                  and learn from each other.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <StarIcon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To establish Cultrax as the premier cultural fest that
                  inspires innovation, encourages participation, and creates
                  lasting memories. We envision a future where every participant
                  leaves with enhanced skills, new friendships, and
                  unforgettable experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Event Categories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MicIcon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Performing Arts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Express yourself through music, dance, and drama
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Solo Singing</Badge>
                  <Badge variant="outline">Group Dance</Badge>
                  <Badge variant="outline">Street Play</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <PaletteIcon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Visual Arts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Showcase your creativity through visual mediums
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Painting</Badge>
                  <Badge variant="outline">Digital Art</Badge>
                  <Badge variant="outline">Photography</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <GamepadIcon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Gaming</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Compete in various gaming tournaments
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">BGMI</Badge>
                  <Badge variant="outline">Free Fire</Badge>
                  <Badge variant="outline">FIFA</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <GraduationCapIcon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Literary Arts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Express through words and language
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Poetry</Badge>
                  <Badge variant="outline">Debate</Badge>
                  <Badge variant="outline">Creative Writing</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CircleIcon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Sports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Physical activities and team sports
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Football</Badge>
                  <Badge variant="outline">Cricket</Badge>
                  <Badge variant="outline">Badminton</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CameraIcon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Digital Media</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Modern digital expression and content creation
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Short Film</Badge>
                  <Badge variant="outline">Vlog</Badge>
                  <Badge variant="outline">Meme Making</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Organizers */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Organized By</h2>
          <Reveal
            delay={0}
            className="grid grid-cols-4 gap-3 place-content-center place-items-center w-full"
          >
            <div>
              <Link
                href={
                  "https://www.instagram.com/deptofstudentorganization/?hl=en"
                }
                target={"_blank"}
              >
                <Image
                  suppressHydrationWarning
                  src={
                    isDarkMode
                      ? "/images/dso_white_logo.png"
                      : "/images/dso_black_logo.png"
                  }
                  alt={"DSO Logo"}
                  className={""}
                  priority
                  width={100}
                  height={100}
                />
              </Link>
            </div>
            <div>
              <Link
                href={"https://www.linkedin.com/company/loovert"}
                target={"_blank"}
              >
                <Image
                  suppressHydrationWarning
                  src={
                    isDarkMode
                      ? "/images/loovert_white_logo.png"
                      : "/images/loovert_black_logo.png"
                  }
                  alt={"Loovert Logo"}
                  className={""}
                  priority
                  width={100}
                  height={100}
                />
              </Link>
            </div>
            <div>
              <Link href={"https://iqlipse.space"} target={"_blank"}>
                <Image
                  src={"/images/iqlipse_logo.png"}
                  alt={"Iqlipse Logo"}
                  className={""}
                  priority
                  width={100}
                  height={100}
                />
              </Link>
            </div>
            <div>
              <Link
                href={"https://www.linkedin.com/company/collegeye/"}
                target={"_blank"}
              >
                <Image
                  suppressHydrationWarning
                  src={
                    isDarkMode
                      ? "/images/collegeeye_white_logo.png"
                      : "/images/collegeeye_black_logo.png"
                  }
                  alt={"CollegeEye Logo"}
                  className={""}
                  priority
                  width={100}
                  height={100}
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Join Cultrax 2025?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Don't miss out on this incredible opportunity to showcase your
            talent, make new friends, and create unforgettable memories.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              Early Bird Registration Open
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">
              <TrophyIcon className="h-4 w-4 mr-2" />
              Exciting Prizes Await
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">
              <UsersIcon className="h-4 w-4 mr-2" />
              Network with Peers
            </Badge>
          </div>
        </div>
      </section>
    </div>
  );
}
