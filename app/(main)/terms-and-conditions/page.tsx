"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Terms & Conditions
        </h1>
        <p className="text-lg text-muted-foreground">
          Please read these terms carefully before using CulturaX Fest services
        </p>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">
            CulturaX Fest - Terms & Conditions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="space-y-6">
              {/* Introduction */}
              <section>
                <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                  <strong>Last Updated:</strong> August 20, 2025
                </p>
                <p className="leading-relaxed">
                  Thank you for accessing and using{" "}
                  <strong>CulturaX Fest</strong> website and services. This site
                  is owned and operated by{" "}
                  <strong>CulturaX Festival Team</strong> (hereinafter referred
                  to as "CulturaX", "we", "us", or "our"). By accessing,
                  registering, or participating through this site, you indicate
                  your unconditional acceptance of these terms & conditions. We
                  reserve the right, in our sole discretion, to update or revise
                  these terms & conditions at any time. Continued use of the
                  site following the posting of any changes to the 'terms &
                  conditions' constitutes your acceptance of those changes.
                </p>
                <p className="leading-relaxed mt-4">
                  At CulturaX Fest, we strive to create a safe, inclusive, and
                  exciting platform where students and participants can explore
                  cultural events, register for competitions, and engage with
                  our vibrant community. All events, registrations, and
                  information displayed on our platform constitute an
                  "invitation to participate". CulturaX reserves the right to
                  accept or reject registrations and participation based on our
                  guidelines and capacity limitations.
                </p>
              </section>

              <Separator />

              {/* Section 1 */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  1. Eligibility to Use Our Site and Services
                </h3>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    Use of the Site and participation in CulturaX Fest events is
                    available to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                    <li>
                      Currently enrolled college/university students with valid
                      student ID
                    </li>
                    <li>Recent graduates (within 2 years of graduation)</li>
                    <li>
                      Individuals who can legally enter into contracts under
                      applicable laws
                    </li>
                    <li>
                      Persons above 16 years of age (those under 18 require
                      parental consent)
                    </li>
                  </ul>
                  <p className="leading-relaxed">
                    Persons who are "incompetent to contract" within the meaning
                    of the Indian Contract Act, 1872, including un-discharged
                    insolvents, are not eligible to use the Site or participate
                    in events. Cultrax reserves the right to verify eligibility
                    and terminate access if eligibility criteria are not met.
                  </p>
                </div>
              </section>

              <Separator />

              {/* Section 2 */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  2. Registration and Account Management
                </h3>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    While browsing our site is open to all, event registration
                    requires creating an account. As a registered user, you
                    agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                    <li>
                      Provide true, accurate, current, and complete information
                      about yourself
                    </li>
                    <li>
                      Maintain and update your information to keep it accurate
                      and current
                    </li>
                    <li>
                      Upload genuine documents and certificates when required
                    </li>
                    <li>Use only one account per person</li>
                    <li>Not share your account credentials with others</li>
                  </ul>
                  <p className="leading-relaxed">
                    Cultrax reserves the right to suspend, terminate, or refuse
                    registration for any reason, including but not limited to
                    providing false information, violating event rules, or
                    inappropriate behavior.
                  </p>
                </div>
              </section>

              <Separator />

              {/* Section 3 */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  3. Event Registration and Participation
                </h3>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    When registering for events through our platform:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                    <li>
                      Registration fees, if applicable, are non-refundable
                      unless the event is cancelled by Cultrax
                    </li>
                    <li>
                      Some events may have limited capacity - registrations are
                      processed on a first-come, first-served basis
                    </li>
                    <li>
                      Team events require all team members to register
                      individually
                    </li>
                    <li>
                      Participants must adhere to event-specific rules and
                      guidelines
                    </li>
                    <li>
                      Substitutions in team events may be allowed subject to
                      organizer approval
                    </li>
                    <li>
                      No-shows without prior notice may result in registration
                      restrictions for future events
                    </li>
                  </ul>
                  <p className="leading-relaxed">
                    Cultrax reserves the right to modify event schedules,
                    venues, or format due to unforeseen circumstances.
                    Participants will be notified of any such changes through
                    registered email or website announcements.
                  </p>
                </div>
              </section>

              <Separator />

              {/* Section 4 */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  4. Payment and No Refund Policy
                </h3>
                <div className="space-y-3">
                  <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                      NO REFUND POLICY
                    </h4>
                    <p className="text-red-700 dark:text-red-300 text-sm">
                      <strong>
                        All event registration fees are strictly non-refundable
                        once payment is completed.
                      </strong>
                    </p>
                  </div>
                  <p className="leading-relaxed">
                    For events with registration fees:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                    <li>Payment must be completed to confirm participation</li>
                    <li>
                      We accept online payments through secure payment gateways
                    </li>
                    <li>
                      <strong>
                        Registration fees are strictly NON-REFUNDABLE under any
                        circumstances
                      </strong>
                    </li>
                    <li>
                      Payment failures or disputes should be reported within 48
                      hours
                    </li>
                    <li>
                      Participants must review all event details carefully
                      before payment
                    </li>
                  </ul>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-4">
                    <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                      Exceptions (Only in these cases):
                    </h5>
                    <ul className="list-disc list-inside space-y-1 text-yellow-700 dark:text-yellow-300 text-sm">
                      <li>Event cancellation by CulturaX organizers</li>
                      <li>Technical payment errors on our platform</li>
                      <li>Duplicate payment charges</li>
                    </ul>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Section 5 */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  5. Electronic Communications and Privacy
                </h3>
                <p className="leading-relaxed">
                  When you use our site, register for events, or communicate
                  with us, you agree to receive electronic communications from
                  us. These may include event updates, important announcements,
                  and administrative messages. You can opt out of promotional
                  emails but will continue to receive essential event-related
                  communications.
                </p>
                <p className="leading-relaxed mt-3">
                  We are committed to protecting your privacy and will handle
                  your personal information in accordance with applicable data
                  protection laws and our Privacy Policy.
                </p>
              </section>

              <Separator />

              {/* Section 6 */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  6. User Content and Intellectual Property
                </h3>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    All content submitted to Cultrax, including but not limited
                    to event submissions, photos, videos, reviews, comments, and
                    feedback, remains subject to the following:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                    <li>
                      You retain ownership of your original creative works
                    </li>
                    <li>
                      You grant Cultrax a license to use, reproduce, and display
                      your content for promotional purposes
                    </li>
                    <li>
                      Content must not violate any third-party rights or
                      applicable laws
                    </li>
                    <li>
                      Content must not be offensive, discriminatory, or
                      inappropriate
                    </li>
                    <li>
                      Cultrax reserves the right to remove any content that
                      violates these guidelines
                    </li>
                  </ul>
                  <p className="leading-relaxed">
                    Participants in cultural events retain full rights to their
                    original performances, artwork, and creative submissions.
                    However, by participating, you consent to photography,
                    videography, and live streaming of events for promotional
                    and documentation purposes.
                  </p>
                </div>
              </section>

              <Separator />

              {/* Section 7 */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  7. Code of Conduct and Behavior
                </h3>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    All participants are expected to maintain the highest
                    standards of conduct:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                    <li>
                      Respect for all participants, organizers, and volunteers
                    </li>
                    <li>
                      No discrimination based on gender, race, religion, or
                      background
                    </li>
                    <li>No harassment, bullying, or inappropriate behavior</li>
                    <li>Compliance with venue rules and local laws</li>
                    <li>No use of alcohol, drugs, or prohibited substances</li>
                    <li>
                      Responsible use of social media and digital platforms
                    </li>
                  </ul>
                  <p className="leading-relaxed">
                    Violation of our code of conduct may result in immediate
                    disqualification, removal from events, and prohibition from
                    future CulturaX activities.
                  </p>
                </div>
              </section>

              <Separator />

              {/* Section 8 */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  8. Liability and Risk Management
                </h3>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    Participation in CulturaX events is at your own risk. While
                    we take reasonable precautions to ensure safety:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                    <li>
                      CulturaX is not liable for personal injuries during events
                    </li>
                    <li>
                      Participants are responsible for their personal belongings
                    </li>
                    <li>
                      Medical emergencies will be handled according to standard
                      protocols
                    </li>
                    <li>
                      Event cancellations due to weather or emergencies are
                      beyond our control
                    </li>
                    <li>
                      Participants should have appropriate insurance coverage
                    </li>
                  </ul>
                </div>
              </section>

              <Separator />

              {/* Section 9 */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  9. Accuracy of Information
                </h3>
                <p className="leading-relaxed">
                  While CulturaX strives to provide accurate event information,
                  schedules, and guidelines, errors may occur. In such cases, we
                  reserve the right to correct information, modify event
                  details, or take other necessary actions. Participants will be
                  notified of significant changes through official communication
                  channels.
                </p>
              </section>

              <Separator />

              {/* Section 10 */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  10. Governing Law and Dispute Resolution
                </h3>
                <p className="leading-relaxed">
                  These terms and conditions are governed by the laws of India.
                  Any disputes arising from the use of this website or
                  participation in CulturaX events will be subject to the
                  jurisdiction of courts in the city where the festival is held.
                  We encourage resolution of disputes through direct
                  communication with our organizing team before pursuing legal
                  action.
                </p>
              </section>

              <Separator />

              {/* Contact Information */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  Contact Information
                </h3>
                <p className="leading-relaxed mb-4">
                  For questions about these terms and conditions or any aspect
                  of CulturaX Fest, please contact us:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="space-y-2">
                    <p>
                      <strong>Contact Person:</strong> Jayendra Bharti
                    </p>
                    <p>
                      <strong>Email:</strong> jay.bharti2804@gmail.com
                    </p>
                    <p>
                      <strong>Phone:</strong> +91 8800534849
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  By using this website and participating in CulturaX Fest, you
                  acknowledge that you have read, understood, and agree to be
                  bound by these terms and conditions.
                </p>
              </section>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
