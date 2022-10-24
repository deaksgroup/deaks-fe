import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FormControlLabel, TableCell } from "@mui/material";
import { ContentWrapper } from "../shared/components/ContentWrapper";
import { DeaksTable } from "../shared/components/DeaksTable";
import { usePagination } from "../shared/hooks/usePagination";
import { FilterSection } from "../shared/components/FilterSection";
import { useSearch } from "../shared/hooks/useSearch";
import { SelectItem } from "../shared/components/SelectItem";
import Stack from "@mui/material/Stack";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { DeaksModal } from "../shared/components/DeaksModal";
import { UserModal } from "./UserModal";
import { NotificationManager } from "react-notifications";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {
  activateUser,
  deleteUserId,
  getUsersCount,
  getUsersInfo,
  getUsersList,
} from "../shared/services/usersService";
import {
  accountStatusOptions,
  Android12Switch,
  jobStatusOptions,
  StyledTableRow,
  StyledIconButton,
  headings,
} from "./utils/userUtils";
import "./style/users.css";
import DeaksDialog from "../shared/components/DeaksDialog";

const Users = () => {
  const { SearchInput, searchKeyword } = useSearch("Search Name");
  const [totalCount, setTotalCount] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [jobStatus, setJobStatus] = useState("");
  const [selectedDeleteUser, setSelectedDeleteUser] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [userData, setUserData] = useState([]);

  const Paginations = usePagination(totalCount);
  const selectedAccountStatus = (data) => setAccountStatus(data);
  const queryParams = useMemo(() => {
    return {
      name: searchKeyword,
      jobStatus: jobStatus,
      accountStatus: accountStatus,
      sortBy: "",
      orderBy: "",
      limit: Paginations.props.rowsPerPage,
      skip: Paginations.props.page * Paginations.props.rowsPerPage,
    };
  }, [
    accountStatus,
    searchKeyword,
    jobStatus,
    Paginations.props.rowsPerPage,
    Paginations.props.page,
  ]);

  // Fetch All users from DB
  const fetchUsers = useCallback(async () => {
    try {
      const response = await getUsersList(queryParams);
      setUserData(response.data);

      // const count = await getUsersCount();
      setTotalCount(40);
    } catch (err) {
      console.log(err);
      setUserData([]);
    }
  }, [queryParams]);

  // Edit User info fetching and passing info to modal form
  const editModalHandler = useCallback(async (id) => {
    try {
      const responce = await getUsersInfo(id);
      setUserInfo(responce.data);
      setModalOpen(true);
    } catch (err) {
      setModalOpen(false);
      NotificationManager.error(err);
    }
  }, []);

  // Activate/Deactivate User
  const userActivation = useCallback(async (id, status) => {
    try {
      const data = {
        userId: id,
        status: status === true ? "Submitted" : "Not Submitted",
      };
      await activateUser(data);
      NotificationManager.success("Updated successfully");
    } catch (err) {
      NotificationManager.error(err);
    }
  }, []);

  // trigger Delete modal
  const triggerDelete = useCallback((id) => {
    setDeleteDialogOpen(true);
    setSelectedDeleteUser(id);
  }, []);

  // Delete user
  const deleteUser = useCallback(async () => {
    try {
      await deleteUserId(selectedDeleteUser);
      NotificationManager.success("User deleted sucessfully");
      setDeleteDialogOpen(false);
      fetchUsers();
    } catch (error) {
      setDeleteDialogOpen(false);
    }
  }, [selectedDeleteUser, fetchUsers]);

  // Pagination useEffect
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <ContentWrapper headerName="Users">
      <FilterSection>
        {SearchInput}
        <SelectItem
          key="accountStatusOptions"
          setFunction={selectedAccountStatus}
          options={accountStatusOptions}
          label={"Account Status"}
        />
      </FilterSection>
      <DeaksTable headings={headings}>
        {userData?.map((item, index) => {
          return (
            <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
              <>
                <TableCell key={`${item.name}`} align="left">
                  {item.name}
                </TableCell>
                <TableCell key={`${item.email}`} align="left">
                  {item.email}
                </TableCell>
                <TableCell key={`${item.accountStatus}`} align="left">
                  {item.accountStatus}
                </TableCell>
                {/* <TableCell key={`${item.jobStatus}`} align="left">
                  {item.jobStatus}
                </TableCell> */}
                <TableCell key={`${item._id}`} align="left">
                  <Stack direction="row" spacing={1}>
                    <StyledIconButton
                      size="small"
                      aria-label="delete user"
                      onClick={() => {
                        triggerDelete(item._id);
                      }}
                    >
                      <DeleteOutlinedIcon size="small" />
                    </StyledIconButton>
                    <StyledIconButton
                      size="small"
                      aria-label="Edit User"
                      onClick={() => {
                        editModalHandler(item._id);
                      }}
                    >
                      <ModeEditOutlineOutlinedIcon size="small" />
                    </StyledIconButton>
                    <FormControlLabel
                      control={
                        <Android12Switch
                          sx={{ height: "36px" }}
                          defaultChecked={
                            item.verificationStatus === "Not Submitted"
                              ? false
                              : true
                          }
                          onClick={(e) => {
                            userActivation(item._id, e.target.checked);
                          }}
                        />
                      }
                      label=""
                      sx={{ fontSize: "14px" }}
                    />
                  </Stack>
                </TableCell>
              </>
            </StyledTableRow>
          );
        })}
      </DeaksTable>
      {Paginations}

      {/* Page interactions */}
      <DeaksModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalWidth={1100}
      >
        <UserModal
          userInfo={userInfo}
          fetchUsers={fetchUsers}
          setModalOpen={setModalOpen}
          modalHeader="Edit User"
        />
      </DeaksModal>
      <DeaksDialog
        heading="Warning ..!"
        message="User will be permenenatly get deleted from the application. Do you want to continue ?"
        okButton="Yes"
        cancelButton="Cancel"
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        confirmFunction={deleteUser}
      />
      {/* Page interactions */}
    </ContentWrapper>
  );
};

export default Users;
