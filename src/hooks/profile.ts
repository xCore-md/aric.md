import { profileService } from "@/services/profile.service";
import { QUERY_KEYS } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  const { data: profileData, isLoading: isLoadingProfileData } = useQuery({
    queryKey: [QUERY_KEYS.profile],
    queryFn: () => profileService.get(),
  });

  return {
    profileData,
    isLoadingProfileData,
  };
};
