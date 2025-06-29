import React, {useMemo} from "react";
import {MenuItem} from "@mui/material";
import {MRT_ColumnDef} from "material-react-table";
import {getJalaliDateTime} from "../../../utils/TimeUtils/time";
import Select from "@mui/material/Select";
import {truncateText} from "../../../utils/General/generalUtils";
import AedServices from "../AedServices";

const AllTrainings = () => {
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
                accessorKey: "visitDate",
                header: "Visit Time",
                enableHiding: false,
                enableSorting: false,
                enableColumnFilter: false,
                accessorFn: (row: any) => row.visitDate === null ? "" : getJalaliDateTime(row.visitDate),
            },
            {
                accessorKey: "user.fullName",
                header: "Expert",
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
                            mt: 1,
                            height: 36
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
            {
                accessorKey: "description",
                header: "Description",
                enableSorting: false,
                accessorFn: (row: any) => row.description === null || row?.description?.trim() === '' ? "📪 No Description" : truncateText(row.description, 30)
            },
        ],
        []
    );


    return (
        <AedServices process={"Training"} columns={columns}/>
    );
};

export default AllTrainings;
