import Api from "./API/Api";

class DashboardService extends Api {
    urls = {
        aedStatus: "Dashboard/aeds-status",
        aedSelfTestLocations: "Dashboard/aeds-self-tests-locations",
        aedTestTrend: "Dashboard/aed-test-trend",
        aedServicesStatReport: "Dashboard/aed-services-statistical-report",
    };

    getAedStatus = async (province?: string): Promise<any> => {
        try {
            const result = await this.getData(this.urls.aedStatus + "/" + province, {});
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

    getAedServicesStatisticalReport = async (province?: string): Promise<any> => {
        try {
            const result = await this.getData(this.urls.aedServicesStatReport + "/" + province, {});
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

    getAedTestTrend = async (province?: string): Promise<any> => {
        try {
            const result = await this.getData(this.urls.aedTestTrend + "/" + province, {});
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
