import Api from "./API/Api";
import {AedServiceType} from "../containers/AedServices/constants";
import {AedType} from "../containers/Aeds/NewAed";

class AedService extends Api {
    urls = {
        objects: "AedService/get-all-aed-services",
        add: "AedService/create-aed-service",
        getById: "AedService/get-aed-service",
        edit: "AedService/edit-aed-service",
        delete: "AedService/delete-aed-service",
    };

    getAll = async (
        limit?: number, skip?: number, filter?: string
    ): Promise<any> => {
        try {
            let queryParams = `top=${limit}&skip=${skip} &orderby=VisitDate desc`;
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

    postNewAedServiceForm = async (data: AedServiceType): Promise<any> => {
        try {
            // @ts-ignore
            delete data.id;
            delete data.user;
            delete data.nonConformity;
            const formData = new FormData();
            formData.append("correctiveActionGroup", data.correctiveActionGroup);
            formData.append("visitDate", data.visitDate);
            formData.append("callDate", data.callDate);
            formData.append("description", data.description ?? '');
            formData.append("userId", data.userId.toString());
            formData.append("aedId", data.aedId ?? '');
            formData.append("nonConformityId", data.nonConformityId);
            formData.append("replacementPartsJson", JSON.stringify(data.replacementParts ?? []));

            (data.attachments ?? []).forEach((attachment, index) => {
                if (attachment.file) {
                    formData.append(`attachments[${index}].file`, attachment.file);
                }
                formData.append(`attachments[${index}].fileName`, attachment.fileName || attachment.file?.name || "");
            });
            const result = await this.postFormData(
                this.urls.add,
                formData
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

    getAedServiceById = async (
        id: string
    ): Promise<any> => {
        try {
            const result = await this.getData(this.urls.getById + "/" + id, {});
            if (!result)
                return {
                    data: []
                }
            return result.data;
        } catch (e) {
            console.log(e)
            return Promise.reject(e)
        }
    };

    editAedServiceForm = async (data: AedServiceType): Promise<any> => {
        try {
            // @ts-ignore
            delete data.user;
            delete data.nonConformity;

            const formData = new FormData();
            formData.append("correctiveActionGroup", data.correctiveActionGroup);
            formData.append("visitDate", data.visitDate);
            formData.append("callDate", data.callDate);
            formData.append("description", data.description ?? '');
            formData.append("userId", data.userId.toString());
            formData.append("nonConformityId", data.nonConformityId);
            formData.append("replacementPartsJson", JSON.stringify(data.replacementParts ?? []));

            (data.attachments ?? []).forEach((attachment, index) => {
                if (attachment.file) {
                    formData.append(`attachments[${index}].file`, attachment.file);
                }
                formData.append(`attachments[${index}].fileName`, attachment.fileName || attachment.file?.name || "");
            });

            const result = await this.putFormData(
                `/${this.urls.edit}`,
                formData
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };


    deleteAedService = async (id: string): Promise<any> => {
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

export default AedService;
