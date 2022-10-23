import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NotificationManager } from "react-notifications";
import {
  cancelSlot,
  fetchSlot,
  moveSlotUser,
  moveSlotUserToWaiting,
  removeConfirmedListUser,
  removeWaitingListUser,
  dedicateFilterHandler,
  editSlotDetails,
  getAllSlotData,
  moveAllUsersToWaiting,
  moveAllUsersToConfirmed,
} from "./helper";

// Hooks
export const useSlotsQuery = (slotId) =>
  useQuery(["slot"], () => fetchSlot(slotId), {
    refetchOnWindowFocus: true,
  });

export const useSlotCancelQuery = () => {
  const queryClient = useQueryClient();
  return useMutation(cancelSlot, {
    onSuccess: () => {
      queryClient.invalidateQueries("slots");
      NotificationManager.success("Slot cancelled successfully");
    },
  });
};

export const useMoveSlotUser = () => {
  const queryClient = useQueryClient();
  return useMutation(moveSlotUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("slots");
      NotificationManager.success("User moved to confirm list");
    },
  });
};

export const useMoveSlotUserToWaitingList = () => {
  const queryClient = useQueryClient();
  return useMutation(moveSlotUserToWaiting, {
    onSuccess: () => {
      queryClient.invalidateQueries("slots");
      NotificationManager.success("User moved to waiting list");
    },
  });
};

export const useRemoveWaitingListUser = () => {
  const queryClient = useQueryClient();
  return useMutation(removeWaitingListUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("slots");
      NotificationManager.success("User got removed");
    },
  });
};

export const useRemoveConfirmedUser = () => {
  const queryClient = useQueryClient();
  return useMutation(removeConfirmedListUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("slots");
      NotificationManager.success("User got removed");
    },
  });
};

export const useDedicatedFilter = () => {
  const queryClient = useQueryClient();
  return useMutation(dedicateFilterHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries("slots");
      NotificationManager.success("Dedicated filter changes updated");
    },
  });
};

export const useUpdateSlotData = () => {
  const queryClient = useQueryClient();
  return useMutation(editSlotDetails, {
    onSuccess: () => {
      queryClient.invalidateQueries("slots");
      NotificationManager.success("Slot details updated");
    },
  });
};

export const useGetAllSlotData = () => {
  const queryClient = useQueryClient();
  return useMutation(getAllSlotData, {
    onSuccess: () => {
      queryClient.invalidateQueries("slots");
    },
  });
};

export const useGetFullSlotsList = (pageParameters, searchKeyword) =>
  useQuery(
    ["slotsList", [pageParameters, searchKeyword]],
    () => getAllSlotData(pageParameters),
    {
      // refetchOnMount: false,
      // refetchOnReconnect: true,
      // refetchOnWindowFocus: false,
    }
  );

export const useMoveAllUsersToWaiting = () => {
  const queryClient = useQueryClient();
  return useMutation(moveAllUsersToWaiting, {
    onSuccess: () => {
      queryClient.invalidateQueries("slots");
      NotificationManager.success("All users moved to waiting list");
    },
  });
};

export const useMoveAllUsersToConfirmed = () => {
  const queryClient = useQueryClient();
  return useMutation(moveAllUsersToConfirmed, {
    onSuccess: () => {
      queryClient.invalidateQueries("slots");
      NotificationManager.success("All users moved to confirmed list");
    },
  });
};
