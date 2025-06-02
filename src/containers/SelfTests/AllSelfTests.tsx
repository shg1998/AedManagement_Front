import React, {useEffect, useMemo, useRef, useState} from "react";
import DataTable from "../../components/DataTable/DataTable";
import {Button, Paper} from "@mui/material";
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
import SelfTest from "../../services/SelfTest";
import {getJalaliDateTime} from "../../utils/time";
import SelfTestDetails from "./SelfTestDetails";
import {internalTestConverter} from "../../utils/SelfTestUtils";
import {AedSelfTestDetailsType} from "./constants";


const AllSelfTests = () => {

    const {
        getAll,
    } = new SelfTest();

    const {themeMode, theme} = useThemeContext();
    const timeFilterRef = useRef<NewFilterHandle>(null);
    const tableInstanceRef = useRef(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const aedId = searchParams.get('id');
    const [refetchTableData, setRefetchTableData] = useState<boolean>(true);
    const [dateFilters, setDateFilters] = useState<DateTimeFilterType | undefined>({
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 6 years
        to: new Date(Date.now()).toISOString()
    });
    const [openTimeFilterModal, setOpenTimeFilterModal] =
        useState<boolean>(false);

    const [openDetailsModal, setOpenDetailsModal] =
        useState<boolean>(false);
    const [selectedSelfTest, setSelectedSelfTest] = useState<AedSelfTestDetailsType>({});
    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([{
        id: 'aedId', value: aedId
    }, {
        id: 'sentTime', value: {from: dateFilters?.from, to: dateFilters?.to}
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
                accessorKey: "sentTime",
                header: "Sent Time",
                enableHiding: false,
                maxSize: 20,
                enableSorting: false,
                enableColumnFilter: false,
                accessorFn: (row: any) => row.sentTime === null ? "" : getJalaliDateTime(row.sentTime),
            },
            {
                accessorKey: "motherBoardVersion",
                header: "MotherBoard Version",
                maxSize: 20,
                enableSorting: false,
                accessorFn: (row: any) => row.motherBoardVersion === null ? "" : row.motherBoardVersion,
            },
            {
                accessorKey: "highVoltageBoardVersion",
                header: "HV Board Version",
                maxSize: 20,
                enableSorting: false,
                accessorFn: (row: any) => row.highVoltageBoardVersion === null ? "" : row.highVoltageBoardVersion,
            },
            {
                accessorKey: "saeBoardVersion",
                header: "SAE Board Version",
                maxSize: 20,
                enableSorting: false,
                accessorFn: (row: any) => row.saeBoardVersion === null ? "" : row.saeBoardVersion,
            },
            {
                accessorKey: "algorithmVersion",
                header: "Algorithm Version",
                maxSize: 20,
                enableSorting: false,
                accessorFn: (row: any) => row.algorithmVersion === null ? "" : row.algorithmVersion,
            },
            {
                accessorKey: "batteryRemain",
                header: "Battery Remain",
                maxSize: 20,
                enableSorting: false,
                accessorFn: (row: any) => row.batteryRemain === null ? "" : row.batteryRemain,
            },
            {
                accessorKey: "shockCount",
                header: "Shock Count",
                maxSize: 20,
                enableSorting: false,
                accessorFn: (row: any) => row.shockCount === null ? "" : row.shockCount,
            },
            {
                accessorKey: "internalTestResult",
                header: "Test Result",
                maxSize: 100,
                enableSorting: false,
                enableColumnFilter: false,
                accessorFn: (row: any) => row.internalTestResult === null ? "" : internalTestConverter(parseInt(row.internalTestResult)),
            },
        ],
        []
    );

    const handleCloseModalWithSavedDateTime = async () => {
        setOpenTimeFilterModal(false);
        let dates = timeFilterRef?.current?.setBoundaries();
        setDateFilters(dates);
        if (dates !== null) {
            let colFil = columnFilters.filter(s => s.id !== 'sentTime');
            colFil.push({
                id: 'sentTime', value: {from: dates?.from, to: dates?.to}
            });
            setColumnFilters(colFil);
            setPagination({pageIndex: 0, pageSize: pagination.pageSize});
        }
    }

    const handleCloseTimeFilter = () => {
        setOpenTimeFilterModal(false);
    }

    function toODataPath(input: string): string {
        return input
            .split('.')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('/');
    }

    useEffect(() => {
        let filterString = columnFilters
            .map((item: any) => {
                let key = item.id;
                if (key.toString().includes('.')) {
                    key = toODataPath(key.toString());
                }
                if (key === 'aedId')
                    return `${key} eq ${item.value}`;

                if (key === 'sentTime')
                    return `sentTime ge ${item.value?.from} and sentTime le ${item.value?.to}`

                const value = item.value.trim();
                return `contains(${key},'${value}')`;

            })
            .join(" and ");

        setQuery(filterString);
        setPagination({pageIndex: 0, pageSize: pagination.pageSize});
    }, [columnFilters]);

    const handleShowDetails = (row: any) => {
        console.log(location?.state?.row)
        setSelectedSelfTest({
            algorithmVersion: row?.algorithmVersion,
            batteryRemain: row?.batteryRemain,
            highVoltageBoardVersion: row?.highVoltageBoardVersion,
            internalTestResult: row?.internalTestResult,
            motherBoardVersion: row?.motherBoardVersion,
            saeBoardVersion: row?.saeBoardVersion,
            sentTime: getJalaliDateTime(row?.sentTime),
            shockCount: row?.shockCount,
            serialNumber: location?.state?.row?.serialNumber,
            lat: location?.state?.row?.location?.lat,
            long: location?.state?.row?.location?.long,
            place: location?.state?.row?.location?.place,
            address: location?.state?.row?.location?.address
        });
        setOpenDetailsModal(true);
    }

    const handleCloseDetail = () => {
        setOpenDetailsModal(false);
    }

    return (
        <Paper className={`main-container-${themeMode}`}>
            <PageHeader title={
                <>
                    🧪 AED SelfTests (Serial : {location?.state?.row?.serialNumber})
                </>
            }/>
            <BasicCard
                header=""
                headerChildren={
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>

                        <Button onClick={() => {
                            setOpenTimeFilterModal(true);
                        }}>⌚ Time Filter</Button>

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
                                showRowDetail={handleShowDetails}
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

            <LeftModal
                title={"🗒️ Details"}
                open={openDetailsModal}
                maxWidth={"lg"}
                handleClose={handleCloseDetail}
            >
                <SelfTestDetails data={selectedSelfTest}/>
            </LeftModal>
        </Paper>
    );
};

export default AllSelfTests;
