import Api from "./API/Api";

class Priority extends Api {
    urls = {
        getAll: "Priority/GetSelectList"
    };
    getPriorities = async (): Promise<any> => {
        try {
            const result = await this.getData(
                this.urls.getAll,
                {}
            );
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    };

}

export default Priority;
