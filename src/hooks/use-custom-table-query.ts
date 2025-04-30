import {useQuery} from "react-query";
import {MRT_PaginationState} from "material-react-table";

export const useCustomTableQuery = (
                                    key: string,
                                    updateNeeded: boolean,
                                    pagination: MRT_PaginationState,
                                    fetchMethod: (limit?: number, skip?: number, filter?: string) => Promise<any>,
                                    query?: string,
                                    keepPreviousData = true,
                                    retry = false
) => {
    const res = useQuery<any>({

        queryKey: [
            key,
            updateNeeded,
            pagination.pageIndex, //refetch when pagination.pageIndex changes
            pagination.pageSize, //refetch when pagination.pageSize changes
            query
        ],
        queryFn: async () => {
            const result = await fetchMethod(
                pagination.pageSize,
                pagination.pageIndex * pagination.pageSize,
                query
            );
            return result;
        },
        keepPreviousData,
        retry
    });
    return res;
}