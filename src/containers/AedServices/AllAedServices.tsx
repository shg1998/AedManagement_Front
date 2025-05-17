import React, {useEffect, useMemo, useRef, useState} from "react";
import DataTable from "../../components/DataTable/DataTable";
import {Button, Checkbox, MenuItem, Paper} from "@mui/material";
import {MRT_ColumnDef, MRT_ColumnFiltersState, MRT_PaginationState} from "material-react-table";
import BasicCard from "../../components/Card/BasicCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import {useCustomTableQuery} from "../../hooks/use-custom-table-query";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import {useThemeContext} from "../../ThemeContext";
import LeftModal from "../../components/Modal/LeftModal";
import DateTimeFilter, {
    DateTimeFilterType,
    NewFilterHandle
} from "../../components/CustomDateTimeFilter/DateTimeFilter";
import {useLocation} from "react-router-dom";
import {convertTimeToLocale2, getJalaliDateTime} from "../../utils/time";
import AedService from "../../services/AedService";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import CardTopActions from "../../components/CardTopActions/CardTopActions";
import {AedType, NewAedHandle} from "../Aeds/NewAed";
import {
    AedServiceDetailsType,
    AedServiceType,
    correctiveActionOptions,
    DEFAULT_AED_SERVICE_INFORMATION,
    PartType,
    ReplacementPartType
} from "./constants";
import NewAedService from "./NewAedService";
import {useQuery} from "react-query";
import AedServiceDetails from "./AedServiceDetails";

const AllAedServices = () => {

    const {
        getAll,
        getAedServiceById
    } = new AedService();

    const newAedServiceRef = useRef<NewAedHandle>(null);
    const {themeMode} = useThemeContext();
    const timeFilterRef = useRef<NewFilterHandle>(null);
    const tableInstanceRef = useRef(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const aedId = searchParams.get('id');


    const [mode, setMode] = useState<'edit' | 'detail'>('detail');
    const [refetchTableData, setRefetchTableData] = useState<boolean>(true);
    const [dateFilters, setDateFilters] = useState<DateTimeFilterType | undefined>({
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 6 years
        to: new Date(Date.now()).toISOString()
    });
    const [selectedAedServiceId, setSelectedAedServiceId] = useState<string>();
    const [openTimeFilterModal, setOpenTimeFilterModal] =
        useState<boolean>(false);
    const [openDetailsModal, setOpenDetailsModal] =
        useState<boolean>(false);
    const [openManageAedServiceModal, setOpenManageAedServiceModal] =
        useState<boolean>(false);
    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([{
        id: 'aedId', value: aedId
    }, {
        id: 'callDate', value: {from: dateFilters?.from, to: dateFilters?.to}
    }]);
    const [query, setQuery] = useState<string>();
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

    const {data: aedServiceEditData, isLoading: aedServiceEditLoading} = useQuery<AedServiceType>(
        ["aed-service-edit", selectedAedServiceId],
        async () => {
            const res = await getAedServiceById(selectedAedServiceId!);
            const finalRes = res.data;
            setOpenManageAedServiceModal(true);
            return {
                id: finalRes.id,
                correctiveActionGroup: finalRes.correctiveActionGroup,
                visitDate: finalRes.visitDate,
                callDate: finalRes.callDate,
                description: finalRes.description,
                cost: finalRes.cost,
                userId: finalRes.userId,
                user: finalRes.user,
                aedId: finalRes.aedId,
                nonConformityId: finalRes.nonConformityId,
                nonConformity: finalRes.nonConformity,
                replacementParts: finalRes.replacementParts.map((rp: any) => {
                    return {
                        prevSerialNumber: rp.prevSerialNumber,
                        newSerialNumber: rp.newSerialNumber,
                        prevPartId: rp.prevPart.id,
                        newPartId: rp.newPart.id
                    }
                }),
            };
        },
        {
            enabled: mode === 'edit' && !!selectedAedServiceId && selectedAedServiceId !== "0",
            staleTime: 0,
            cacheTime: 0,
        }
    );

    const {data: aedServiceDetails, isLoading: aedServiceDetailsLoading} = useQuery<AedServiceDetailsType>(
        ["aed-service-details", selectedAedServiceId],
        async () => {
            const res = await getAedServiceById(selectedAedServiceId!);
            const finalRes = res.data;
            setOpenDetailsModal(true);
            return {
                correctiveActionGroup: finalRes.correctiveActionGroup,
                visitDate: finalRes.visitDate,
                callDate: finalRes.callDate,
                description: finalRes.description,
                cost: finalRes.cost,
                user: {
                    fullName: finalRes.user.fullName,
                    username: finalRes.user.username,
                    province: finalRes.user.province ?? '',
                },
                nonConformity: finalRes.nonConformity.title,
                replacementParts: finalRes.replacementParts.map((rp: any) => {
                    return {
                        prevSerialNumber: rp.prevSerialNumber,
                        newSerialNumber: rp.newSerialNumber,
                        prevPartName: rp.prevPart.name,
                        prevPartNumber: rp.prevPart.partNumber,
                        newPartName: rp.newPart.name,
                        newPartNumber: rp.newPart.partNumber,
                    }
                }),
            };
        },
        {
            enabled: mode === 'detail' && !!selectedAedServiceId && selectedAedServiceId !== "0",
            staleTime: 0,
            cacheTime: 0,
        }
    );

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                id: 'row-number',
                header: '#',
                size: 10,
                enableHiding: false,
                Cell: ({row, table}) => {
                    const {pageIndex, pageSize} = table.getState().pagination;
                    return pageIndex * pageSize + row.index + 1;
                }
            },
            {
                accessorKey: "callDate",
                header: "Call Time",
                enableHiding: false,
                maxSize: 20,
                enableSorting: false,
                enableColumnFilter: false,
                accessorFn: (row: any) => row.callDate === null ? "" : getJalaliDateTime(row.callDate),
            },
            {
                accessorKey: "correctiveActionGroup",
                header: "Corrective Action Group",
                enableSorting: false,
                Cell: ({cell}) => {
                    const value = cell.getValue<string>();
                    switch (value) {
                        case 'Repair':
                            return "🔧 Repair";
                        case 'Pm':
                            return '🧰 Pm';
                        case 'Recall':
                            return '📢 Recall';
                        case 'Upgrade':
                            return '⬆️ Upgrade';
                        case 'Training':
                            return '🎓 Training';
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
                                if (selected.length === correctiveActionOptions.length + 1) {
                                    column.setFilterValue([]);
                                } else {
                                    column.setFilterValue(correctiveActionOptions.map(o => o.value));
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

                            return correctiveActionOptions
                                .filter(opt => (selected as string[]).includes(opt.value))
                                .map(opt => opt.label)
                                .join(", ");
                        }}
                        sx={{
                            width: '100%',
                            fontSize: "0.875rem",
                            mt: 1
                        }}
                    >
                        <MenuItem value="all">
                            <Checkbox
                                checked={
                                    ((column.getFilterValue() as string[] | undefined) ?? []).length === correctiveActionOptions.length
                                }
                                indeterminate={
                                    ((column.getFilterValue() as string[] | undefined)?.length ?? 0) > 0 &&
                                    ((column.getFilterValue() as string[] | undefined)?.length ?? 0) < correctiveActionOptions.length
                                }
                            />
                            <ListItemText primary="All"/>
                        </MenuItem>
                        {correctiveActionOptions.map((option) => (
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
            {
                accessorKey: "visitDate",
                header: "Visit Time",
                enableHiding: false,
                maxSize: 20,
                enableSorting: false,
                enableColumnFilter: false,
                accessorFn: (row: any) => row.visitDate === null ? "" : getJalaliDateTime(row.visitDate),
            },
            {
                accessorKey: "user.fullName",
                header: "Expert",
                maxSize: 20,
                enableSorting: false,
                accessorFn: (row: any) => row.user.fullName === null ? "" : row.user?.fullName,
            },
            {
                accessorKey: "cost",
                header: "Cost",
                enableSorting: false,
                Cell: ({cell}) => {
                    return cell.getValue<string>();
                },
                filterFn: (row, columnId, filterValue) => {
                    if (!Array.isArray(filterValue) || filterValue.length === 0) return true;
                    const value = row.getValue<string>(columnId);
                    return filterValue.includes(value);
                },
                Filter: ({column}) => (
                    <Select
                        value={(column.getFilterValue() as string) ?? 'all'}
                        onChange={(e) => column.setFilterValue(e.target.value)}
                        sx={{
                            width: '100%',
                            fontSize: "0.875rem",
                            mt: 1
                        }}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="Free">Free</MenuItem>
                        <MenuItem value="Guarantee">Guarantee</MenuItem>
                        <MenuItem value="Sale">Sale</MenuItem>
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
            let colFil = columnFilters.filter(s => s.id !== 'callDate');
            colFil.push({
                id: 'callDate', value: {from: dates?.from, to: dates?.to}
            });
            setColumnFilters(colFil);
            setPagination({pageIndex: 0, pageSize: pagination.pageSize});
        }
    }

    const handleCloseTimeFilter = () => {
        setOpenTimeFilterModal(false);
    }

    const handleCloseDetails = () => {
        setOpenDetailsModal(false);
        setSelectedAedServiceId('0');
    }

    function toODataPath(input: string): string {
        return input
            .split('.')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('/');
    }

    const handleEditService = (row: any) => {
        setSelectedAedServiceId(row.id);
        setMode('edit');
    }

    const handleShowDetails = (row: any) => {
        setSelectedAedServiceId(row.id);
        setMode('detail');
    }

    const handleCloseManageModal = (): void => {
        setSelectedAedServiceId('0');
        setOpenManageAedServiceModal(false);
    };

    const handleAddAedService = async () => {
        newAedServiceRef?.current?.sendRequest();
    };

    const closeCreateEditModal = () => {
        setSelectedAedServiceId('0');
        setOpenManageAedServiceModal(false);
        setRefetchTableData(!refetchTableData);
    }

    useEffect(() => {
        let filterString = columnFilters
            .filter((item: any) => {
                return !(item.id === 'correctiveActionGroup' && item.value === 'all');
            })
            .filter((item: any) => {
                return !(item.id === 'cost' && item.value === 'all');
            })
            .map((item: any) => {
                let key = item.id;
                if (key.toString().includes('.')) {
                    key = toODataPath(key.toString());
                }

                if (key === 'aedId')
                    return `${key} eq ${item.value}`;

                if (key === 'cost')
                    return `${key} eq '${item.value}'`;

                if (key === 'callDate')
                    return `callDate ge ${item.value?.from} and callDate le ${item.value?.to}`;

                if (key === 'correctiveActionGroup') {
                    if (!item.value || item.value.length === 0) return null;
                    const multiFilters = item.value.map((val: string) => `${key} eq '${val}'`);
                    return `(${multiFilters.join(' or ')})`;
                }

                const value = item.value.trim();
                return `contains(${key},'${value}')`;

            })
            .join(" and ");

        setQuery(filterString);
        setPagination({pageIndex: 0, pageSize: pagination.pageSize});
    }, [columnFilters]);


    return (
        <Paper className={`main-container-${themeMode}`}>
            <PageHeader title={
                <>
                    ⚒️ AED Services (Serial : {location?.state?.row?.serialNumber})
                </>
            }/>
            <BasicCard
                header=""
                headerChildren={
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>

                        <Button onClick={() => {
                            setOpenTimeFilterModal(true);
                        }}>⌚ Call Time Filter</Button>

                        <CardTopActions
                            firstAction={() => {
                            }}
                            secondTitle={"Add AED Service"}
                            secondAction={() => {
                                setSelectedAedServiceId('0');
                                setOpenManageAedServiceModal(true);
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
                                columns={columns}
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
                                editRow={handleEditService}
                                showRowDetail={handleShowDetails}
                            />
                        </div>
                    </>
                )}
                {isFetching && <div data-testid={"fetching"}></div>}
            </BasicCard>

            <LeftModal
                title={
                    selectedAedServiceId === '0' ? "🧑‍🏭 Add Service" : "✏️ Edit Service"
                }
                open={openManageAedServiceModal}
                maxWidth={"sm"}
                handleClose={handleCloseManageModal}
                handleAdd={handleAddAedService}
                buttonLabel={selectedAedServiceId === '0' ? "Submit" : "Apply"}
            >
                <NewAedService
                    ref={newAedServiceRef}
                    data={selectedAedServiceId === '0' ? DEFAULT_AED_SERVICE_INFORMATION : aedServiceEditData!}
                    closeModal={closeCreateEditModal}
                />
            </LeftModal>

            <LeftModal
                title={"Aed Service Details"}
                open={openDetailsModal}
                maxWidth={"md"}
                handleClose={handleCloseDetails}
            >
                <AedServiceDetails data={aedServiceDetails}/>
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

            {
                (aedServiceEditLoading || aedServiceDetailsLoading) && <LoadingComponent/>
            }
        </Paper>
    );
};

export default AllAedServices;
