"use server";

import { prisma } from "@/prisma/client";
import type { Prisma } from "@prisma/client";

export const getUsersCount = async () => {
  const count = await prisma.profile.count();
  return count;
};

export const getUsers = async (options: Prisma.ProfileFindManyArgs = {}) => {
  const profiles = await prisma.profile.findMany(options);
  return profiles;
};

export const getPaymentsCount = async () => {
  const count = await prisma.payments.count();
  return count;
};

export const getPayments = async (
  options: Prisma.PaymentsFindManyArgs = {}
) => {
  const payments = await prisma.payments.findMany(options);
  return payments;
};
