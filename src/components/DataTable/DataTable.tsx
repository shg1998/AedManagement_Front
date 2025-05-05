import {
  MaterialReactTable,
  MRT_Virtualizer,
  type MRT_Icons,
  MRT_PaginationState,
  useMaterialReactTable,
  MRT_ToggleFiltersButton,
  MRT_ShowHideColumnsButton,
} from "material-react-table";
import { DataTableProps } from "../../interfaces/DataTableTypes";
import { makeStyles } from "@mui/styles";
import { ReactComponent as XcelIcon } from "../../assets/images/Microsoft Excel.svg";
import { ReactComponent as TableSettingIcon } from "../../assets/images/Table Settings.svg";
import { Box, IconButton, Theme, Tooltip } from "@mui/material";
import { ReactComponent as Recycle } from "../../../src/assets/images/publicIcons/recycle.svg";
import ArticleIcon from "@mui/icons-material/Article";
import EditIcon from "@mui/icons-material/Edit";
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import BiotechIcon from '@mui/icons-material/Biotech';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React, {
  useEffect,
  useState,
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useRef,
  UIEvent,
  useCallback,
} from "react";
import ConfirmModal from "../Modal/ConfirmModal";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PreviewIcon from "@mui/icons-material/Preview";
import { useContextMenu } from "react-contexify";
import IdentitiesContextMenu from "../IdentitiesContextMenu/IdentitiesContextMenu";
import { tError, tSuccess } from "../../utils/toast";
import { ReactComponent as Warning } from "../../assets/images/publicIcons/redWarning.svg";
import MyMenu from "../MyMenu/MyMenu";
import { useThemeContext } from "../../ThemeContext";
import {
  deleteItemSecure,
  getItemSecure,
  setItemSecure,
} from "../../utils/AESCrypto";
import { useLocation } from "react-router-dom";


const useStyles = makeStyles((theme: Theme) => ({
  table: {
    direction: "ltr",
    minWidth: "97%",
    paddingBottom: "40px",
    color: "white",

    padding: "10px",
    "& .MuiPaper-root": {
      boxShadow: "none",
      border: "none",
      backgroundColor: theme.palette.background.paper,
    },
    "& .MuiTableContainer-root": {
      borderRadius: "10px",
    },
    "& .MuiTableCell-head": {
      color: `${theme.palette.text.primary} !important`,
      backgroundColor: theme.palette.grayP.main,
      borderRight: `1px solid ${theme.palette.background.default}`,
      borderLeft: `1px solid ${theme.palette.background.default}`,
    },
    "& .Mui-TableHeadCell-Content": {
      display: "flex",
      justifyContent: "center",
    },
    "& .MuiTableCell-body": {
      padding: "10px 20px",
      textAlign: "center!important",
      "& .MuiCheckbox-colorPrimary": {
        width: "100%",
      },
      // border: "1px solid rgb(212, 212, 212,50%)",
    },
    "& MuiTableCell-root>.MuiTableCell-body>.MuiTableCell-alignLeft>.MuiTableCell-sizeSmall":
      {
        border: "none",
      },
    "& tbody>.MuiTableRow-root:hover td": {
      backgroundColor: `${theme.palette.grayP.contrastText} !important`,
      cursor: "pointer",
      color: "black",
    },
    "& .MuiToolbar-root:not(.MuiTablePagination-toolbar)": {
      justifyContent: "end",
      // backgroundColor: theme.palette.secondary.dark,
      backgroundColor: theme.palette.secondary.light,
    },

    "& .MuiIconButton-root:hover": {
      backgroundColor: "none",
    },
    "& tbody>.MuiTableRow-root:nth-child(even)": {
      background: `${theme.palette.grayP.dark} !important`,
    },
    "& tbody>.MuiTableRow-root:nth-child(odd)": {
      background: `${theme.palette.grayP.light} !important`,
    },
    "& .MuiTableCell-root": {
      textAlign: "left",
      fontSize: "0.9em",
      color: theme.palette.mode === "dark" && theme.palette.text.secondary,
      borderBottom: theme.palette.grayP.contrastText,
    },
    "& .Mui-selected": {
      backgroundColor: "#C6CCE4 !important",
      color: `black !important`,
    },
    "& .MuiTablePagination-actions": {
      direction: "rtl !important",
    },
    "& .MuiTablePagination-toolbar": {
      flexDirection: "row-reverse",
      color: theme.palette.text.primary,
    },
    "& .MuiTablePagination-selectLabel": {
      fontSize: "0.9em",
    },
    // "& .MuiToolbar-root:has(> :nth-child(1):last-child)": {
    //   backgroundColor: `${theme?.palette?.grayP?.main} !important`,
    //   borderRadius: "0px 0px 5px 5px",
    // },
    "& .MuiPaper-root >.MuiBox-root": {
      backgroundColor: `${theme?.palette?.secondary?.light} !important`,
      borderRadius: "0px 0px 5px 5px",
    },
    "& .MuiSvgIcon-root": {
      fill: theme.palette.mode === "dark" && "white",
    },
    "& .MuiTablePagination-root": {
      display: "flex",
      flexDirection: "row-reverse",
    },
  },
  //     customPagination: {
  //       backgroundColor: theme.palette.grayP.main,
  //       height:'40px'
  // },
  iconContainer: {
    display: "flex",
  },
  toolbarIcon: {
    marginRight: "-10px",
  },
  toolbarIconStyle: {
    marginRight: "8px",
    "& path": {
      fill: theme.palette.text.primary,
    },
  },
  xcelIconStyle: {
    "& path": {
      marginLeft: "-12px",
      fill: theme.palette.text.primary,
    },
  },
  viewRowsStyle: {
    "& path": {
      fill: theme.palette.text.primary,
    },
  },
  recycleIconStyle: {
    "& path": {
      fill: theme.palette.text.primary,
    },
  },
}));
type FunctionalUpdate<T> = (prev: T) => T;

interface PrevPaginationStructure {
  index: string;
  path: string;
}

export interface TableRef {
  getRowSelectedData: () => any;
}

const costumIcons: Partial<MRT_Icons> = {
  //  FilterListIcon: (props: any) => (
  //   <ChevronRight {...props} />
  // ),
  ViewColumnIcon: () => (
    <TableSettingIcon className={useStyles().toolbarIconStyle} />
  ),
};

const DataTable: ForwardRefRenderFunction<TableRef, DataTableProps> = (
  props,
  ref
) => {
  const {
    keyName,
    columns,
    data = [],
    isFetching,
    pagination,
    setPagination,
    totalCount,
    globalSearch,
    disableToolbar,
    disableTopToolbar,
    noAlertBanner,
    disableRowSelection,
    disablePagination,
    onRowClicked,
    hasContextMenu,
    deleteRows,
    viewRows,
    reViewRows,
    hasRowAction,
    showRowDetail,
    editRow,
    deleteRow,
    rowSelfTests,
    rowServices,
    enableRowVirtual,
    selectedRows,
    columnVisibility,
    setColumnVisibility,
    fetchNextPage,
    totalFetched,
    isLoading,
    globalFilter,
    columnFilters = [],
    sorting = [],
    setGlobalFilter,
    hasOtp,
    exportAll,
    remoteFilter,
    remoteSorting
  } = props;

  const IDENTITIES_CONTEXT_MENU = "indentities_context_menu";
  const location = useLocation();
  const classes = useStyles(props);
  const tableInstanceRef = useRef<any>(null);
  const rowVirtualizerInstanceRef =
    useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);

  useImperativeHandle(ref, () => ({
    getRowSelectedData: () => {
      // return api data that are in table
      return rowSelectedData;
    },
    getRowSelectedDataIDs: () => {
      const selectedRowIDs = Object.keys(rowSelection).map((index) => {
        return data[index].id;
      });
      return selectedRowIDs;
    },
    getSelectedTableIDs: () => {
      // return selected rows of table
      return rowSelection;
    },
    resetSelectedRows: () => {
      setRowSelection({});
    },
    getTableData: () => {
      const tableDataIDs = data.map((item: any) => {
        return item.id;
      });
      return tableDataIDs;
    },
  }));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    if (keyName) {
      localStorage.setItem(
        `${location.pathname}-${keyName}`,
        JSON.stringify(columnVisibility)
      );
    }
  }, [columnVisibility]);

  const [rowSelection, setRowSelection] = useState(
    selectedRows ? selectedRows : {}
  );

  const [rowSelectedData, setRowSelectedData] = useState<any>();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);
  const [idToDelete, setIdToDelete] = React.useState("");

  const [deleteContextOpen, setDeleteContextOpen] = React.useState(false);
  const [, setDeleteContextId] = React.useState(null);

  useEffect(() => {
    const selectedRowData = Object.keys(rowSelection).map((index) => {
      return data[index];
    });
    setRowSelectedData(selectedRowData);
  }, [rowSelection, data]);

  const handleDeleteRow = async () => {
    if (idToDelete !== "") {
      // for deleteRow
      deleteRow && (await deleteRow?.(idToDelete));
      setIdToDelete("");
    } else {
      // for batch delete
      deleteRows && (await deleteRows?.());
    }
    if (!hasOtp) {
      setRowSelection({});
    }
    setDeleteConfirmOpen(false);
  };

  const handleDeleteContextRow = async () => {
    handleCloseContextConfirm();
  };

  const handleCloseConfirm = () => {
    setDeleteConfirmOpen(false);
  };

  const handleCloseContextConfirm = () => {
    setDeleteContextId(null);
    setDeleteContextOpen(false);
  };

  const { show } = useContextMenu({
    id: IDENTITIES_CONTEXT_MENU,
  });

  const handleContextMenu = (event: any, data: any) => {
    event.preventDefault();
    show({
      event,
      props: {
        id: data.id,
      },
    });
  };


  // @ts-ignore
  const handleItemClick = async ({ id, props }) => {
    switch (id) {
      case "open-details-in-new-tab": {
        window.open(
          window.location.origin + window.location.pathname + "/" + props.id,
          "_blank"
        );
        break;
      }
      case "delete": {
        if (deleteRows) {
          setDeleteContextOpen(true);
          setDeleteContextId(props.id);
        } else {
          tError("Access Error");
        }
        break;
      }
      case "copy-id": {
        await navigator.clipboard.writeText(props.id);
        tSuccess("شناسه موجودیت با موفقیت کپی شد");
        break;
      }
      default:
        return false;
    }
  };

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        //once the user has scrolled within 400px of the bottom of the table, fetch more data if we can
        if (
          scrollHeight - scrollTop - clientHeight < 400 &&
          !isFetching &&
          (totalFetched ?? 0) < (totalCount ?? 0)
        ) {
          if (fetchNextPage) {
            fetchNextPage();
          }
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalCount]
  );

  const handlePaginationChange: any = (
    functionalUpdate: FunctionalUpdate<MRT_PaginationState>
  ) => {
    if (setPagination)
      setPagination((prevPagination: any) => {
        const newPagination = functionalUpdate(prevPagination);
        let finalPrevPaginationIndex: PrevPaginationStructure = {
          index: newPagination.pageIndex.toString(),
          path: location.pathname,
        };
        setItemSecure(
          "prevPaginationIndex",
          JSON.stringify(finalPrevPaginationIndex)
        );
        return newPagination;
      });
  };

  const loadPrevPagination = (prevPagination: PrevPaginationStructure) => {
    if (prevPagination && setPagination && pagination) {
      setPagination({
        ...pagination,
        pageIndex: parseInt(prevPagination.index.toString()),
      });
    }
  };

  const resetPagination = () => {
    if (setPagination)
      setPagination({
        pageIndex: 0,
        pageSize: 10,
      });
    deleteItemSecure("prevPaginationIndex");
  };

  useEffect(() => {
    let prevPaginationIndex = getItemSecure("prevPaginationIndex");
    if (prevPaginationIndex) {
      let prevPagination = JSON.parse(prevPaginationIndex.toString());
      if (location.pathname === prevPagination.path)
        loadPrevPagination(prevPagination);
      else resetPagination();
    }
  }, []);

  //a check on mount to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    fetchMoreOnBottomReached(tableInstanceRef.current);
  }, [fetchMoreOnBottomReached]);

  useEffect(() => {
    //scroll to the top of the table when the sorting changes
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [globalFilter]);
  const { theme } = useThemeContext();

  const table = useMaterialReactTable({
    columns: columns,
    data: data ? data : [],
    enableRowSelection: disableRowSelection ? false : true,
    enableGlobalFilter: globalSearch ? globalSearch : false,
    enableColumnActions: false,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enablePagination: disablePagination ? false : true,
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    enableColumnFilters: !disableToolbar,
    enableHiding: !disableToolbar,
    enableTopToolbar: !disableTopToolbar,
    onGlobalFilterChange: setGlobalFilter,
    // localization: MRT_Localization_FA,
    icons: costumIcons,
    enableStickyFooter: true,
    enableStickyHeader: true,
    muiSelectCheckboxProps: { color: "primary" },

    muiSelectAllCheckboxProps: {
      style: { color: "#0627A7 !important", marginRight: "1px" },
    },
    rowCount: totalCount ?? 100,
    enableRowVirtualization: enableRowVirtual,
    rowVirtualizerInstanceRef: rowVirtualizerInstanceRef,
    onPaginationChange: handlePaginationChange,
    state: {
      globalFilter,
      showProgressBars: isFetching,
      isLoading,
      pagination,
      rowSelection,
      columnVisibility: columnVisibility,
      columnFilters,
      sorting,
    },
    onColumnFiltersChange: remoteFilter,
    enableFilterMatchHighlighting: true,
    onSortingChange: remoteSorting,
    isMultiSortEvent: () => false,
    // icons={{ Filter: () => <div /> }} // <== this solves it

    enableSorting: true,
    initialState: {
      showGlobalFilter: true,
      columnVisibility: columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    positionToolbarAlertBanner: !noAlertBanner ? "top" : "none",
    muiTableBodyRowProps: ({ row }) => ({
      onClick: (event: any) => {
        if (onRowClicked) {
          event.preventDefault();
          onRowClicked(row.original);
        }
      },
      onContextMenu: (event: any) => {
        if (hasContextMenu) {
          handleContextMenu(event, row.original);
        }
      },
      sx: { cursor: "pointer" },
    }),
    muiTableContainerProps: {
      ref: tableInstanceRef, //get access to the table container element
      sx: { maxHeight: "800px" }, //give the table a max height
      onScroll: (
        event: UIEvent<HTMLDivElement> //add an event listener to the table container element
      ) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
    },
    onRowSelectionChange: setRowSelection,
    displayColumnDefOptions: {
      "mrt-row-select": {
        size: 10,
      },
    },
    //For row actions
    positionActionsColumn: "last",
    enableRowActions: hasRowAction,
    renderRowActions: ({ row }) => (
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {showRowDetail && (
          <Tooltip title={"Details"}>
            <IconButton
              onClick={async (e) => {
                e.stopPropagation();
                showRowDetail?.(row?.original);
              }}
            >
              <ArticleIcon />
            </IconButton>
          </Tooltip>
        )}
        {rowServices && (
            <Tooltip title={"AED Services"}>
              <IconButton
                  onClick={async (e) => {
                    e.stopPropagation();
                    rowServices?.(row?.original);
                  }}
              >
                <DesignServicesIcon />
              </IconButton>
            </Tooltip>
        )}

        {rowSelfTests && (
            <Tooltip title={"AED Self Tests"}>
              <IconButton
                  onClick={async (e) => {
                    e.stopPropagation();
                    rowSelfTests?.(row?.original);
                  }}
              >
                <BiotechIcon />
              </IconButton>
            </Tooltip>
        )}

        {editRow && (
          <Tooltip title={"Edit"}>
            <IconButton
              sx={{ paddingY: 0 }}
              onClick={async (e) => {
                e.stopPropagation();
                editRow?.(row?.original);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}

        {deleteRow && (
          <Tooltip title={"Delete"}>
            <IconButton
              sx={{ paddingY: 0 }}
              onClick={async (e) => {
                e.stopPropagation();
                //@ts-ignore
                setIdToDelete(row?.original?.id);
                hasOtp && deleteRow?.(row?.original);
                !hasOtp && setDeleteConfirmOpen(true);
              }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    ),
    renderToolbarInternalActions: ({ table }) => (
      <Box>
        {Object.keys(rowSelection).length > 0 && deleteRows && (
          <IconButton
            onClick={async (e) => {
              e.stopPropagation();
              setDeleteConfirmOpen(true);
              // await deleteRows();
              // setRowSelection({});
            }}
          >
            <Recycle className={classes.recycleIconStyle} />
          </IconButton>
        )}
        {Object.keys(rowSelection).length > 0 && viewRows && (
          <Tooltip title={"تغییر وضعیت به خوانده شده"}>
            <IconButton
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                event.preventDefault();
                event.stopPropagation();
                viewRows();
              }}
            >
              <CheckCircleOutlineIcon className={classes.viewRowsStyle} />
            </IconButton>
          </Tooltip>
        )}
        {Object.keys(rowSelection).length > 0 && reViewRows && (
          <Tooltip title={"تغییر وضعیت به بررسی شده"}>
            <IconButton
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                event.preventDefault();
                event.stopPropagation();
                reViewRows();
              }}
            >
              <PreviewIcon className={classes.viewRowsStyle} />
            </IconButton>
          </Tooltip>
        )}

        <MRT_ToggleFiltersButton
          className={classes.toolbarIcon}
          table={table}
        />
        {columnVisibility && <MRT_ShowHideColumnsButton table={table} />}

        {exportAll && (
          <IconButton
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              event.preventDefault();
              event.stopPropagation();
              setAnchorEl(event.currentTarget);
            }}
          >
            <XcelIcon className={classes.xcelIconStyle} />
          </IconButton>
        )}
      </Box>
    ),
  });

  return (
    <>
      <IdentitiesContextMenu
        id={IDENTITIES_CONTEXT_MENU}
        handleItemClick={handleItemClick}
      />
      <div className={classes.table} style={{direction: 'rtl'}}>
        <MaterialReactTable table={table} />
        <ConfirmModal
          open={deleteConfirmOpen}
          handleClose={handleCloseConfirm}
          handleConfirm={handleDeleteRow}
          title={"حذف"}
          description={
            <div
              style={{
                backgroundColor: theme.palette.grayP.dark,
                margin: "0px 1px",
                border: `1px solid ${theme.palette.card.contrastText}`,
                padding: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Warning />
                <p
                  style={{
                    color: "red",
                    fontWeight: "700",
                    marginRight: "5px",
                  }}
                >
                  Are You Sure?
                </p>
              </div>
              {/*<div>در صورت حذف ، تمامی اطلاعات ثبت شده آن پاک خواهد شد.</div>*/}
            </div>
          }
        />
        <ConfirmModal
          open={deleteContextOpen}
          handleClose={handleCloseContextConfirm}
          handleConfirm={handleDeleteContextRow}
          title={"حذف"}
          description={
            <div
              style={{
                backgroundColor: theme.palette.grayP.dark,
                margin: "0px 1px",
                border: `1px solid ${theme.palette.card.contrastText}`,
                padding: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Warning />
                <p
                  style={{
                    color: "red",
                    fontWeight: "700",
                    marginRight: "5px",
                  }}
                >
                  آیا از حذف اطمینان دارید؟
                </p>
              </div>
              <div>در صورت حذف ، تمامی اطلاعات ثبت شده آن پاک خواهد شد.</div>
            </div>
          }
        />
      </div>
      {exportAll && (
        <MyMenu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          itemClicked={exportAll}
        />
      )}
    </>
  );
};
export default forwardRef(DataTable);
