import { profileService } from "@/services/profile.service";
import { QUERY_KEYS } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useProfile = () => {
  const { status } = useSession();

  const { data: profileData, isLoading: isLoadingProfileData } = useQuery({
    queryKey: [QUERY_KEYS.profile],
    queryFn: () => profileService.get(),
    enabled: status === "authenticated",
  });

  return {
    profileData,
    isLoadingProfileData,
  };
};
