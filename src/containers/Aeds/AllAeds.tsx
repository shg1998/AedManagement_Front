import React, {useEffect, useMemo, useRef, useState} from "react";
import DataTable from "../../components/DataTable/DataTable";
import {Button, Paper} from "@mui/material";
import {MRT_ColumnDef, MRT_ColumnFiltersState, MRT_PaginationState} from "material-react-table";
import BasicCard from "../../components/Card/BasicCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import {useCustomTableQuery} from "../../hooks/use-custom-table-query";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import {useThemeContext} from "../../ThemeContext";
import CyberCrimes from "../../services/CyberCrimes";
import LeftModal from "../../components/Modal/LeftModal";
import DateTimeFilter, {
    DateTimeFilterType,
    NewFilterHandle
} from "../../components/CustomDateTimeFilter/DateTimeFilter";
import AedImage from "../../assets/images/aed.png"

export type CyberCrimesObject = {
    id?: string;
    requestStatusTXT?: string;
    webServiceTrackingCode?: string;
    requestSubtitleTXT?: string;
    timeRegistration?: string;
    handReferralTimeByKashef?: string;
    senderNameTXT?: string;
    caseNumber?: string;
    originalOrderTrackingCode?: string;
    nameIssuingOrder?: string;
    receiverTXT?: string;
    bankNameTXT?: string;
    destinationBankNameTXT?: string;
    orderRegistrationAuthorityTXT?: string;
    judicialOfficeIssuingOrder?: string;
    name?: string;
    autocompletePosition?: string;
    mainTitleRequestTXT?: string;
    description?: string;
    fileType?: string;
    additionalExplanationTriage?: string;
    dateOrganizationOrder?: string;
};

const AllAeds = () => {

    const {
        getCyberCrimes,
    } = new CyberCrimes();

    const {themeMode, theme} = useThemeContext();
    const timeFilterRef = useRef<NewFilterHandle>(null);
    const tableInstanceRef = useRef(null);
    const [refetchTableData, setRefetchTableData] = useState<boolean>(true);
    const [dateFilters, setDateFilters] = useState<DateTimeFilterType | undefined>({
        from: new Date(Date.now() - 2190 * 24 * 60 * 60 * 1000).toISOString(), // 6 years
        to: new Date(Date.now()).toISOString()
    });
    const [openTimeFilterModal, setOpenTimeFilterModal] =
        useState<boolean>(false);
    const [timeQuery, setTimeQuery] = useState<string>(`date ge ${dateFilters?.from} and date le ${dateFilters?.to}`);
    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
    const [query, setQuery] = useState<string>("");

    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const {data, isFetching, isLoading} = useCustomTableQuery(
        "cyberCrimes",
        refetchTableData,
        pagination,
        getCyberCrimes,
        query + timeQuery
    );

    const columns = useMemo<MRT_ColumnDef<CyberCrimesObject>[]>(
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
                accessorKey: "batteryType",
                header: "Battery Type",
                maxSize: 20,
                enableSorting: false,
                accessorFn: (row: any) => row.batteryType === null ? "" : row.batteryType,
            },
            {
                accessorKey: "location.province",
                header: "Province",
                maxSize: 20,
                enableSorting: false,
                accessorFn: (row: any) => row.location.province === null ? "" : row.location.province,
            },
            {
                accessorKey: "location.city",
                header: "City",
                maxSize: 20,
                enableSorting: false,
                accessorFn: (row: any) => row.location.city === null ? "" : row.location.city,
            },
            {
                accessorKey: "location.place",
                header: "Place",
                maxSize: 20,
                enableSorting: false,
                accessorFn: (row: any) => row.location.place === null ? "" : row.location.place,
            },
            {
                accessorKey: "registerDateTime",
                header: "Register Date",
                maxSize: 20,
                enableSorting: false,
                accessorFn: (row: any) => row.registerDateTime === null ? "" : row.registerDateTime,
            },
            {
                accessorKey: "lastPmDateTime",
                header: "Last PM Date",
                maxSize: 20,
                enableSorting: false,
                accessorFn: (row: any) => row.lastPmDateTime === null ? "" : row.lastPmDateTime,
            },
            {
                accessorKey: "internalTestResult",
                header: "Last Self Test",
                maxSize: 20,
                enableSorting: false,
                accessorFn: (row: any) => row.internalTestResult === null ? "" : row.internalTestResult,
            },
        ],
        []
    );

    const handleShowUserInfo = (rowData: any) => {

    }

    const handleCloseModalWithSavedDateTime = async () => {
        setOpenTimeFilterModal(false);
        let dates = timeFilterRef?.current?.setBoundaries();
        setDateFilters(dates);
        if (dates !== null) {
            let newQuery = query !== "" ? ` date ge ${dates?.from} and date le ${dates?.to}` : `date ge ${dates?.from} and date le ${dates?.to}`;
            setPagination({pageIndex: 0, pageSize: pagination.pageSize});
            setTimeQuery(newQuery);
        }
    }

    const handleCloseTimeFilter = () => {
        setOpenTimeFilterModal(false);
    }


    useEffect(() => {
        let filterString = columnFilters
            .map((item: any) => {
                const value = item.value.trim();
                return `contains(${item.id},'${value}')`;
            })
            .join(" and ");
        if (timeQuery !== "" && columnFilters.length > 0)
            filterString += " and ";

        setQuery(filterString);
        setPagination({pageIndex: 0, pageSize: pagination.pageSize});
    }, [columnFilters]);


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
                    <>
                        <Button onClick={() => {
                            setOpenTimeFilterModal(true);
                        }}>⌚ Time Filter</Button>
                    </>
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
                                onRowClicked={(row: any) => handleShowUserInfo(row)}
                                hasRowAction={false}
                                disableRowSelection={true}
                                columnVisibility={columnVisibility}
                                setColumnVisibility={setColumnVisibility}
                            />
                        </div>
                    </>
                )}
                {isFetching && <div data-testid={"fetching"}></div>}
            </BasicCard>

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
        </Paper>
    );
};

export default AllAeds;
