import Api from "./API/Api";
import {
    EditUserInterface,
    NewUserFormInterfaceOTP,
    PersonalInfoInterfaceProps,
    SystemResetProps,
    BatchDeleteInterface,
} from "../interfaces";
import {AdminType} from "../containers/Admins/NewAdmin";

class Users extends Api {
    urls = {
        objects: "User/get-all-users",
        admins: "User/get-all-admins",
        add: "User/create-user",
        addAdmin: "User/create-admin",
        userEdit: "User/edit-user-by-admin",
        adminEdit: "User/edit-admin",
    };
    getUsers = async (limit?: number, skip?: number, filter?: string): Promise<any> => {
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

    getAdmins = async (limit?: number, skip?: number, filter?: string): Promise<any> => {
        try {
            let queryParams = `top=${limit}&skip=${skip}`;
            if (filter) {
                queryParams += `&filter=${filter}`;
            }
            const result = await this.getData(this.urls.admins + "?" + queryParams, {});
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

    //----------------------------------------------------------------
    postNewUserForm = async (data: AdminType): Promise<any> => {
        try {
            // @ts-ignore
            delete data.id;
            const result = await this.postJsonData(
                this.urls.add,
                data
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

    postNewAdminForm = async(data: AdminType): Promise<any> => {
        try {
            // @ts-ignore
            delete data.id;
            const result = await this.postJsonData(
                this.urls.addAdmin,
                data
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    }
    //----------------------------------------------------------------

    editUserForm = async (data: AdminType): Promise<any> => {
        try {
            let dataForApi: any = {
                password : data.password.toString().trim() === "" ? null : data.password,
                passwordConfirm: data.passwordConfirm.toString().trim() === "" ? null : data.passwordConfirm,
                isActive : data.isActive,
                fullName : data.fullName,
                userName: data.userName,
                userId: data.id,
                email: data.email,
                province: data.province
            }
            const result = await this.putJsonData(
                `/${this.urls.userEdit}`,
                dataForApi
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

    editAdminForm = async (data: AdminType): Promise<any> => {
        try {
            let dataForApi: any = {
                password : data.password.toString().trim() === "" ? null : data.password,
                passwordConfirm: data.passwordConfirm.toString().trim() === "" ? null : data.passwordConfirm,
                isActive : data.isActive,
                fullName : data.fullName,
                userName: data.userName,
                userId: data.id,
                email: data.email,
                province: data.province
            }
            const result = await this.putJsonData(
                `/${this.urls.adminEdit}`,
                dataForApi
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

}

export default Users;
