import Api from "./API/Api";
import {AedType} from "../containers/Aeds/NewAed";

class SelfTest extends Api {
    urls = {
        objects: "SelfTest/get-all-self-tests",
        addAed: "Aed/create-aed",
        editAed: "Aed/edit-aed",
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



}

export default SelfTest;
