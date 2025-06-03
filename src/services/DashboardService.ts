import Api from "./API/Api";

class DashboardService extends Api {
    urls = {
        aedStatus: "Dashboard/aeds-status",
        aedSelfTestLocations: "Dashboard/aeds-self-tests-locations",
    };

    getAedStatus = async (): Promise<any> => {
        try {
            const result = await this.getData(this.urls.aedStatus, {});
            if (!result)
                return {
                    data: {}
                }
            return result.data.data;
        } catch (e) {
            console.log(e)
            return Promise.reject(e)
        }
    };

    getAedSelfTestLocation = async (province?: string): Promise<any> => {
        try {
            const result = await this.getData(this.urls.aedSelfTestLocations + "/" + province, {});
            if (!result)
                return {
                    data: []
                }
            return result.data.data;
        } catch (e) {
            console.log(e)
            return Promise.reject(e)
        }
    };
}

export default DashboardService;
