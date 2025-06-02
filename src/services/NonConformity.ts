
import Api from "./API/Api";
import {NonConformityType} from "../containers/NonConformity/constants";

class NonConformity extends Api {
    urls = {
        objects: "NonConformity/get-all-non-conformities",
        addNonConformity: "NonConformity/create-non-conformiy",
        editNonConformity: "NonConformity/edit-non-conformiy",
        deleteNonConformity: "NonConformity/delete-non-conformiy",
    };

    getAll = async (
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

    postNewNonConformityForm = async (data: NonConformityType): Promise<any> => {
        try {
            const result = await this.postJsonData(
                this.urls.addNonConformity,
                data
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

    editNonConformityForm = async (data: NonConformityType): Promise<any> => {
        try {
            const result = await this.putJsonData(
                `/${this.urls.editNonConformity}`,
                data
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

    deleteNonConformity = async (id: string): Promise<any> => {
        try {
            const result = await this.deleteData(
                `/${this.urls.deleteNonConformity}/${id}`
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

}

export default NonConformity;
