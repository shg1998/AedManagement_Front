import Api from "./API/Api";
import {AedType} from "../containers/Aeds/constants";

class Aed extends Api {
    urls = {
        objects: "Aed/get-all-aeds",
        addAed: "Aed/create-aed",
        editAed: "Aed/edit-aed",
        deleteAed: "Aed/delete-aed",
        detailsAed: "Aed/get-details",
    };

    getAll = async (
        limit?: number, skip?: number, filter?: string
    ): Promise<any> => {
        try {
            let queryParams = `top=${limit}&skip=${skip} &orderby=LastSelfTestDateTime desc`;
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

    fetchDetails = async (id?: string): Promise<any> => {
        try {
            const result = await this.getData(this.urls.detailsAed + "/" + id, {});
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

    postNewAedForm = async (data: AedType): Promise<any> => {
        try {
            // @ts-ignore
            delete data.id;
            const formData = new FormData();
            formData.append("serialNumber", data.serialNumber);
            formData.append("isActive", data.isActive.toString());
            formData.append("registerDateTime", data.registerDateTime);
            formData.append("aedBatteryType", data.aedBatteryType);
            formData.append("location.province", data.province);
            formData.append("location.unit", data.unit!);
            formData.append("location.address", data.address!);
            formData.append("location.city", data.city);
            formData.append("location.place", data.place);
            // @ts-ignore
            formData.append("location.long", (data.position?.[1]));
            // @ts-ignore
            formData.append("location.lat", data.position?.[0]);

            (data.attachments ?? []).forEach((attachment, index) => {
                if (attachment.file) {
                    formData.append(`attachments[${index}].file`, attachment.file);
                }
                formData.append(`attachments[${index}].fileName`, attachment.fileName || attachment.file?.name || "");
            });

            const result = await this.postFormData(
                this.urls.addAed,
                formData
            );
            if (result.name === "AxiosError")
                return result.response.data;
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

    editAedForm = async (data: AedType): Promise<any> => {
        try {
            const formData = new FormData();
            formData.append("id", data.id);
            formData.append("serialNumber", data.serialNumber);
            formData.append("isActive", data.isActive.toString());
            formData.append("registerDateTime", data.registerDateTime);
            formData.append("aedBatteryType", data.aedBatteryType);
            formData.append("location.province", data.province);
            formData.append("location.address", data.address!);
            formData.append("location.unit", data.unit!);
            formData.append("location.city", data.city);
            formData.append("location.place", data.place);
            // @ts-ignore
            formData.append("location.long", (data.position?.[1]));
            // @ts-ignore
            formData.append("location.lat", data.position?.[0]);

            (data.attachments ?? []).forEach((attachment, index) => {
                if (attachment.file) {
                    formData.append(`attachments[${index}].file`, attachment.file);
                }
                formData.append(`attachments[${index}].fileName`, attachment.fileName || attachment.file?.name || "");
            });
            const result = await this.putFormData(
                `/${this.urls.editAed}`,
                formData
            );
            if (result.name === "AxiosError")
                return result.response.data;
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

    deleteAed = async (id: string): Promise<any> => {
        try {
            const result = await this.deleteData(
                `/${this.urls.deleteAed}/${id}`
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

}

export default Aed;
