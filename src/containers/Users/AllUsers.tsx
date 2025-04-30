import React, {useEffect, useMemo, useRef, useState} from "react";
import DataTable from "../../components/DataTable/DataTable";
import {Backdrop, Paper} from "@mui/material";
import {useQuery} from "react-query";
import {MRT_ColumnDef, MRT_ColumnFiltersState, MRT_PaginationState} from "material-react-table";
import BasicCard from "../../components/Card/BasicCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import CardTopActions from "../../components/CardTopActions/CardTopActions";
import LeftModal from "../../components/Modal/LeftModal";
import Users from "../../services/Users";
import {useCustomTableQuery} from "../../hooks/use-custom-table-query";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import {useThemeContext} from "../../ThemeContext";
import BooleanCheckStatus from "../../utils/BooleanCheckStatus/BooleanCheckStatus";
import NewUser from "./NewUser";
import {AdminType, DEFAULT_USER_INFORMATION, NewAdminHandle} from "../Admins/NewAdmin";

type UserObject = {
    id: any;
    fullName: string;
    userName: string;
    mobile: string;
    isActive: boolean;
};

const AllUsers = () => {

    const {
        getUsers,
        getUserDetails
    } = new Users();

    const {themeMode} = useThemeContext();

    const newUserRef = useRef<NewAdminHandle>(null);
    const tableInstanceRef = useRef(null);

    /*
    * States
    */
    const [query, setQuery] = useState<string>("");
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
    const [refetchTableData, setRefetchTableData] = useState<boolean>(true);
    const [openManageUserModal, setOpenManageUserModal] =
        useState<boolean>(false);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [selectedUser, setSelectedUser] = useState<AdminType>();
    const {data, isFetching, isLoading} = useCustomTableQuery(
        "users",
        refetchTableData,
        pagination,
        getUsers,
        query
    );

    /*
   * /States
   */

    const columns = useMemo<MRT_ColumnDef<UserObject>[]>(
        () => [
            {
                accessorKey: "userName",
                header: "Username",
                enableHiding: false,
                maxSize: 20,
                accessorFn: (row: any) => row.userName,
            },
            {
                accessorKey: "fullName",
                header: "FullName",
                maxSize: 20,
                accessorFn: (row: any) => row.fullName,
            },
            {
                accessorKey: "email",
                header: "Email",
                accessorFn: (row: any) => row.email,
            },
            {
                accessorKey: "isActive",
                header: "IsActive",
                maxSize: 10,
                accessorFn: (row: any) => <BooleanCheckStatus status={row.isActive}/>,
            },
        ],
        []
    );

    /*
    * functions
    */

    const handleCloseManageModal = (): void => {
        setSelectedUser(DEFAULT_USER_INFORMATION);
        setOpenManageUserModal(false);
    };

    const handleEditRole = (row: any) => {
        setSelectedUser({
            id: row.id,
            userName: row.userName,
            fullName: row.fullName,
            email: row.email,
            password: '',
            passwordConfirm: '',
            isActive: row.isActive
        });
        setOpenManageUserModal(true);
    };

    const closeCreateEditModal = () => {
        setSelectedUser(DEFAULT_USER_INFORMATION);
        setOpenManageUserModal(false);
        setRefetchTableData(!refetchTableData);
    }
    const handleAddAdmin = async () => {
        newUserRef?.current?.sendRequest();
    };

    useEffect(() => {
        let filterString = columnFilters
            .map((item: any) => {
                const value = item.value.trim();
                return `contains(${item.id},'${value}')`;
            })
            .join(" and ");
        // if (timeQuery !== "" && columnFilters.length > 0)
        //     filterString += " and ";

        setQuery(filterString);
        setPagination({pageIndex: 0, pageSize: pagination.pageSize});
    }, [columnFilters]);

    /*
     * /functions
     */

    return (
        <Paper className={`main-container-${themeMode}`}>
            <PageHeader title={"🤵 Users List"}/>
            <BasicCard
                header=""
                headerChildren={
                    <CardTopActions
                        firstAction={() => {
                        }}
                        secondTitle={"Add User"}
                        secondAction={() => {
                            setSelectedUser(DEFAULT_USER_INFORMATION);
                            setOpenManageUserModal(true);
                        }}
                    />
                }
            >
                {isLoading ? (
                    <LoadingComponent/>
                ) : (
                    <>

                        <div data-testid={"table"} style={{width: "100%"}}>
                            <DataTable
                                ref={tableInstanceRef}
                                columns={columns}
                                data={data.data.data}
                                isFetching={isFetching}
                                pagination={pagination}
                                setPagination={setPagination}
                                remoteFilter={setColumnFilters}
                                columnFilters={columnFilters}
                                totalCount={data.totalItems}
                                // onRowClicked={(row: any) => handleShowUserInfo(row.id)}
                                hasRowAction={true}
                                editRow={handleEditRole}
                                disableRowSelection={true}
                            />
                        </div>
                    </>
                )}
                {isFetching && <div data-testid={"fetching"}></div>}
            </BasicCard>
            <LeftModal
                title={
                    selectedUser?.id === 0 ? "🧑 Create User" : "✏️ Edit User"
                }
                open={openManageUserModal}
                maxWidth={"sm"}
                handleClose={handleCloseManageModal}
                handleAdd={handleAddAdmin}
                buttonLabel={selectedUser?.id === 0 ? "Submit" : "Apply"}
            >
                <NewUser
                    ref={newUserRef}
                    data={selectedUser?.id === 0 ? DEFAULT_USER_INFORMATION : selectedUser!}
                    closeModal={closeCreateEditModal}
                />
            </LeftModal>
        </Paper>
    );
};

export default AllUsers;
