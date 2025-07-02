import React, {useEffect, useRef, useState} from "react";
import DataTable from "../../components/DataTable/DataTable";
import {Button, Paper} from "@mui/material";
import {MRT_ColumnFiltersState, MRT_PaginationState} from "material-react-table";
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
import AedService from "../../services/AedService";
import CardTopActions from "../../components/CardTopActions/CardTopActions";
import {NewAedHandle} from "../Aeds/NewAed";
import {
    AedServiceDetailsType, AedServicesProps,
    AedServiceType,
    DEFAULT_AED_SERVICE_INFORMATION
} from "./constants";
import NewAedService from "./NewAedService";
import {useQuery} from "react-query";
import AedServiceDetails from "./AedServiceDetails";
import {tSuccess} from "../../utils/ToastUtils/toast";
import {useAuthState} from "../../context/AuthContext";

const AedServices: React.FC<AedServicesProps> = ({process, columns}) => {

    const {
        getAll,
        getAedServiceById,
        deleteAedService
    } = new AedService();
    const {isAdmin, isSuperAdmin} = useAuthState();
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
        from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
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
    const restOfFilters = [
        {
            id: 'aedId', value: aedId
        },
        {
            id: 'correctiveActionGroup', value: process
        }
    ]

    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(isAdmin || isSuperAdmin ? [...restOfFilters, {
        id: 'visitDate', value: {from: dateFilters?.from, to: dateFilters?.to}
    }] : restOfFilters);
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
                repairTypeId: finalRes.repairTypeId,
                nonConformity: finalRes.nonConformity,
                repairType: finalRes.repairType,
                replacementParts: finalRes.replacementParts.map((rp: any) => {
                    return {
                        prevSerialNumber: rp.prevSerialNumber,
                        newSerialNumber: rp.newSerialNumber,
                        prevPartId: rp.prevPart.id,
                        newPartId: rp.newPart.id
                    }
                }),
                attachments: finalRes.attachments.map((at: any) => {
                    return {
                        id: at.id,
                        fileName: at.fileName,
                    }
                })
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
                attachments: finalRes.attachments
            };
        },
        {
            enabled: mode === 'detail' && !!selectedAedServiceId && selectedAedServiceId !== "0",
            staleTime: 0,
            cacheTime: 0,
        }
    );

    const handleCloseModalWithSavedDateTime = async () => {
        setOpenTimeFilterModal(false);
        let dates = timeFilterRef?.current?.setBoundaries();
        setDateFilters(dates);
        if (dates !== null) {
            let colFil = columnFilters.filter(s => s.id !== 'visitDate');
            colFil.push({
                id: 'visitDate', value: {from: dates?.from, to: dates?.to}
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

    const handleDeleteRow = (row: any) => {
        deleteAedService(row).then((res => {
            if (res.isSuccess) {
                tSuccess(res?.data);
                setRefetchTableData(!refetchTableData);
            } else {
                console.log(res)
            }
        }));
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

                if (key === 'correctiveActionGroup')
                    return `${key} eq '${item.value}'`;

                if (key === 'visitDate' && (isAdmin || isSuperAdmin))
                    return `visitDate ge ${item.value?.from} and visitDate le ${item.value?.to}`;

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
                    ⚒️ AED {process} (Serial : {location?.state?.row?.serialNumber})
                </>
            }/>
            <BasicCard
                header=""
                headerChildren={
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>

                        {
                            isAdmin || isSuperAdmin ? (<Button onClick={() => {
                                setOpenTimeFilterModal(true);
                            }}>⌚ Visit Time Filter</Button>) : <></>
                        }

                        <CardTopActions
                            firstAction={() => {
                            }}
                            secondTitle={isSuperAdmin || isAdmin ? undefined : "Add " + process}
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
                                onRowClicked={handleShowDetails}
                                deleteRow={isSuperAdmin || isAdmin ? handleDeleteRow : undefined}
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
                    data={selectedAedServiceId === '0' ? {
                        ...DEFAULT_AED_SERVICE_INFORMATION,
                        correctiveActionGroup: process
                    } : aedServiceEditData!}
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

export default AedServices;
