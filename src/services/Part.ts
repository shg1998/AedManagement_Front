
import Api from "./API/Api";
import {PartType} from "../containers/Part/constants";

class Part extends Api {
    urls = {
        objects: "Part/get-all-parts",
        add: "Part/create-part",
        edit: "Part/edit-part",
        delete: "Part/delete-part",
    };

    getAllParts = async (
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

    postPart = async (data: PartType): Promise<any> => {
        try {
            const result = await this.postJsonData(
                this.urls.add,
                data
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

    editPart = async (data: PartType): Promise<any> => {
        try {
            const result = await this.putJsonData(
                `/${this.urls.edit}`,
                data
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

    deletePart = async (id: string): Promise<any> => {
        try {
            const result = await this.deleteData(
                `/${this.urls.delete}/${id}`
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

}

export default Part;
