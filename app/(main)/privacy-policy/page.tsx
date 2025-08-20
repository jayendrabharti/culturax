import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default async function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">Privacy Policy</h1>
        <p className="text-lg text-muted-foreground">
          Your privacy is important to us. Learn how we collect, use, and
          protect your information.
        </p>
        <Badge variant="secondary" className="mt-2">
          Last Updated: August 20, 2025
        </Badge>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">
            Cultrax 2025 - Privacy Policy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="space-y-6">
              {/* Introduction */}
              <section>
                <p className="leading-relaxed">
                  We respect and are committed towards protecting your privacy.
                  Publishing, selling or renting any personal data or
                  information to any third party, without your consent, is
                  against our ethics. The privacy practices of this statement
                  apply to our services available under the domain and
                  subdomains of the <strong>Cultrax 2025</strong> website.
                </p>
                <p className="leading-relaxed mt-4">
                  By visiting this Site you agree to be bound by the terms and
                  conditions of this privacy policy. If you do not agree, please
                  do not use or access our site. This privacy policy does not
                  apply to sites maintained by other companies or organizations
                  to which we link and we are not responsible for any personal
                  information you submit to third parties via our website.
                  Please ensure that you read the privacy policy of such other
                  companies or organizations before submitting your details.
                </p>
                <p className="leading-relaxed mt-4">
                  This privacy policy describes the information, as part of the
                  normal operation of our services, we collect from you and what
                  may happen to that information. This policy is formulated and
                  displayed to inform you about our information
                  collection/retention policies and practices so that you can
                  make an informed decision, in relation to the sharing of your
                  personal information with us.
                </p>
              </section>

              <Separator />

              {/* Privacy Guarantee */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  Privacy Guarantee
                </h3>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    We agree that we will{" "}
                    <strong>not sell or rent your personal information</strong>{" "}
                    to third parties for their marketing purposes without your
                    explicit consent. From time to time, we may reveal general
                    statistical information about our Site and visitors, such
                    as:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                    <li>Number of registered participants</li>
                    <li>Event registration statistics</li>
                    <li>
                      General demographic information (without personal
                      identifiers)
                    </li>
                    <li>Popular events and participation trends</li>
                  </ul>
                  <p className="leading-relaxed">
                    Only those of our team members who need access to your
                    information in order to perform their duties related to
                    event management, registration, and participant support, are
                    allowed such access. Any team member who violates our
                    privacy and/or security policies is subjected to
                    disciplinary action, including possible removal from the
                    organizing team and civil and/or criminal prosecution.
                  </p>
                </div>
              </section>

              <Separator />

              {/* Information We Collect */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  Information We Collect
                </h3>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    The Personal Information is used for two general purposes:
                    to process your event registrations and to provide you with
                    the best possible festival experience. We collect the
                    following types of information:
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-medium mb-2">
                        Registration Information:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-muted-foreground">
                        <li>Full name and contact details</li>
                        <li>Educational institution and student ID</li>
                        <li>Email address and phone number</li>
                        <li>Event preferences and selections</li>
                        <li>Team member information (for team events)</li>
                        <li>
                          Payment information (processed securely through
                          third-party providers)
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-2">
                        Technical Information:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-muted-foreground">
                        <li>IP address and browser information</li>
                        <li>Device type and operating system</li>
                        <li>Website usage patterns and preferences</li>
                        <li>Session data and authentication tokens</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-2">
                        Event-Related Information:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-muted-foreground">
                        <li>Submissions for competitions and events</li>
                        <li>Photos and videos from event participation</li>
                        <li>Feedback and reviews</li>
                        <li>Communication through our platform</li>
                      </ul>
                    </div>
                  </div>

                  <p className="leading-relaxed mt-4">
                    In furtherance of the confidentiality with which we treat
                    Personal Information, we have put in place appropriate
                    physical, electronic, and managerial procedures to safeguard
                    and secure the information we collect online.
                  </p>
                </div>
              </section>

              <Separator />

              {/* How We Use Your Information */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  How We Use Your Information
                </h3>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    We use your personal information for the following purposes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                    <li>
                      Processing event registrations and managing participation
                    </li>
                    <li>
                      Communicating important event updates and announcements
                    </li>
                    <li>Providing customer support and technical assistance</li>
                    <li>Improving our website and festival experience</li>
                    <li>Ensuring security and preventing fraud</li>
                    <li>
                      Complying with legal requirements and festival regulations
                    </li>
                    <li>
                      Creating participant certificates and recognition
                      materials
                    </li>
                    <li>Marketing future Cultrax events (with your consent)</li>
                  </ul>
                </div>
              </section>

              <Separator />

              {/* Cookie Policy */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  Cookie Policy
                </h3>
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    <strong>Cultrax 2025</strong> operates a strict privacy
                    policy and we are committed to being transparent about how
                    we use cookies on our website.
                  </p>

                  <div>
                    <h4 className="text-lg font-medium mb-2">
                      Why are cookies important?
                    </h4>
                    <p className="leading-relaxed text-muted-foreground">
                      Cookies help you make your online experience more
                      efficient and relevant to your interests. For instance,
                      they are used to remember your preferences on sites you
                      visit often, to remember your user ID and event
                      registrations, and to help you navigate between pages
                      efficiently.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium mb-2">
                      What is a Cookie?
                    </h4>
                    <p className="leading-relaxed text-muted-foreground">
                      A cookie is a small file, or files on your computer,
                      phone, or other device with a browser to save snippets of
                      text for reference by the website you are visiting. All
                      cookies have expiration dates in them that determine how
                      long they stay in your browser:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground mt-2">
                      <li>
                        <strong>Session cookies</strong> - temporary cookies
                        that expire when you close your browser
                      </li>
                      <li>
                        <strong>Persistent cookies</strong> - stay in your
                        browser until they expire or you delete them manually
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium mb-2">
                      Types of Cookies We Use:
                    </h4>
                    <div className="space-y-3">
                      <div className="border-l-4 border-primary pl-4">
                        <h5 className="font-medium">Essential Cookies</h5>
                        <p className="text-sm text-muted-foreground">
                          Required for the regular operation of our websites,
                          including login sessions and security features.
                        </p>
                      </div>
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h5 className="font-medium">Functional Cookies</h5>
                        <p className="text-sm text-muted-foreground">
                          Remember your preferences and settings to make your
                          experience better.
                        </p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4">
                        <h5 className="font-medium">Analytics Cookies</h5>
                        <p className="text-sm text-muted-foreground">
                          Used for performance measurement to understand how
                          visitors use our website and improve the user
                          experience.
                        </p>
                      </div>
                      <div className="border-l-4 border-orange-500 pl-4">
                        <h5 className="font-medium">Marketing Cookies</h5>
                        <p className="text-sm text-muted-foreground">
                          Enable us to serve you with relevant information about
                          upcoming events and festival updates.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Data Security */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  Data Security and Protection
                </h3>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    We implement industry-standard security measures to protect
                    your personal information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                    <li>Encrypted data transmission using SSL/TLS protocols</li>
                    <li>
                      Secure payment processing through trusted third-party
                      providers
                    </li>
                    <li>
                      Regular security audits and vulnerability assessments
                    </li>
                    <li>Access controls and authentication mechanisms</li>
                    <li>Regular data backups and recovery procedures</li>
                    <li>
                      Staff training on data protection and privacy practices
                    </li>
                  </ul>
                  <p className="leading-relaxed">
                    While we take reasonable precautions to protect your
                    information, no method of transmission over the Internet is
                    100% secure. We cannot guarantee absolute security but
                    commit to promptly addressing any security incidents.
                  </p>
                </div>
              </section>

              <Separator />

              {/* Third-Party Services */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  Third-Party Services
                </h3>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    We may use trusted third-party services to enhance your
                    experience:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                    <li>Payment processors for secure transaction handling</li>
                    <li>Email service providers for event communications</li>
                    <li>Analytics tools to improve website performance</li>
                    <li>
                      Cloud storage services for data backup and accessibility
                    </li>
                    <li>Authentication services for secure login</li>
                  </ul>
                  <p className="leading-relaxed">
                    These services operate under their own privacy policies, and
                    we ensure they meet our standards for data protection before
                    integration.
                  </p>
                </div>
              </section>

              <Separator />

              {/* Your Rights */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  Your Rights and Choices
                </h3>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    You have the following rights regarding your personal
                    information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                    <li>
                      <strong>Access:</strong> Request copies of your personal
                      data
                    </li>
                    <li>
                      <strong>Correction:</strong> Request correction of
                      inaccurate information
                    </li>
                    <li>
                      <strong>Deletion:</strong> Request deletion of your
                      personal data (subject to legal requirements)
                    </li>
                    <li>
                      <strong>Portability:</strong> Request transfer of your
                      data to another service
                    </li>
                    <li>
                      <strong>Objection:</strong> Object to processing of your
                      personal data
                    </li>
                    <li>
                      <strong>Restriction:</strong> Request restriction of
                      processing
                    </li>
                  </ul>
                  <p className="leading-relaxed">
                    To exercise these rights or for any privacy-related
                    questions, please contact us through the official channels
                    provided on our contact page.
                  </p>
                </div>
              </section>

              <Separator />

              {/* Cookie Management */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  Managing Your Cookie Preferences
                </h3>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    You can manage cookies through your browser settings:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                    <li>Delete existing cookies from your browser</li>
                    <li>Block cookies from specific websites</li>
                    <li>
                      Block all cookies (may affect website functionality)
                    </li>
                    <li>Set notifications when cookies are being sent</li>
                  </ul>
                  <p className="leading-relaxed text-sm">
                    <strong>Note:</strong> Disabling certain cookies may impact
                    your ability to use some features of our website, including
                    event registration and account management.
                  </p>
                </div>
              </section>

              <Separator />

              {/* Data Retention */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  Data Retention
                </h3>
                <p className="leading-relaxed">
                  We retain your personal information only for as long as
                  necessary to fulfill the purposes for which it was collected,
                  including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                  <li>Event registration and participation records: 3 years</li>
                  <li>
                    Payment and transaction data: As required by financial
                    regulations
                  </li>
                  <li>Communication records: 2 years from last interaction</li>
                  <li>
                    Website analytics data: 26 months (Google Analytics default)
                  </li>
                </ul>
              </section>

              <Separator />

              {/* Updates to Privacy Policy */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  Updates to This Privacy Policy
                </h3>
                <p className="leading-relaxed">
                  We may update this privacy policy from time to time to reflect
                  changes in our practices or for other operational, legal, or
                  regulatory reasons. We will notify you of any material changes
                  by posting the updated policy on our website with a new "Last
                  Updated" date. Continued use of our services after such
                  modifications will constitute your acknowledgment and
                  acceptance of the modified policy.
                </p>
              </section>

              <Separator />

              {/* Contact Information */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  Contact Us
                </h3>
                <p className="leading-relaxed">
                  If you have any questions about this Privacy Policy, your
                  personal information, or our data practices, please contact us
                  through the official communication channels available on our
                  contact page. We are committed to addressing your concerns
                  promptly and transparently.
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  By using the Cultrax 2025 website and services, you
                  acknowledge that you have read, understood, and agree to this
                  Privacy Policy.
                </p>
              </section>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
