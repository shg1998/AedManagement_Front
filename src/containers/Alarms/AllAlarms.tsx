import React, {useEffect, useMemo, useRef, useState} from "react";
import DataTable from "../../components/DataTable/DataTable";
import {Checkbox, MenuItem, Paper} from "@mui/material";
import {MRT_ColumnDef, MRT_ColumnFiltersState, MRT_PaginationState} from "material-react-table";
import BasicCard from "../../components/Card/BasicCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import {useCustomTableQuery} from "../../hooks/use-custom-table-query";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import {useThemeContext} from "../../ThemeContext";
import Alarm from "../../services/Alarm";
import {getJalaliDateTime2} from "../../utils/TimeUtils/time";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import {alarmTypeOptions} from "./constants";
import {useNavigate} from "react-router-dom";
import routes from "../../routes/routes";
import LeftModal from "../../components/Modal/LeftModal";
import AlarmDetails from "./AlarmDetails";

const AllAlarms = () => {

    const {
        getAllAlarms
    } = new Alarm();

    const [openDetailsAlarmModal, setOpenDetailsAlarmModal] =
        useState<boolean>(false);
    const navigate = useNavigate();
    const {themeMode} = useThemeContext();
    const tableInstanceRef = useRef(null);
    const [refetchTableData, setRefetchTableData] = useState<boolean>(true);
    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
    const [query, setQuery] = useState<string>("");
    const [selectedAlarmId, setSelectedAlarmId] = useState('0');
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const {data, isFetching, isLoading} = useCustomTableQuery(
        "Alarms",
        refetchTableData,
        pagination,
        getAllAlarms,
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
                accessorKey: "occurrenceTime",
                header: "Occurrence Time",
                maxSize: 20,
                enableSorting: false,
                enableColumnFilter: false,
                accessorFn: (row: any) => row.occurrenceTime === null ? "" : getJalaliDateTime2(row?.occurrenceTime),
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
                accessorKey: "alarmType",
                header: "Alarm Type",
                Cell: ({cell}) => {
                    const value = cell.getValue<string>();
                    switch (value) {
                        case 'AedDisconnected':
                            return "🔌 AED Disconnected";
                        case 'AedSelfTestFail':
                            return '❌ SelfTest Failed';
                        case 'AedBattery':
                            return '🔋 AED Battery';
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
                                if (selected.length === alarmTypeOptions.length + 1) {
                                    column.setFilterValue([]);
                                } else {
                                    column.setFilterValue(alarmTypeOptions.map(o => o.value));
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

                            return alarmTypeOptions
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
                                    ((column.getFilterValue() as string[] | undefined) ?? []).length === alarmTypeOptions.length
                                }
                                indeterminate={
                                    ((column.getFilterValue() as string[] | undefined)?.length ?? 0) > 0 &&
                                    ((column.getFilterValue() as string[] | undefined)?.length ?? 0) < alarmTypeOptions.length
                                }
                            />
                            <ListItemText primary="All"/>
                        </MenuItem>
                        {alarmTypeOptions.map((option) => (
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

    function toODataPath(input: string): string {
        return input
            .split('.')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('/');
    }

    const handleShowDetails = (row: any) => {
        setSelectedAlarmId(row?.id);
        setOpenDetailsAlarmModal(true);
    }

    const handleGoToSelfTest = (row: any) => {
        navigate(routes.selfTests + "?id=" + row?.aedId);
    }

    const handleCloseDetailsModal = () => {
        setOpenDetailsAlarmModal(false);
        setSelectedAlarmId('0');
        setRefetchTableData(!refetchTableData);
    }

    useEffect(() => {
        let filterString = columnFilters
            .filter((item: any) => {
                return !(item.id === 'alarmType' && item.value === 'all');
            })
            .map((item: any) => {
                let key = item.id;
                if (key.toString().includes('.')) {
                    key = toODataPath(key.toString());
                }
                if (key === 'alarmType') {
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



    return (
        <Paper className={`main-container-${themeMode}`}>
            <PageHeader title={
                <>
                    🔔 Alarm List
                </>
            }/>
            <BasicCard
                header=""
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
                                rowSelfTests={handleGoToSelfTest}
                            />
                        </div>
                    </>
                )}
                {isFetching && <div data-testid={"fetching"}></div>}
            </BasicCard>

            <LeftModal
                title={
                    "👀 Alarm Details"
                }
                open={openDetailsAlarmModal}
                maxWidth={"sm"}
                handleClose={handleCloseDetailsModal}
            >
                <AlarmDetails alarmId={selectedAlarmId}/>
            </LeftModal>
        </Paper>
    );
};

export default AllAlarms;
