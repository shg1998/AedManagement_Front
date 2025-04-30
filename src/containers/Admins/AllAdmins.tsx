import React, {useMemo, useRef, useState} from "react";
import DataTable from "../../components/DataTable/DataTable";
import {Backdrop, Paper, Typography} from "@mui/material";
import {useQuery, useMutation} from "react-query";
import {MRT_ColumnDef, MRT_PaginationState} from "material-react-table";
import BasicCard from "../../components/Card/BasicCard";
import {useTranslation} from "react-i18next";
import PageHeader from "../../components/PageHeader/PageHeader";
import CardTopActions from "../../components/CardTopActions/CardTopActions";
import LeftModal from "../../components/Modal/LeftModal";
import emptyIcon from "../../assets/images/Alert Icon.png";
import Users from "../../services/Users";
import {useCustomTableQuery} from "../../hooks/use-custom-table-query";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import CircularProgress from "@mui/material/CircularProgress";
import {ReactComponent as Warning} from "../../../src/assets/images/publicIcons/redWarning.svg";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import {useThemeContext} from "../../ThemeContext";
import BooleanCheckStatus from "../../utils/BooleanCheckStatus/BooleanCheckStatus";
import NewAdmin, {DEFAULT_USER_INFORMATION, NewAdminHandle, AdminType} from "./NewAdmin";
import {tError, tSuccess, tWarn} from "../../utils/toast";

type UserObject = {
    id: any;
    fullName: string;
    userName: string;
    mobile: string;
    isActive: boolean;
};

const AllAdmins = () => {

    const {
        getUsers,
        getUserDetails,
        changeUserStatus
    } = new Users();

    const {themeMode, theme} = useThemeContext();
    const {t} = useTranslation();

    const newAdminRef = useRef<NewAdminHandle>(null);
    const tableInstanceRef = useRef(null);

    /*
    * States
    */

    const [selectedUserForChangingHisStatus, setSelectedUserForChangingHisStatus] = useState<number>(0);
    const [refetchTableData, setRefetchTableData] = useState<boolean>(true);
    const [openManageUserModal, setOpenManageUserModal] =
        useState<boolean>(false);
    const [otp, setOtp] = useState<string>("");
    const [myUserId, setMyUserId] = useState("");
    const [userDetailedOpen, setUserDetailedOpen] = useState<boolean>(false);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [isDetailsLoading, setIsDetailsLoading] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number>(0);
    const [showOTPInput, setShowOTPInput] = useState(false);
    const {data, isFetching, isLoading} = useCustomTableQuery(
        "users",
        refetchTableData,
        pagination,
        getUsers
    );
    /*
   * /States
   */


    const {data: manageUserValue} = useQuery<any>({
        queryKey: ["userDetails", selectedUserId],
        queryFn: async () => {
            let res = await getUserDetails(selectedUserId);
            let finalData = res.data;
            let value: AdminType = {
                id: finalData.id,
                fullName: finalData?.fullName,
                userName: finalData?.userName,
                isActive: finalData?.isActive,
                email: finalData?.email,
                password: "",
                passwordConfirm: ""
            }
            setIsDetailsLoading(false);
            setOpenManageUserModal(true);
            return value;
        },
        keepPreviousData: true,
        retry: false,
        enabled: selectedUserId !== 0,
        initialData: DEFAULT_USER_INFORMATION,
        refetchOnWindowFocus: false,
    });


    const columns = useMemo<MRT_ColumnDef<UserObject>[]>(
        () => [
            {
                accessorKey: "userName",
                header: "نام کاربری",
                enableHiding: false,
                maxSize: 20,
                accessorFn: (row: any) => row.userName,
            },
            {
                accessorKey: "fullName",
                header: "نام و نام خانوادگی",
                maxSize: 20,
                accessorFn: (row: any) => row.fullName,
            },
            {
                accessorKey: "mobile",
                header: "موبایل",
                accessorFn: (row: any) => row.mobile,
            },
            {
                accessorKey: "isActive",
                header: "وضعیت",
                maxSize: 10,
                accessorFn: (row: any) => <BooleanCheckStatus status={row.isActive}/>,
            },
        ],
        []
    );

    /*
    * functions
    */
    const handleChangeUserStatusConfirmed = async () => {
        changeUserStatus(selectedUserForChangingHisStatus).then(res => {
            setConfirmOpen(false);
            tWarn(res.message);
            setRefetchTableData(!refetchTableData);
        }).catch(err => {
            setConfirmOpen(false);
            tError(err?.response?.data?.message);
            console.log(err);
        });

    };

    const handleCloseManageModal = (): void => {
        setSelectedUserId(0);
        setOpenManageUserModal(false);
    };

    const handleEditRole = (row: any) => {
        setIsDetailsLoading(true);
        setSelectedUserId(row.id);
    };

    const handleChangeUserStatus = (id: any) => {
        setConfirmOpen(true);
        setSelectedUserForChangingHisStatus(id);
    }

    const handleShowUserInfo = (id: any) => {
        setMyUserId(id);
        setUserDetailedOpen(true);
    };

    const handleCloseDetailedUser = () => {
        setUserDetailedOpen(false);
    };

    const closeCreateEditModal = () => {
        setSelectedUserId(0);
        setOpenManageUserModal(false);
        setRefetchTableData(!refetchTableData);
    }
    const handleAddAdmin = async () => {
        newAdminRef?.current?.sendRequest();
    };

    /*
     * /functions
     */

    return (
        <Paper className={`main-container-${themeMode}`}>
            <PageHeader title={"ادمین ها"}/>
            <BasicCard
                header="فهرست ادمین ها"
                headerChildren={
                    <CardTopActions
                        firstAction={() => {
                        }}
                        secondTitle={"افزودن ادمین"}
                        secondAction={() => {
                            setSelectedUserId(0);
                            setOpenManageUserModal(true);
                        }}
                        second_section_name="admin"
                        second_module_name="user"
                        second_access="create_access"
                    />
                }
            >
                {isLoading ? (
                    <LoadingComponent/>
                ) : (
                    <>
                        {data?.length > 0 ? (
                            <div data-testid={"table"} style={{width: "100%"}}>
                                <DataTable
                                    ref={tableInstanceRef}
                                    columns={columns}
                                    data={data}
                                    isFetching={isFetching}
                                    pagination={pagination}
                                    setPagination={setPagination}
                                    totalCount={data?.length}
                                    onRowClicked={(row: any) => handleShowUserInfo(row.id)}
                                    hasRowAction={true}
                                    editRow={handleEditRole}
                                    disableRowSelection={true}
                                    enableEntity={handleChangeUserStatus}
                                    // deleteRow={
                                    //     deleteAccess
                                    //         ? (row) => {
                                    //             setMyUserId(row.id);
                                    //             setConfirmOpen(true);
                                    //         }
                                    //         : undefined
                                    // }
                                />
                            </div>
                        ) : (
                            <div className={"empty-container"} data-testid={"no-data"}>
                                <img alt="no user" className="emptyPicture" src={emptyIcon}/>
                                <Typography className="noData">{t("users.noData")}</Typography>
                            </div>
                        )}
                    </>
                )}
                {isFetching && <div data-testid={"fetching"}></div>}
            </BasicCard>
            <LeftModal
                title={
                    selectedUserId === 0 ? "➕ افزودن ادمین" : "🖊 ویرایش ادمین"
                }
                open={openManageUserModal}
                maxWidth={"md"}
                handleClose={handleCloseManageModal}
                handleAdd={handleAddAdmin}
                buttonLabel={selectedUserId === 0 ? "افزودن" : "ویرایش"}
            >
                <NewAdmin
                    ref={newAdminRef}
                    data={selectedUserId === 0 ? DEFAULT_USER_INFORMATION : manageUserValue}
                    closeModal={closeCreateEditModal}
                />
            </LeftModal>

            <ConfirmModal
                open={confirmOpen}
                handleClose={() => {
                    setConfirmOpen(false);
                }}
                handleConfirm={handleChangeUserStatusConfirmed}
                buttonLabel={"تغییر وضعیت"}
                title={"تغییر وضعیت کاربر"}
                disableButton={showOTPInput && otp.length !== 6}
                description={
                    <div
                        style={{
                            backgroundColor: theme.palette.grayP.dark,
                            margin: "0px 1px",
                            border: `1px solid ${theme.palette.card.contrastText}`,
                            padding: "10px",
                        }}
                    >
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Warning/>
                            <p
                                style={{
                                    color: "red",
                                    fontWeight: "700",
                                    marginRight: "5px",
                                }}
                            >
                                آیا از تغییر وضعیت کاربر اطمینان دارید؟
                            </p>
                        </div>
                    </div>
                }
            />

            <Backdrop
                sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isDetailsLoading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </Paper>
    );
};

export default AllAdmins;
