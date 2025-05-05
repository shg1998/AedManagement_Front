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
        from: new Date(Date.now() - 2190 * 24 * 60 * 60 * 1000).toISOString(), // 6 years
        to: new Date(Date.now()).toISOString()
    });
    const [openTimeFilterModal, setOpenTimeFilterModal] =
        useState<boolean>(false);

    // const [timeQuery, setTimeQuery] = useState<string>(`date ge ${dateFilters?.from} and date le ${dateFilters?.to}`);
    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([{
        id: 'aedId', value: aedId
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
        query //+ timeQuery
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
                accessorFn: (row: any) => row.internalTestResult === null ? "" : internalTestConverter(parseInt(row.internalTestResult)),
            },
        ],
        []
    );

    const internalTestConverter = (value: number) => {
        const val = +value;

        if (val === 255) {
            return '✅ Passed';
        }

        if (val < 0 || val > 254) {
            return '⚠️ Invalid';
        }

        const bits = val.toString(2).padStart(8, '0').split('').reverse();

        const failures = [
            bits[0] === '0' && '🛑 SAE Board',
            bits[1] === '0' && '🛑 High Voltage Board',
            bits[2] === '0' && '🛑 MotherBoard Buttons',
            bits[3] === '0' && '🛑 Battery',
            bits[4] === '0' && '🛑 SAE & MotherBoard Communication',
            bits[5] === '0' && '🛑 SAE & High Voltage Communication'
        ].filter(Boolean);

        if (failures.length === 0) {
            return '✅ Passed';
        }

        return (
            <pre style={{fontFamily: 'inherit', textAlign: 'start', margin: 0}}>
                {'❌ Failed\n'}
                {failures.map(line => `  ${line}`).join('\n')}
        </pre>
        );
    };


    const handleCloseModalWithSavedDateTime = async () => {
        setOpenTimeFilterModal(false);
        let dates = timeFilterRef?.current?.setBoundaries();
        setDateFilters(dates);
        if (dates !== null) {
            let newQuery = query !== "" ? ` date ge ${dates?.from} and date le ${dates?.to}` : `date ge ${dates?.from} and date le ${dates?.to}`;
            setPagination({pageIndex: 0, pageSize: pagination.pageSize});
            // setTimeQuery(newQuery);
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
        console.log(columnFilters)
        let filterString = columnFilters
            .map((item: any) => {
                let key = item.id;
                if (key.toString().includes('.')) {
                    key = toODataPath(key.toString());
                }
                if (key === 'aedId')
                    return `${key} eq ${item.value}`

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

export default AllSelfTests;
