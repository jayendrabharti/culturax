"use server";

import { prisma } from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { getErrorMessage } from "@/utils/utils";

// Type definitions for Profile operations
type CreateProfileData = {
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  image?: string;
  registrationNumber?: string;
  course?: string;
  year?: string;
  graduationYear?: string;
  dayScholar?: boolean;
  dateOfBirth?: Date;
  isAdmin?: boolean;
};

type UpdateProfileData = Partial<CreateProfileData> & {
  id: string;
};

// CREATE - Create a new profile
export async function createProfile(data: CreateProfileData) {
  try {
    const profile = await prisma.profile.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        bio: data.bio,
        image: data.image,
        registrationNumber: data.registrationNumber,
        course: data.course,
        year: data.year,
        graduationYear: data.graduationYear,
        dayScholar: data.dayScholar,
        dateOfBirth: data.dateOfBirth,
        isAdmin: data.isAdmin || false,
      },
    });

    revalidatePath("/profile");
    return { data: profile, errorMessage: null };
  } catch (error: any) {
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return { data: null, errorMessage: "Email already exists" };
    }
    return {
      data: null,
      errorMessage: getErrorMessage(error, "Failed to create profile"),
    };
  }
}

// READ - Get profile by ID
export async function getProfile(id: string) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id },
      include: {
        participants: true,
      },
    });

    if (!profile) {
      return { data: null, errorMessage: "Profile not found" };
    }

    return { data: profile, errorMessage: null };
  } catch (error) {
    return {
      data: null,
      errorMessage: getErrorMessage(error, "Failed to fetch profile"),
    };
  }
}

// READ - Get profile by email
export async function getProfileByEmail(email: string) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { email },
      include: {
        participants: true,
      },
    });

    if (!profile) {
      return { data: null, errorMessage: "Profile not found" };
    }

    return { data: profile, errorMessage: null };
  } catch (error) {
    return {
      data: null,
      errorMessage: getErrorMessage(error, "Failed to fetch profile"),
    };
  }
}

// READ - Get all profiles with pagination
export async function getAllProfiles(
  page: number = 1,
  limit: number = 10,
  search?: string
) {
  try {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
            {
              registrationNumber: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            { course: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    const [profiles, total] = await Promise.all([
      prisma.profile.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          participants: true,
        },
      }),
      prisma.profile.count({ where }),
    ]);

    return {
      data: {
        profiles,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1,
        },
      },
      errorMessage: null,
    };
  } catch (error) {
    return {
      data: null,
      errorMessage: getErrorMessage(error, "Failed to fetch profiles"),
    };
  }
}

// READ - Get profiles by admin status
export async function getProfilesByAdminStatus(isAdmin: boolean) {
  try {
    const profiles = await prisma.profile.findMany({
      where: { isAdmin },
      orderBy: { createdAt: "desc" },
      include: {
        participants: true,
      },
    });

    return { data: profiles, errorMessage: null };
  } catch (error) {
    return {
      data: null,
      errorMessage: getErrorMessage(error, "Failed to fetch profiles"),
    };
  }
}

// UPDATE - Update profile by ID
export async function updateProfile(data: UpdateProfileData) {
  try {
    const { id, ...updateData } = data;

    // Remove undefined values to avoid updating with undefined
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const profile = await prisma.profile.update({
      where: { id },
      data: cleanUpdateData,
      include: {
        participants: true,
      },
    });

    return { data: profile, errorMessage: null };
  } catch (error: any) {
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return { data: null, errorMessage: "Email already exists" };
    }
    if (error.code === "P2025") {
      return { data: null, errorMessage: "Profile not found" };
    }
    return {
      data: null,
      errorMessage: getErrorMessage(error, "Failed to update profile"),
    };
  }
}

// UPDATE - Toggle admin status
export async function toggleAdminStatus(id: string) {
  try {
    const currentProfile = await prisma.profile.findUnique({
      where: { id },
      select: { isAdmin: true },
    });

    if (!currentProfile) {
      return { data: null, errorMessage: "Profile not found" };
    }

    const profile = await prisma.profile.update({
      where: { id },
      data: { isAdmin: !currentProfile.isAdmin },
    });

    revalidatePath("/profile");
    revalidatePath(`/profile/${id}`);
    return { data: profile, errorMessage: null };
  } catch (error) {
    return {
      data: null,
      errorMessage: getErrorMessage(error, "Failed to toggle admin status"),
    };
  }
}

// UPDATE - Update profile image
export async function updateProfileImage(id: string, imageUrl: string) {
  try {
    const profile = await prisma.profile.update({
      where: { id },
      data: { image: imageUrl },
    });

    revalidatePath("/profile");
    revalidatePath(`/profile/${id}`);
    return { data: profile, errorMessage: null };
  } catch (error: any) {
    if (error.code === "P2025") {
      return { data: null, errorMessage: "Profile not found" };
    }
    return {
      data: null,
      errorMessage: getErrorMessage(error, "Failed to update profile image"),
    };
  }
}

// DELETE - Delete profile by ID
export async function deleteProfile(id: string) {
  try {
    // Check if profile exists and get participant count
    const profile = await prisma.profile.findUnique({
      where: { id },
      include: {
        _count: {
          select: { participants: true },
        },
      },
    });

    if (!profile) {
      return { data: null, errorMessage: "Profile not found" };
    }

    // If profile has participants, you might want to handle this differently
    if (profile._count.participants > 0) {
      return {
        data: null,
        errorMessage:
          "Cannot delete profile with existing event participations",
      };
    }

    await prisma.profile.delete({
      where: { id },
    });

    revalidatePath("/profile");
    return { data: "Profile deleted successfully", errorMessage: null };
  } catch (error: any) {
    if (error.code === "P2025") {
      return { data: null, errorMessage: "Profile not found" };
    }
    return {
      data: null,
      errorMessage: getErrorMessage(error, "Failed to delete profile"),
    };
  }
}

// DELETE - Soft delete profile (mark as inactive instead of deleting)
export async function softDeleteProfile(id: string) {
  try {
    // Add an isActive field to your schema if you want to use soft deletes
    // For now, we'll update the name to indicate it's deleted
    const profile = await prisma.profile.update({
      where: { id },
      data: {
        name: `[DELETED] ${new Date().toISOString()}`,
        email: `deleted_${Date.now()}@deleted.com`,
      },
    });

    revalidatePath("/profile");
    return { data: profile, errorMessage: null };
  } catch (error: any) {
    if (error.code === "P2025") {
      return { data: null, errorMessage: "Profile not found" };
    }
    return {
      data: null,
      errorMessage: getErrorMessage(error, "Failed to soft delete profile"),
    };
  }
}

// UTILITY - Check if email exists
export async function checkEmailExists(email: string, excludeId?: string) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!profile) return { data: { exists: false }, errorMessage: null };
    if (excludeId && profile.id === excludeId)
      return { data: { exists: false }, errorMessage: null };

    return { data: { exists: true }, errorMessage: null };
  } catch (error) {
    return {
      data: { exists: false },
      errorMessage: getErrorMessage(error, "Failed to check email"),
    };
  }
}

// UTILITY - Get profile statistics
export async function getProfileStats() {
  try {
    const [
      totalProfiles,
      adminProfiles,
      dayScholars,
      hostelers,
      profilesThisMonth,
    ] = await Promise.all([
      prisma.profile.count(),
      prisma.profile.count({ where: { isAdmin: true } }),
      prisma.profile.count({ where: { dayScholar: true } }),
      prisma.profile.count({ where: { dayScholar: false } }),
      prisma.profile.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
    ]);

    return {
      data: {
        totalProfiles,
        adminProfiles,
        regularProfiles: totalProfiles - adminProfiles,
        dayScholars,
        hostelers,
        profilesThisMonth,
      },
      errorMessage: null,
    };
  } catch (error) {
    return {
      data: null,
      errorMessage: getErrorMessage(
        error,
        "Failed to fetch profile statistics"
      ),
    };
  }
}
