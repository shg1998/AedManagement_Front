import React, {useMemo} from "react";
import {MenuItem} from "@mui/material";
import {MRT_ColumnDef} from "material-react-table";
import {getJalaliDateTime} from "../../../utils/time";
import Select from "@mui/material/Select";
import AedServices from "../AedServices";

const AllRepairs = () => {

    const displayReplacementParts = (data: any) => {
        return data?.map((item: any, idx: number) => (
            <React.Fragment key={idx}>
                📱 {item?.prevPart?.name}
                {idx !== data.length - 1 && <hr />}
            </React.Fragment>
        ));
    };

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
            // {
            //     accessorKey: "callDate",
            //     header: "Call Time",
            //     enableHiding: false,
            //     maxSize: 20,
            //     enableSorting: false,
            //     enableColumnFilter: false,
            //     accessorFn: (row: any) => row.callDate === null ? "" : getJalaliDateTime(row.callDate),
            // },
            {
                accessorKey: "user.fullName",
                header: "Expert",
                enableSorting: false,
                accessorFn: (row: any) => row.user.fullName === null ? "" : row.user?.fullName,
            },
            {
                accessorKey: "nonConformity.title",
                header: "Non Conformity",
                enableSorting: false,
                accessorFn: (row: any) => row.nonConformity?.title === null ? "" : row.nonConformity?.title,
            },
            {
                accessorKey: "repairType",
                header: "Repair Type",
                enableSorting: false,
                accessorFn: (row: any) => row?.repairType?.title === null ? "" : row.repairType?.title,
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
                accessorKey: "prevParts",
                header: "Prev Parts",
                size: 400,
                enableSorting: false,
                accessorFn: (row: any) => row.replacementParts === null || row?.replacementParts?.length === 0 ? "-" : displayReplacementParts(row?.replacementParts)
            },
        ],
        []
    );


    return (
        <AedServices process={"Repair"} columns={columns}/>
    );
};

export default AllRepairs;
