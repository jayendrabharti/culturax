-- CreateIndex
CREATE INDEX "Payments_teamId_idx" ON "public"."Payments"("teamId");

-- CreateIndex
CREATE INDEX "Payments_participantId_idx" ON "public"."Payments"("participantId");

-- CreateIndex
CREATE INDEX "Payments_status_idx" ON "public"."Payments"("status");

-- CreateIndex
CREATE INDEX "events_registrationOpen_idx" ON "public"."events"("registrationOpen");

-- CreateIndex
CREATE INDEX "events_eventType_idx" ON "public"."events"("eventType");

-- CreateIndex
CREATE INDEX "events_registrationEndsAt_idx" ON "public"."events"("registrationEndsAt");

-- CreateIndex
CREATE INDEX "participants_eventId_idx" ON "public"."participants"("eventId");

-- CreateIndex
CREATE INDEX "participants_email_idx" ON "public"."participants"("email");

-- CreateIndex
CREATE INDEX "participants_teamId_idx" ON "public"."participants"("teamId");

-- CreateIndex
CREATE INDEX "participants_eventId_email_idx" ON "public"."participants"("eventId", "email");

-- CreateIndex
CREATE INDEX "teams_eventId_idx" ON "public"."teams"("eventId");

-- CreateIndex
CREATE INDEX "teams_leaderEmail_idx" ON "public"."teams"("leaderEmail");
