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
} from "./helper";

// Hooks
export const useSlotsQuery = (slotId) =>
  useQuery(["slot"], () => fetchSlot(slotId), {
    refetchOnMount: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
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
      NotificationManager.success("User moved to confirm list");
    },
  });
};

export const useRemoveWaitingListUser = () => {
  const queryClient = useQueryClient();
  return useMutation(removeWaitingListUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("slots");
      NotificationManager.success("User moved to confirm list");
    },
  });
};

export const useRemoveConfirmedUser = () => {
  const queryClient = useQueryClient();
  return useMutation(removeConfirmedListUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("slots");
      NotificationManager.success("User moved to confirm list");
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
