import React, {useEffect, useMemo, useRef, useState} from "react";
import DataTable from "../../components/DataTable/DataTable";
import {Button, Checkbox, MenuItem, Paper} from "@mui/material";
import {MRT_ColumnDef, MRT_ColumnFiltersState, MRT_PaginationState} from "material-react-table";
import BasicCard from "../../components/Card/BasicCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import {useCustomTableQuery} from "../../hooks/use-custom-table-query";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import {useThemeContext} from "../../ThemeContext";
import Aed from "../../services/Aed";
import LeftModal from "../../components/Modal/LeftModal";
import DateTimeFilter, {
    DateTimeFilterType,
    NewFilterHandle
} from "../../components/CustomDateTimeFilter/DateTimeFilter";
import AedImage from "../../assets/images/aed.png"
import CardTopActions from "../../components/CardTopActions/CardTopActions";
import NewAed from "./NewAed";
import {AedType, NewAedHandle} from './constants';
import {convertTimeToLocale2, getJalaliDateTime} from "../../utils/TimeUtils/time";
import Select from "@mui/material/Select";
import {useNavigate} from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import {useAuthState} from "../../context/AuthContext";
import {getItemSecure} from "../../utils/AESCrypto/AESCrypto";
import {tError, tSuccess} from "../../utils/ToastUtils/toast";
import AedDetails from "./AedDetails";
import {DEFAULT_AED_INFORMATION, testOptions } from "./constants";

const AllAeds = () => {

    const {
        getAll,
        deleteAed
    } = new Aed();

    const {isAdmin, isSuperAdmin} = useAuthState();
    const navigate = useNavigate();
    const newAedRef = useRef<NewAedHandle>(null);
    const {themeMode} = useThemeContext();
    const timeFilterRef = useRef<NewFilterHandle>(null);
    const tableInstanceRef = useRef(null);
    const [refetchTableData, setRefetchTableData] = useState<boolean>(true);
    const [dateFilters, setDateFilters] = useState<DateTimeFilterType | undefined>({
        from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        to: new Date(Date.now()).toISOString()
    });
    const [openTimeFilterModal, setOpenTimeFilterModal] =
        useState<boolean>(false);

    const [openManageAedModal, setOpenManageAedModal] =
        useState<boolean>(false);

    const [openDetailsAedModal, setOpenDetailsAedModal] =
        useState<boolean>(false);

    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>((isSuperAdmin || isAdmin) ? [{
        id: 'registerDateTime',
        value: {from: dateFilters?.from, to: dateFilters?.to}
    }] : []);
    const [query, setQuery] = useState<string>("");
    const [selectedAed, setSelectedAed] = useState<AedType>();
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const {data, isFetching, isLoading} = useCustomTableQuery(
        "aeds",
        refetchTableData,
        pagination,
        getAll,
        query
    );


    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                id: 'row-number',
                header: '#',
                size: 50,
                enableHiding: false,
                Cell: ({row, table}) => {
                    const {pageIndex, pageSize} = table.getState().pagination;
                    return pageIndex * pageSize + row.index + 1;
                }
            },
            {
                accessorKey: "serialNumber",
                header: "Serial Number",
                enableHiding: false,
                maxSize: 20,
                enableSorting: false,
                accessorFn: (row: any) => row.serialNumber === null ? "" : row.serialNumber,
            },
            {
                accessorKey: "registerExpert",
                header: "Register Expert",
                enableHiding: false,
                maxSize: 20,
                enableSorting: false,
                accessorFn: (row: any) => row.user === null ? "-" : row.user?.fullName,
            },
            {
                accessorKey: "aedBatteryType",
                header: "Battery Type",
                maxSize: 10,
                Cell: ({cell}) => {
                    const value = cell.getValue<string>();
                    return value === "Chargeable"
                        ? "⚡ Chargeable"
                        : value === "NonChargeable"
                            ? "🔋 Non-Chargeable"
                            : value;
                },
                filterFn: (row, columnId, filterValue) => {
                    if (filterValue === 'all') return true;
                    const value = row.getValue<string>(columnId);
                    return value === filterValue;
                },
                Filter: ({column}) => (
                    <Select
                        sx={{
                            width: '100%',
                            fontSize: '0.875rem',
                            padding: '0 8px',
                        }}
                        size="small"
                        value={(column.getFilterValue() as string) ?? 'all'}
                        onChange={(e) => column.setFilterValue(e.target.value)}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="Chargeable">Chargeable</MenuItem>
                        <MenuItem value="NonChargeable">Non-Chargeable</MenuItem>
                    </Select>
                ),
                filterVariant: 'select',
            },
            {
                accessorKey: "location.province",
                header: "Province",
                maxSize: 20,
                enableSorting: false,
                accessorFn: (row: any) => row.location?.province === null ? "" : row.location?.province,
            },
            {
                accessorKey: "location.city",
                header: "City",
                maxSize: 20,
                enableSorting: false,
                accessorFn: (row: any) => row.location?.city === null ? "" : row.location?.city,
            },
            // {
            //     accessorKey: "location.city",
            //     header: "City",
            //     maxSize: 20,
            //     enableSorting: false,
            //     accessorFn: (row: any) => row.location?.city === null ? "" : row.location?.city,
            // },
            {
                accessorKey: "location.place",
                header: "Place",
                maxSize: 20,
                enableSorting: false,
                accessorFn: (row: any) => row.location?.place === null ? "" : row.location?.place,
            },
            {
                accessorKey: "registerDateTime",
                header: "Register Date",
                maxSize: 20,
                enableSorting: false,
                enableColumnFilter: false,
                accessorFn: (row: any) => row.registerDateTime === null ? "" : getJalaliDateTime(row?.registerDateTime),
            },
            {
                accessorKey: "lastPmDateTime",
                header: "Last PM Date",
                maxSize: 20,
                enableSorting: false,
                enableColumnFilter: false,
                accessorFn: (row: any) => row.lastPmDateTime === null ? "" : row.lastPmDateTime === '0001-01-01T00:00:00' ? '-' : getJalaliDateTime(row?.lastPmDateTime),
            },
            {
                accessorKey: "internalTestResult",
                header: "Last Self Test",
                Cell: ({cell}) => {
                    const value = cell.getValue<string>();
                    switch (value) {
                        case 'NoWifi':
                            return "📛 No Wifi";
                        case 'Pass':
                            return '✅ Passed';
                        case 'Fail':
                            return '❌ Failed';
                        case 'Disconnected':
                            return '🔌 Disconnected';
                    }
                },
                filterFn: (row, columnId, filterValue) => {
                    if (!Array.isArray(filterValue) || filterValue.length === 0) return true;
                    const value = row.getValue<string>(columnId);
                    return filterValue.includes(value);
                },
                Filter: ({column}) => (
                    <Select
                        multiple
                        displayEmpty
                        value={column.getFilterValue() ?? []}
                        onChange={(e) => {
                            let selected: string[] = e.target.value as string[];
                            if (selected.includes("all")) {
                                if (selected.length === testOptions.length + 1) {
                                    column.setFilterValue([]);
                                } else {
                                    column.setFilterValue(testOptions.map(o => o.value));
                                }
                            } else {
                                column.setFilterValue(selected);
                            }
                        }}
                        renderValue={(selected) => {
                            if ((selected as string[]).length === 0) {
                                return "All";
                            }
                            selected = (column.getFilterValue() as string[] | undefined) ?? [];

                            return testOptions
                                .filter(opt => (selected as string[]).includes(opt.value))
                                .map(opt => opt.label)
                                .join(", ");
                        }}
                        sx={{
                            width: '100%',
                            fontSize: '0.875rem',
                            '& .MuiSelect-select': {
                                paddingTop: 1.3,
                                paddingBottom: 1.1,
                            },
                        }}
                    >
                        <MenuItem value="all">
                            <Checkbox
                                checked={
                                    ((column.getFilterValue() as string[] | undefined) ?? []).length === testOptions.length
                                }
                                indeterminate={
                                    ((column.getFilterValue() as string[] | undefined)?.length ?? 0) > 0 &&
                                    ((column.getFilterValue() as string[] | undefined)?.length ?? 0) < testOptions.length
                                }
                            />
                            <ListItemText primary="All"/>
                        </MenuItem>
                        {testOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                <Checkbox
                                    checked={((column.getFilterValue() as string[] | undefined) ?? []).includes(option.value)}
                                />
                                <ListItemText primary={option.label}/>
                            </MenuItem>
                        ))}
                    </Select>
                ),
                filterVariant: 'select',
            },
        ],
        []
    );

    const handleCloseModalWithSavedDateTime = async () => {
        setOpenTimeFilterModal(false);
        let dates = timeFilterRef?.current?.setBoundaries();
        setDateFilters(dates);
        if (dates !== null) {
            let colFil = columnFilters.filter(s => s.id !== 'registerDateTime');
            colFil.push({
                id: 'registerDateTime', value: {from: dates?.from, to: dates?.to}
            });
            setColumnFilters(colFil);
            setPagination({pageIndex: 0, pageSize: pagination.pageSize});
        }
    }

    const handleCloseTimeFilter = () => {
        setOpenTimeFilterModal(false);
    }

    const handleCloseManageModal = (): void => {
        setSelectedAed(DEFAULT_AED_INFORMATION);
        setOpenManageAedModal(false);
    };

    const handleAddAed = async () => {
        newAedRef?.current?.sendRequest();
    };

    const closeCreateEditModal = () => {
        setSelectedAed(DEFAULT_AED_INFORMATION);
        setOpenManageAedModal(false);
        setRefetchTableData(!refetchTableData);
    }

    const handleRowSelfTests = (row: any) => {
        navigate('/dashboard/selfTests?id=' + row.id, {state: {row}});
    }

    const handleRowServices = (row: any) => {
        navigate('/dashboard/services?id=' + row.id, {state: {row}});
    }

    const handleEditAed = (row: any) => {
        setSelectedAed({
            id: row.id,
            serialNumber: row.serialNumber,
            address: row.location.address,
            province: row.location.province,
            place: row.location.place,
            registerDateTime: row.registerDateTime,
            aedBatteryType: row.aedBatteryType,
            city: row.location.city,
            position: [row.location.lat, row.location.long]
        });
        setOpenManageAedModal(true);
    };

    const handleCloseDetailsModal = () => {
        setOpenDetailsAedModal(false);
    }

    function toODataPath(input: string): string {
        return input
            .split('.')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('/');
    }

    const isInUserRole = () => {
        return !isAdmin && !isSuperAdmin;
    }

    const handleDelete = (id: any) => {
        deleteAed(id).then(res => {
            if (res.isSuccess) {
                tSuccess(res?.data);
                setRefetchTableData(!refetchTableData);
            } else {
                tError("There is problem with deleting item.")
            }
        }).catch(err => {
            tError(err.response.data.Message);
        })
    }

    const handleShowDetails = (row: any) => {
        setSelectedAed(row);
        setOpenDetailsAedModal(true);
    }

    useEffect(() => {
        let filterString = columnFilters
            .filter((item: any) => {
                return !(item.id === 'aedBatteryType' && item.value === 'all');
            })
            .filter((item: any) => {
                return !(item.id === 'internalTestResult' && item.value === 'all');
            })
            .map((item: any) => {
                let key = item.id;
                if (key.toString().includes('.')) {
                    key = toODataPath(key.toString());
                }
                if (key === 'aedBatteryType')
                    return `${key} eq '${item.value}'`;

                if (key === 'registerDateTime' && (isSuperAdmin || isAdmin))
                    return `registerDateTime ge ${item.value?.from} and registerDateTime le ${item.value?.to}`;

                if (key === 'internalTestResult') {
                    if (!item.value || item.value.length === 0) return null;
                    const multiFilters = item.value.map((val: string) => `${key} eq '${val}'`);
                    return `(${multiFilters.join(' or ')})`;
                }

                const value = item.value?.trim?.() ?? '';
                return `contains(${key},'${value}')`;

            })
            .filter(Boolean)
            .join(" and ");

        setQuery(filterString);
        setPagination({pageIndex: 0, pageSize: pagination.pageSize});
    }, [columnFilters]);

    useEffect(() => {
        if (isInUserRole()) {
            const province = getItemSecure('province');
            if (province !== null && province !== "") {
                setColumnFilters([...columnFilters, {
                    id: 'Location/Province', value: province
                }]);
            }
        }
    }, []);


    return (
        <Paper className={`main-container-${themeMode}`}>
            <PageHeader title={
                <>
                    <img
                        src={AedImage}
                        alt="AED"
                        style={{
                            width: '3.5rem',
                            height: '3.5rem',
                            verticalAlign: 'middle',
                            marginRight: '0.3em',
                        }}
                    />
                    AED List
                </>
            }/>
            <BasicCard
                header=""
                headerChildren={
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>

                        {
                            (isAdmin || isSuperAdmin) ? (<Button onClick={() => {
                                setOpenTimeFilterModal(true);
                            }}>⌚ Register Date Filter</Button>) : <></>
                        }

                        <CardTopActions
                            firstAction={() => {
                            }}
                            secondTitle={(isSuperAdmin || isAdmin) ? undefined : "Add AED"}
                            secondAction={() => {
                                setSelectedAed(DEFAULT_AED_INFORMATION);
                                setOpenManageAedModal(true);
                            }}
                        />
                    </div>
                }
            >
                {isLoading ? (
                    <LoadingComponent/>
                ) : (
                    <>
                        <div data-testid={"table"} style={{width: "100%"}}>
                            <DataTable
                                ref={tableInstanceRef}
                                columns={isInUserRole() ? columns.filter(s => s?.accessorKey !== 'location.province') : columns}
                                data={data.data.data}
                                isFetching={isFetching}
                                pagination={pagination}
                                setPagination={setPagination}
                                remoteFilter={setColumnFilters}
                                columnFilters={columnFilters}
                                totalCount={data.totalItems}
                                hasRowAction={true}
                                disableRowSelection={true}
                                columnVisibility={columnVisibility}
                                setColumnVisibility={setColumnVisibility}
                                editRow={handleEditAed}
                                rowSelfTests={handleRowSelfTests}
                                rowServices={handleRowServices}
                                deleteRow={isSuperAdmin || isAdmin ? handleDelete : undefined}
                                showRowDetail={handleShowDetails}
                                onRowClicked={handleShowDetails}
                            />
                        </div>
                    </>
                )}
                {isFetching && <div data-testid={"fetching"}></div>}
            </BasicCard>

            <LeftModal
                title={
                    selectedAed?.id === '0' ? "🖥️ Create Aed" : "✏️ Edit Aed"
                }
                open={openManageAedModal}
                maxWidth={"md"}
                handleClose={handleCloseManageModal}
                handleAdd={handleAddAed}
                buttonLabel={selectedAed?.id === '0' ? "Submit" : "Apply"}
            >
                <NewAed
                    ref={newAedRef}
                    data={selectedAed?.id === '0' ? {
                        ...DEFAULT_AED_INFORMATION,
                        province: !isSuperAdmin && !isAdmin ? (getItemSecure('province') ?? 'Tehran') : 'Tehran'
                    } : selectedAed!}
                    closeModal={closeCreateEditModal}
                />
            </LeftModal>

            <LeftModal
                title={"⏰ Time Filter"}
                open={openTimeFilterModal}
                maxWidth={"sm"}
                handleClose={handleCloseTimeFilter}
                handleAdd={handleCloseModalWithSavedDateTime}
                buttonLabel={"Apply"}
            >
                <DateTimeFilter ref={timeFilterRef} data={dateFilters}/>
            </LeftModal>

            <LeftModal
                title={
                    "👀 Aed Details"
                }
                open={openDetailsAedModal}
                maxWidth={"xl"}
                handleClose={handleCloseDetailsModal}
            >
                <AedDetails aedId={selectedAed?.id}/>
            </LeftModal>
        </Paper>
    );
};

export default AllAeds;
