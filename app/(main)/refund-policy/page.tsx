import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, CreditCard, Phone, Mail } from "lucide-react";

export default async function RefundPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Refund & Cancellation Policy
        </h1>
        <p className="text-lg text-muted-foreground">
          CulturaX Fest event registration policies - Please read carefully
        </p>
        <Badge variant="secondary" className="mt-2">
          Last Updated: August 20, 2025
        </Badge>
      </div>

      <div className="space-y-6">
        {/* Important Notice */}
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  Important Notice - NO REFUND POLICY
                </h3>
                <p className="text-red-700 dark:text-red-300 text-sm">
                  Please read this policy carefully before registering for
                  CulturaX Fest events.
                  <strong>
                    {" "}
                    NO REFUNDS will be provided for any event registrations once
                    payment is completed.
                  </strong>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Event Registration Refund Policy */}
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-700 dark:text-red-300">
              <CreditCard className="h-5 w-5" />
              <span>Event Registration Refund Policy</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <h4 className="font-semibold text-lg mb-2 text-red-800 dark:text-red-200">
                  NO REFUND POLICY
                </h4>
                <div className="space-y-3">
                  <div className="border-l-4 border-red-500 pl-4">
                    <p className="font-medium text-red-700 dark:text-red-300">
                      All Event Registrations: NO REFUND
                    </p>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Registration fees are non-refundable once payment is
                      completed
                    </p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <p className="font-medium text-red-700 dark:text-red-300">
                      Team Events: NO REFUND
                    </p>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Individual or complete team cancellations will not be
                      refunded
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-lg mb-2 text-red-700 dark:text-red-300">
                  Policy Details
                </h4>
                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    Due to the nature of CulturaX Fest event organization and
                    advance planning required,
                    <strong className="text-red-600 dark:text-red-400">
                      {" "}
                      NO REFUNDS and NO CANCELLATIONS{" "}
                    </strong>
                    will be entertained once the payment has been made for any
                    event registration.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">This includes:</h5>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                      <li>Individual event registrations</li>
                      <li>Team event registrations</li>
                      <li>Multiple event packages</li>
                      <li>Special workshops and masterclasses</li>
                      <li>Competition entries</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-lg mb-2">Exception Cases</h4>
                <p className="text-muted-foreground mb-2">
                  The only exceptions to this policy are:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>
                    <strong>Event Cancellation by CulturaX:</strong> Full refund
                    within 7-10 business days
                  </li>
                  <li>
                    <strong>Technical Payment Errors:</strong> Full refund if
                    payment was processed due to technical errors on our
                    platform
                  </li>
                  <li>
                    <strong>Duplicate Payments:</strong> Refund of duplicate
                    charges only
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-lg mb-2">
                  Important Reminders
                </h4>
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <ul className="list-disc list-inside space-y-1 text-yellow-800 dark:text-yellow-200 text-sm">
                    <li>
                      Please review all event details carefully before
                      registration
                    </li>
                    <li>Ensure you select the correct events and dates</li>
                    <li>
                      Check team member availability before team registrations
                    </li>
                    <li>
                      Registration fees are final once payment is confirmed
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cancellation Policy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Order Cancellation Policy</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  Event Registrations - NO CANCELLATION
                </h4>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  Event registrations for CulturaX Fest{" "}
                  <strong>CANNOT BE CANCELLED</strong> once payment is
                  completed. Please ensure you have reviewed all event details,
                  dates, and requirements before confirming your registration.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                  Payment Confirmation
                </h4>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  Once payment is completed for CulturaX Fest event
                  registration, the registration becomes final and cannot be
                  cancelled or refunded. Please double-check all details before
                  proceeding with payment.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2">
                  Final Payment Confirmation
                </h4>
                <p className="text-muted-foreground">
                  Once you proceed with payment for any CulturaX Fest event
                  registration, the registration becomes final and binding.
                  There are no cancellation options available after payment
                  completion.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              For any questions about this policy or CulturaX Fest event
              registrations, please contact:
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <span className="font-medium">Email:</span>
                  <span className="ml-2">jay.bharti2804@gmail.com</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <span className="font-medium">Phone:</span>
                  <span className="ml-2">+91 8800534849</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="h-5 w-5 text-primary font-bold text-center">
                  J
                </span>
                <div>
                  <span className="font-medium">Contact Person:</span>
                  <span className="ml-2">Jayendra Bharti</span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">Response Time</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• General inquiries: Response within 24 hours</li>
                <li>• Payment issues: Priority response within 12 hours</li>
                <li>• Technical support: Available during business hours</li>
                <li>• Event queries: Response within 24 hours</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Final Note */}
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground text-center">
              This refund and cancellation policy is effective from August 20,
              2025, and applies to all event registrations made through the
              CulturaX Fest platform. We reserve the right to modify this policy
              with prior notice to registered participants.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
