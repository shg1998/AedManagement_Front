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
        add: "User/create-user",
        systemReset: "user/v1/system_reset_password/",
        sendCode: "user/v1/send_validation_code",
        personalInfo: "user/v1/personal_info/",
        batchDeleteUser: "user/v1/batch_delete/",
        userDetails: "Admin/GetEdit",
        userEdit: "User/edit-user",
        userChangeIsActive: "Admin/ChangeIsActive",
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

    changeUserStatus = async (id: number): Promise<any> => {
        try {
            const result = await this.getData(
                this.urls.userChangeIsActive + `?id=${id}`,
                {},
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

    deleteUser = async (data: SystemResetProps): Promise<any> => {
        try {
            const result = await this.deleteData(
                `/${this.urls.objects}${data.userId}/${data.otpCode}`
            );
            return result;
        } catch (e) {
            return Promise.reject(e);
        }
    };
    userSystemResetPassword = async (data: SystemResetProps): Promise<any> => {
        try {
            const result = await this.getData(
                `/${this.urls.systemReset}${data.userId}/${data.otpCode}`
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
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
    //----------------------------------------------------------------
    getUserDetails = async (id: number): Promise<any> => {
        try {
            const result = await this.getData(this.urls.userDetails + `?id=${id}`);
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

    editUserForm = async (data: AdminType): Promise<any> => {
        try {
            let dataForApi: any = {
                password : data.password.toString().trim() === "" ? null : data.password,
                passwordConfirm: data.passwordConfirm.toString().trim() === "" ? null : data.passwordConfirm,
                isActive : data.isActive,
                fullName : data.fullName,
                userName: data.userName,
                id: data.id,
                email: data.email
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

    editUser = async (data: EditUserInterface): Promise<any> => {
        try {
            const result = await this.putJsonData(
                `/${this.urls.objects}${data.userId}/${data.otpCode}`,
                data.data
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

    putUser = async ({id, data}: { id?: number; data: any }): Promise<any> => {
        try {
            const result = await this.putJsonData(this.urls.objects + `${id}`, data);
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

    // @ts-ignore
    postUserImage = async (data): Promise<any> => {
        try {
            const result = await this.postFormData(
                this.urls.objects + "upload_image",
                data
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };
    getValidationCode = async (requester_path: string): Promise<any> => {
        try {
            const result = await this.getData(
                this.urls.sendCode + `?requester_path=${requester_path}`
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };
    updatePersonalInfo = async (
        data: PersonalInfoInterfaceProps
    ): Promise<any> => {
        try {
            const {otpCode, userData} = data;
            const result = await this.postJsonData(
                this.urls.personalInfo + `${otpCode}`,
                userData
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };
    batchDeleteUser = async (data: BatchDeleteInterface): Promise<any> => {
        try {
            const result = await this.postJsonData(
                `/${this.urls.batchDeleteUser}${data.otpCode}`,
                data.roleIDs
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

}

export default Users;
