import Api from "./API/Api";
import {
    IAccessToken,

} from "../interfaces";

class Account extends Api {
    urls = {
        login: "User/Login",
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
}

export default Account;
