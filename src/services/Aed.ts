import Api from "./API/Api";
import {AedType} from "../containers/Aeds/NewAed";

class Aed extends Api {
    urls = {
        objects: "Aed/get-all-aeds",
        addAed: "Aed/create-aed",
        downloadCyberCrimeFile: "Aed/download-cyber-crime-file",
        downloadCyberCrimeResponseFile: "SigmaResponses/download-cyber-crime-response-file",
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
                // password : data.password.toString().trim() === "" ? null : data.password,
                // passwordConfirm: data.passwordConfirm.toString().trim() === "" ? null : data.passwordConfirm,
                // isActive : data.isActive,
                // fullName : data.fullName,
                // userName: data.userName,
                // userId: data.id,
                // email: data.email,
                // province: data.province
            }
            const result = await this.putJsonData(
                `/${this.urls.addAed}`,
                dataForApi
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

}

export default Aed;
