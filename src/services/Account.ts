import Api from "./API/Api";
import {
    IAccessToken,

} from "../interfaces";
import {UserChangePasswordType} from "../containers/UserChangePassword/UserChangePassword";

class Account extends Api {
    urls = {
        login: "User/Login",
        changePassword: "User/change-password",
    };

    loginUser = async (data: IAccessToken): Promise<any> => {
        try {
            const result = await this.postJsonData(
                `${this.urls.login}`,
                data
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

    changePassword = async (data: UserChangePasswordType) => {
        try {
            const result = await this.postJsonData(
                `${this.urls.changePassword}`,
                data
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    }
}

export default Account;
