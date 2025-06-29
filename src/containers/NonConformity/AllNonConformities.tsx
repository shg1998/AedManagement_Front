import React, {useEffect, useMemo, useRef, useState} from "react";
import DataTable from "../../components/DataTable/DataTable";
import {Paper} from "@mui/material";
import {MRT_ColumnDef, MRT_ColumnFiltersState, MRT_PaginationState} from "material-react-table";
import BasicCard from "../../components/Card/BasicCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import {useCustomTableQuery} from "../../hooks/use-custom-table-query";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import {useThemeContext} from "../../ThemeContext";
import NonConformity from "../../services/NonConformity";
import LeftModal from "../../components/Modal/LeftModal";
import CardTopActions from "../../components/CardTopActions/CardTopActions";
import {DEFAULT_NON_CONFORMITY_INFORMATION, NewNonConformityHandle, NonConformityType} from "./constants";
import NewNonConformity from "./NewNonConformity";
import {tSuccess} from "../../utils/ToastUtils/toast";



const AllNonConformities = () => {

    const {
        getAll,
        deleteNonConformity
    } = new NonConformity();

    const newNonConformityRef = useRef<NewNonConformityHandle>(null);
    const {themeMode} = useThemeContext();
    const tableInstanceRef = useRef(null);
    const [refetchTableData, setRefetchTableData] = useState<boolean>(true);

    const [openManageNonConformityModal, setOpenManageNonConformityModal] =
        useState<boolean>(false);

    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
    const [query, setQuery] = useState<string>("");
    const [selectedNonConformity, setSelectedNonConformity] = useState<NonConformityType>();
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const {data, isFetching, isLoading} = useCustomTableQuery(
        "nonConformitys",
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
                accessorKey: "title",
                header: "Title",
                enableHiding: false,
                enableSorting: false,
                accessorFn: (row: any) => row.title === null ? "" : row.title,
            },
        ],
        []
    );

    const handleCloseManageModal = (): void => {
        setSelectedNonConformity(DEFAULT_NON_CONFORMITY_INFORMATION);
        setOpenManageNonConformityModal(false);
    };

    const handleAddNonConformity = async () => {
        newNonConformityRef?.current?.sendRequest();
    };

    const closeCreateEditModal = () => {
        setSelectedNonConformity(DEFAULT_NON_CONFORMITY_INFORMATION);
        setOpenManageNonConformityModal(false);
        setRefetchTableData(!refetchTableData);
    }

    const handleEditNonConformity = (row: any) => {
            setSelectedNonConformity({
                id: row.id,
                title: row.title,
            });
            setOpenManageNonConformityModal(true);
    };

    function toODataPath(input: string): string {
        return input
            .split('.')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('/');
    }

    const handleDeleteItem = (id: any) => {
        deleteNonConformity(id).then(res => {
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
                    😖 NonConformity List
                </>
            }/>
            <BasicCard
                header=""
                headerChildren={
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <CardTopActions
                            firstAction={() => {
                            }}
                            secondTitle={"Add NonConformity"}
                            secondAction={() => {
                                setSelectedNonConformity(DEFAULT_NON_CONFORMITY_INFORMATION);
                                setOpenManageNonConformityModal(true);
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
                                editRow={handleEditNonConformity}
                                deleteRow={handleDeleteItem}
                            />
                        </div>
                    </>
                )}
                {isFetching && <div data-testid={"fetching"}></div>}
            </BasicCard>

            <LeftModal
                title={
                    selectedNonConformity?.id === '0' ? "⚠️ Create NonConformity" : "✏️ Edit NonConformity"
                }
                open={openManageNonConformityModal}
                maxWidth={"sm"}
                handleClose={handleCloseManageModal}
                handleAdd={handleAddNonConformity}
                buttonLabel={selectedNonConformity?.id === '0' ? "Submit" : "Apply"}
            >
                <NewNonConformity
                    ref={newNonConformityRef}
                    data={selectedNonConformity?.id === '0' ? DEFAULT_NON_CONFORMITY_INFORMATION : selectedNonConformity!}
                    closeModal={closeCreateEditModal}
                />
            </LeftModal>
        </Paper>
    );
};

export default AllNonConformities;
