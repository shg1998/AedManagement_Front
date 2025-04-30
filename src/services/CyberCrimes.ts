import Api from "./API/Api";
import {getBaseUrl} from "../config";

class CyberCrimes extends Api {
    urls = {
        objects: "CyberCrimes/get-all-cyber-crimes",
        sigmaResponse: "SigmaResponses/get-all-sigma-responses",
        downloadCyberCrimeFile: "CyberCrimes/download-cyber-crime-file",
        downloadCyberCrimeResponseFile: "SigmaResponses/download-cyber-crime-response-file",
    };

    getCyberCrimes = async (
        limit?: number, skip?: number, filter?: string
    ): Promise<any> => {
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

    downloadFile = async (id: string | null | undefined): Promise<void> => {
        if (!id) {
            alert("شناسه فایل نامعتبر است");
            return;
        }

        try {
            const url = `${getBaseUrl()}/${this.urls.downloadCyberCrimeFile}/${id}`;
            const link = document.createElement("a");
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download error:", error);
            alert("خطا در دانلود فایل");
        }

    };


    getCyberCrimeResponse = async (
        limit?: number, skip?: number, filter?: string
    ): Promise<any> => {
        try {
            let queryParams = `top=${limit}&skip=${skip}`;
            if (filter) {
                queryParams += `&filter=${filter}`;
            }
            const result = await this.getData(this.urls.sigmaResponse + "?" + queryParams, {});
            let pagination = JSON.parse(result.headers.pagination);
            return {
                data: result.data,
                totalPages: pagination.totalPages,
                itemsPerPage: pagination.itemsPerPage,
                totalItems: pagination.totalItems,
                currentPage: pagination.currentPage,
            };
        } catch (e) {
            return Promise.reject(e)
        }
    };

}

export default CyberCrimes;
