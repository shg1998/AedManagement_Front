import Api from "./API/Api";
import {AedType} from "../containers/Aeds/NewAed";

class Aed extends Api {
    urls = {
        objects: "Aed/get-all-aeds",
        addAed: "Aed/create-aed",
        editAed: "Aed/edit-aed",
    };

    getAll = async (
        limit?: number, skip?: number, filter?: string
    ): Promise<any> => {
        try {
            let queryParams = `top=${limit}&skip=${skip} &orderby=RegisterDateTime desc`;
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

    postNewAedForm = async (data: AedType): Promise<any> => {
        try {
            // @ts-ignore
            delete data.id;
            const finalData = {
                serialNumber: data.serialNumber,
                registerDateTime: data.registerDateTime,
                aedBatteryType: data.aedBatteryType,
                location: {
                    province: data.province,
                    city: data.city,
                    place: data.place,
                    long: 0,
                    lat: 0
                }
            }
            const result = await this.postJsonData(
                this.urls.addAed,
                finalData
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

    editAedForm = async (data: AedType): Promise<any> => {
        try {
            let dataForApi: any = {
                id: data.id,
                serialNumber: data.serialNumber,
                registerDateTime: data.registerDateTime,
                batteryType: data.aedBatteryType,
                location: {
                    province: data.province,
                    city: data.city,
                    place: data.place,
                    long: 0,
                    lat: 0
                },
            }
            const result = await this.putJsonData(
                `/${this.urls.editAed}`,
                dataForApi
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

}

export default Aed;
