import React, {useEffect, useMemo, useRef, useState} from "react";
import DataTable from "../../components/DataTable/DataTable";
import {Paper} from "@mui/material";
import {MRT_ColumnDef, MRT_ColumnFiltersState, MRT_PaginationState} from "material-react-table";
import BasicCard from "../../components/Card/BasicCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import {useCustomTableQuery} from "../../hooks/use-custom-table-query";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import {useThemeContext} from "../../ThemeContext";
import Part from "../../services/Part";
import LeftModal from "../../components/Modal/LeftModal";
import CardTopActions from "../../components/CardTopActions/CardTopActions";
import {DEFAULT_PART_INFORMATION, NewPartHandle, PartType} from "./constants";
import NewPart from "./NewPart";
import {tSuccess} from "../../utils/toast";



const AllParts = () => {

    const {
        getAllParts,
        deletePart
    } = new Part();

    const newPartRef = useRef<NewPartHandle>(null);
    const {themeMode} = useThemeContext();
    const tableInstanceRef = useRef(null);
    const [refetchTableData, setRefetchTableData] = useState<boolean>(true);

    const [openManagePartModal, setOpenManagePartModal] =
        useState<boolean>(false);

    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
    const [query, setQuery] = useState<string>("");
    const [selectedPart, setSelectedPart] = useState<PartType>();
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const {data, isFetching, isLoading} = useCustomTableQuery(
        "Parts",
        refetchTableData,
        pagination,
        getAllParts,
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
                accessorKey: "name",
                header: "Name",
                enableHiding: false,
                enableSorting: false,
                accessorFn: (row: any) => row.name === null ? "" : row.name,
            },
            {
                accessorKey: "partNumber",
                header: "Part Number",
                enableHiding: false,
                enableSorting: false,
                accessorFn: (row: any) => row.partNumber === null ? "" : row.partNumber,
            },
        ],
        []
    );

    const handleCloseManageModal = (): void => {
        setSelectedPart(DEFAULT_PART_INFORMATION);
        setOpenManagePartModal(false);
    };

    const handleAddPart = async () => {
        newPartRef?.current?.sendRequest();
    };

    const closeCreateEditModal = () => {
        setSelectedPart(DEFAULT_PART_INFORMATION);
        setOpenManagePartModal(false);
        setRefetchTableData(!refetchTableData);
    }

    const handleEditPart = (row: any) => {
        setSelectedPart({
            id: row.id,
            name: row.name,
            partNumber: row.partNumber
        });
        setOpenManagePartModal(true);
    };

    function toODataPath(input: string): string {
        return input
            .split('.')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('/');
    }

    const handleDeleteItem = (id: any) => {
        deletePart(id).then(res => {
            if (res.isSuccess) {
                tSuccess(res?.data);
                setRefetchTableData(!refetchTableData);
            } else {
                console.log(res)
            }
        })


    }

    useEffect(() => {
        let filterString = columnFilters
            .map((item: any) => {
                let key = item.id;
                if (key.toString().includes('.')) {
                    key = toODataPath(key.toString());
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
                    🔨 Part List
                </>
            }/>
            <BasicCard
                header=""
                headerChildren={
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <CardTopActions
                            firstAction={() => {
                            }}
                            secondTitle={"Add Part"}
                            secondAction={() => {
                                setSelectedPart(DEFAULT_PART_INFORMATION);
                                setOpenManagePartModal(true);
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
                                editRow={handleEditPart}
                                deleteRow={handleDeleteItem}
                            />
                        </div>
                    </>
                )}
                {isFetching && <div data-testid={"fetching"}></div>}
            </BasicCard>

            <LeftModal
                title={
                    selectedPart?.id === 0 ? "⚠️ Create Part" : "✏️ Edit Part"
                }
                open={openManagePartModal}
                maxWidth={"sm"}
                handleClose={handleCloseManageModal}
                handleAdd={handleAddPart}
                buttonLabel={selectedPart?.id === 0 ? "Submit" : "Apply"}
            >
                <NewPart
                    ref={newPartRef}
                    data={selectedPart?.id === 0 ? DEFAULT_PART_INFORMATION : selectedPart!}
                    closeModal={closeCreateEditModal}
                />
            </LeftModal>
        </Paper>
    );
};

export default AllParts;
