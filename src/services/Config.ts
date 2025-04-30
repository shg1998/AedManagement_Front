import Api from "./API/Api";

class ConfigService extends Api {
    urls = {
        userSetting: "config/v1/user",
        notificationSetting: "config/v1/notification",
        taxxiSetting: "config/v1/taxii",
    };


    getUserSetting = async (
    ): Promise<any> => {
        try {
            const result = await this.getData(this.urls.userSetting);
            return result.data;
        } catch (e) {return Promise.reject(e)}
    };


    updateUserSetting = async (data: any): Promise<any> => {
        try {
            const result = await this.putJsonData(`/${this.urls.userSetting}`, data);
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

    getRestUserSetting = async (
    ): Promise<any> => {
        try {
            const result = await this.getData(this.urls.userSetting + '/reset');
            return result.data;
        } catch (e) {return Promise.reject(e)}
    };


    getNotificationSetting = async (
    ): Promise<any> => {
        try {
            const result = await this.getData(this.urls.notificationSetting);
            return result.data;
        } catch (e) {return Promise.reject(e)}
    };


    updateNotificationSetting = async (data: any): Promise<any> => {
        try {
            const result = await this.putJsonData(`/${this.urls.notificationSetting}`, data);
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

    getRestNotificationSetting = async (
    ): Promise<any> => {
        try {
            const result = await this.getData(this.urls.notificationSetting + '/reset');
            return result.data;
        } catch (e) {return Promise.reject(e)}
    };



    getTaxxiSetting = async (
    ): Promise<any> => {
        try {
            const result = await this.getData(this.urls.taxxiSetting);
            return result.data;
        } catch (e) {return Promise.reject(e)}
    };


    updateTaxxiSetting = async (data: any): Promise<any> => {
        try {
            const result = await this.putJsonData(`/${this.urls.taxxiSetting}`, data);
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

    getRestTaxxiSetting = async (
    ): Promise<any> => {
        try {
            const result = await this.getData(this.urls.taxxiSetting + '/reset');
            return result.data;
        } catch (e) {return Promise.reject(e)}
    };

}
export default ConfigService;
