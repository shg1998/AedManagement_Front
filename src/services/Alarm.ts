
import Api from "./API/Api";

class Alarm extends Api {
    urls = {
        objects: "Alarm/get-all-alarms",
        getById: "Alarm/get-alarm-by-id",
        getCount: "Alarm/get-unread-alarms-count",
    };

    getAllAlarms = async (
        limit?: number, skip?: number, filter?: string
    ): Promise<any> => {
        try {
            let queryParams = `top=${limit}&skip=${skip} &orderby=OccurrenceTime desc`;
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

    getById = async (id?: string): Promise<any> => {
        try {
            const result = await this.getData(this.urls.getById + "/" + id, {});
            if (!result)
                return {
                    data: {}
                }
            return result.data.data;
        } catch (e) {
            console.log(e)
            return Promise.reject(e)
        }
    }

    getCount = async (): Promise<any> => {
        try {
            const result = await this.getData(this.urls.getCount, {});
            if (!result)
                return {
                    data: {}
                }
            return result.data.data?.count;
        } catch (e) {
            console.log(e)
            return Promise.reject(e)
        }
    }
}

export default Alarm;
