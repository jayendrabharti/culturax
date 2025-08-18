import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldIcon,
  EyeIcon,
  LockIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  HomeIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  return (
    <div className="py-16 px-4 pb-24 overflow-auto">
      <Image
        src={"/images/fest_black_logo.png"}
        alt="Fest Logo"
        width={200}
        height={100}
        className="absolute bottom-4 left-4 z-10 bg-zinc-400/50 p-5 rounded-3xl"
      />
      <Link href="/">
        <Button className="absolute top-4 right-4 z-10">
          <HomeIcon />
          Go To Homepage
        </Button>
      </Link>
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: August 18, 2025
          </p>
          <Badge variant="outline" className="mt-4">
            <ShieldIcon className="h-4 w-4 mr-2" />
            Your Privacy is Protected
          </Badge>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <EyeIcon className="h-5 w-5" />
              Introduction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Cultrax 2025 ("we," "our," or "us") is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website and register for our cultural festival.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using our services, you agree to the collection
              and use of information in accordance with this policy.
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3 text-primary">
                Personal Information
              </h3>
              <p className="text-muted-foreground mb-3">
                When you register for events, we may collect:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Full name and contact information</li>
                <li>Email address and phone number</li>
                <li>Educational institution details</li>
                <li>Event preferences and registration data</li>
                <li>
                  Payment information (processed securely through Razorpay)
                </li>
                <li>Profile pictures (optional)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-primary">
                Automatically Collected Information
              </h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>IP address and browser information</li>
                <li>Device type and operating system</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referral sources</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LockIcon className="h-5 w-5" />
              How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We use the collected information for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Processing event registrations and managing participation</li>
              <li>Facilitating secure payments for event fees</li>
              <li>Sending important updates about events and schedules</li>
              <li>Providing customer support and responding to inquiries</li>
              <li>Improving our website and user experience</li>
              <li>Ensuring security and preventing fraud</li>
              <li>Compliance with legal obligations</li>
              <li>Communicating promotional offers (with your consent)</li>
            </ul>
          </CardContent>
        </Card>

        {/* Information Sharing */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Information Sharing and Disclosure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We do not sell, trade, or otherwise transfer your personal
              information to third parties except in the following
              circumstances:
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-primary mb-2">
                  Service Providers
                </h4>
                <p className="text-muted-foreground text-sm">
                  We may share information with trusted third-party service
                  providers who assist us in operating our website, processing
                  payments (Razorpay), or conducting our business.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-primary mb-2">
                  Legal Requirements
                </h4>
                <p className="text-muted-foreground text-sm">
                  We may disclose your information when required by law or to
                  protect our rights, property, or safety.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-primary mb-2">
                  Event Partners
                </h4>
                <p className="text-muted-foreground text-sm">
                  Basic information may be shared with DSO and College Eye for
                  event organization and coordination purposes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Data Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We implement appropriate security measures to protect your
              personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Secure data transmission using SSL encryption</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication measures</li>
              <li>Secure payment processing through trusted providers</li>
              <li>Data backup and recovery procedures</li>
            </ul>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mt-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> While we strive to protect your
                information, no method of transmission over the internet or
                electronic storage is 100% secure. We cannot guarantee absolute
                security.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Access and review your personal information</li>
              <li>Request corrections to inaccurate data</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of promotional communications</li>
              <li>Request data portability</li>
              <li>Withdraw consent for data processing</li>
            </ul>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                To exercise these rights, please contact us using the
                information provided below.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Cookies and Tracking */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Cookies and Tracking Technologies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We use cookies and similar tracking technologies to enhance your
              experience:
            </p>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-primary text-sm">
                  Essential Cookies
                </h4>
                <p className="text-muted-foreground text-sm">
                  Required for basic website functionality and user
                  authentication.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-primary text-sm">
                  Analytics Cookies
                </h4>
                <p className="text-muted-foreground text-sm">
                  Help us understand how visitors interact with our website.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-primary text-sm">
                  Preference Cookies
                </h4>
                <p className="text-muted-foreground text-sm">
                  Remember your settings and preferences for a better
                  experience.
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              You can control cookie settings through your browser preferences.
            </p>
          </CardContent>
        </Card>

        {/* Third-Party Services */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Our website integrates with third-party services:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-primary mb-2">
                  Google Authentication
                </h4>
                <p className="text-muted-foreground text-sm">
                  For secure user login and registration. Subject to Google's
                  Privacy Policy.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-primary mb-2">
                  Razorpay Payments
                </h4>
                <p className="text-muted-foreground text-sm">
                  For secure payment processing. Subject to Razorpay's Privacy
                  Policy.
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              These services have their own privacy policies and we encourage
              you to review them.
            </p>
          </CardContent>
        </Card>

        {/* Data Retention */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Data Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We retain your personal information for as long as necessary to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Provide our services and fulfill your requests</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce our agreements</li>
              <li>Maintain records for festival archives (anonymized)</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Event registration data may be retained for up to 3 years for
              record-keeping purposes, after which it will be anonymized or
              deleted.
            </p>
          </CardContent>
        </Card>

        {/* Children's Privacy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our services are not intended for children under 13 years of age.
              We do not knowingly collect personal information from children
              under 13. If you are a parent or guardian and believe your child
              has provided us with personal information, please contact us
              immediately.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Privacy Policy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Changes to This Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the "Last updated" date. You are advised to
              review this Privacy Policy periodically for any changes.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MailIcon className="h-5 w-5" />
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy or our privacy
              practices, please contact us:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MailIcon className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  iqlipse.so@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+91 88005 34849</span>
              </div>
              <div className="flex items-start gap-3">
                <UserIcon className="h-4 w-4 text-primary mt-1" />
                <div>
                  <p className="text-muted-foreground">
                    Cultrax 2025 Festival Committee
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Organized by DSO & College Eye
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8">
          <Badge variant="secondary" className="text-sm">
            Effective Date: August 18, 2025
          </Badge>
        </div>
      </div>
    </div>
  );
}
