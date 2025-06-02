
import Api from "./API/Api";
import {NonConformityType} from "../containers/NonConformity/constants";

class RepairType extends Api {
    urls = {
        objects: "RepairType/get-all-repair-types",
        addRepairType: "RepairType/create-repair-type",
        editRepairType: "RepairType/edit-repair-type",
        deleteRepairType: "RepairType/delete-repair-type",
    };

    getAllRepairTypes = async (
        limit?: number, skip?: number, filter?: string
    ): Promise<any> => {
        try {
            let queryParams = `top=${limit}&skip=${skip}`;
            if (filter) {
                queryParams += `&filter=${filter}`;
            }
            const result = await this.getData(this.urls.objects + "?" + queryParams, {});
            if (!result)
                return {
                    data: []
                }
            let pagination = JSON.parse(result.headers.pagination);
            return {
                data: result.data,
                totalPages: pagination.totalPages,
                itemsPerPage: pagination.itemsPerPage,
                totalItems: pagination.totalItems,
                currentPage: pagination.currentPage,
            };
        } catch (e) {
            console.log(e)
            return Promise.reject(e)
        }
    };

    postNewRepairTypeForm = async (data: NonConformityType): Promise<any> => {
        try {
            const result = await this.postJsonData(
                this.urls.addRepairType,
                data
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

    editRepairTypeForm = async (data: NonConformityType): Promise<any> => {
        try {
            const result = await this.putJsonData(
                `/${this.urls.editRepairType}`,
                data
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

    deleteRepairType = async (id: string): Promise<any> => {
        try {
            const result = await this.deleteData(
                `/${this.urls.deleteRepairType}/${id}`
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

}

export default RepairType;
