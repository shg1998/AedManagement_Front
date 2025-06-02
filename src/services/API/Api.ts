import axios, {AxiosInstance} from "axios";
import {getBaseUrl} from "../../config";
import {getItemSecure, deleteItemSecure} from "../../utils/AESCrypto";
import {tError} from "../../utils/toast";

export interface DefaultAxiosConfigInterface {
    Authorization?: string;
    query?: string;
}

const axiosInstance = axios.create({
    baseURL: getBaseUrl(),
    timeout: 0,
});
const CancelToken = axios.CancelToken;

export const ErrorToastId = {
    NETWORK: "networkErrorToastId",
    ERR_400: "error400",
    ERR_401: "error401",
    ERR_404: "error404",
    ERR_500: "error500",
};

class Api {
    protected axiosInstance: AxiosInstance = axiosInstance;

    protected axiosSource = CancelToken.source();

    private authorizedUserRequest(
        accessToken: boolean = false,
        query: string = ""
    ): AxiosInstance {
        let token: any;
        token = getItemSecure("mainToken") || "";
        const defaultsAxiosHeaders: DefaultAxiosConfigInterface =
            query !== "" ? {query: query.trim()} : {};
        defaultsAxiosHeaders.Authorization = `Bearer ${token}`;
        if (accessToken) {
            Object.assign(this.axiosInstance.defaults, {
                headers: {
                    ...defaultsAxiosHeaders,
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/json",
                },
            });
        } else {
            Object.assign(this.axiosInstance.defaults, {
                headers: {
                    ...defaultsAxiosHeaders,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Expose-Headers': 'Content-Disposition',
                    // 'Content-Disposition':'attachment'
                },
            });
        }
        return this.axiosInstance;
    }

    protected async putJsonData(
        url: string,
        data: any = null,
        token: any = null
    ): Promise<any> {
        return await this.authorizedUserRequest().put(url, data, {
            cancelToken: this.axiosSource.token,
        });
    }

    protected async patchJsonData(
        url: string,
        data: any = null,
        token: any = null
    ): Promise<any> {
        return await this.authorizedUserRequest().patch(url, data, {
            cancelToken: this.axiosSource.token,
        });
    }

    protected async postJsonData(
        url: string,
        data: any = null,
        token: any = null
    ): Promise<any> {
        return await this.authorizedUserRequest().post(url, data, {
            cancelToken: this.axiosSource.token,
        });
    }

    protected async postJsonDataForAccessToken(
        url: string,
        data: any = null
    ): Promise<any> {
        return await this.authorizedUserRequest(true).post(url, data, {
            cancelToken: this.axiosSource.token,
        });
    }

    protected async postJsonDataBlob(
        url: string,
        data: any = null
    ): Promise<any> {
        return await this.authorizedUserRequest().post(url, data, {
            cancelToken: this.axiosSource.token,
            responseType: "blob",
        });
    }

    protected async getJsonDataBlob(
        url: string,
        query: string = ""
    ): Promise<any> {
        const encodedQuery = encodeURIComponent(query); // Encode the OData query
        return await this.authorizedUserRequest(false, encodedQuery).get(url, {
            cancelToken: this.axiosSource.token,
            responseType: "blob",
        });
    }

    protected async postFormData(_url: string, _data: any): Promise<any> {
        try {
            return await this.authorizedUserRequest().post(_url, _data, {
                cancelToken: this.axiosSource.token,
                headers: {
                    "Content-Type": "multipart/form-data;",
                },
            }).then(res => res).catch(e => e);
        } catch (e) {
        }
    }

    protected async putFormData(_url: string, _data: any): Promise<any> {
        try {
            return await this.authorizedUserRequest().put(_url, _data, {
                cancelToken: this.axiosSource.token,
                headers: {
                    "Content-Type": "multipart/form-data;",
                },
            }).then(res => res).catch(e => e);
        } catch (e) {
        }
    }

    // protected async getData(
    //   url: string,
    //   options: any = {},
    //   query: string = ""
    // ): Promise<any> {
    //   try {
    //     return await this.authorizedUserRequest(false, query).get(url, {
    //       cancelToken: this.axiosSource.token,
    //       ...options,
    //     });
    //   } catch (e: any) {
    //     if (e?.response?.data?.data) tError(e.response.data.data);
    //   }
    // }

    protected async getData(
        url: string,
        options: any = {},
        query: string = "",
        redirectLink: string = ""
    ): Promise<any> {
        try {
            const encodedQuery = encodeURIComponent(query); // Encode the OData query

            return await this.authorizedUserRequest(false, encodedQuery).get(url, {
                cancelToken: this.axiosSource.token,
                ...options,
            });
        } catch (e: any) {
            if (e?.response?.data?.detail) tError(e.response.data.detail);
            if (redirectLink !== "") {
                window.location.href = redirectLink;
            }
        }
    }

    protected async deleteData(url: string, options: any = {}): Promise<any> {
        try {
            return await this.authorizedUserRequest().delete(url, {
                cancelToken: this.axiosSource.token,
                ...options,
            });
        } catch (e: any) {
            return Promise.reject(e);
        }
    }

    protected async axiosDownloadFile(url: string, fileName: string) {
        fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.setAttribute("download", "");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        // axios({
        //   url: url,
        //   method: "GET",
        //   responseType: "blob",
        //   onDownloadProgress: (progressEvent) => {
        //     const totalSize = progressEvent.total;
        //     const loadedSize = progressEvent.loaded;

        //     //@ts-ignore
        //     const progress = Math.floor((loadedSize / totalSize) * 100);

        //     // Perform actions with progress information
        //   },
        // }).then((response) => {
        //   const blob = new Blob([response.data]);

        //   const link = document.createElement("a");
        //   link.href = URL.createObjectURL(blob);
        //   link.setAttribute("download", "");
        //   document.body.appendChild(link);
        //   link.click();
        //   document.body.removeChild(link);
        // });
    }

    protected async postData(url: string): Promise<any> {
        try {
            return await this.authorizedUserRequest().post(url, null, {
                cancelToken: this.axiosSource.token,
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }
}

axiosInstance.interceptors.response.use(undefined, (error) => {
    const {response} = error;

    if (!error.response) {
        console.error("Error in network");
        return Promise.reject(error);
    }

    if (error.response.data?.message) {
        console.error(error.response.data.message);
    }
    const {status} = response;
    switch (status) {
        case 400:
            (async (): Promise<any> => {
                const message = error?.response?.data?.message;
                tError(
                    message === undefined
                        ? "مشکلی در ارسال درخواست وجود دارد،" +
                        " در صورت تکرار لطفا با پشتیبانی تماس بگیرید!"
                        : message,
                    {toastId: ErrorToastId.ERR_400}
                );
            })();
            break;
        case 401:
            (async (): Promise<any> => {
                let message = response.data?.detail;
                if (
                    message === "Not authenticated" ||
                    response.data?.code === "ERR_UNAUTHORIZED"
                ) {
                    message = "Your session has expired. Please log in again.";
                } else {
                    message = "Your session has expired. Please log in again.";
                }
                tError(message);
                deleteItemSecure("mainToken");
                setTimeout(() => {
                    window.location.replace(window.location.origin + "/login");
                }, 2500)
            })();
            break;
        case 403:
            (async (): Promise<any> => {
                // localStorage.clear();
                tError("دسترسی امکان‌پذیر نیست.");

                // setTimeout(() => {
                //     // eslint-disable-next-line no-restricted-globals
                //     location.reload();
                // }, 2000);
            })();
            break;
        case 404:
            (async (): Promise<any> => {
            })();
            break;
        case 426:
            (async (): Promise<any> => {
                const message = error?.response?.data?.detail;
                tError(message ? message : "نشست منقضی شده است.");
                deleteItemSecure("mainToken");
                window.location.replace(window.location.origin + "/login");
            })();
            break;
        // case 500:
        //   (async (): Promise<any> => {
        //     const message = error?.response?.data?.detail;

        //     tError(message === undefined ? "خطایی رخ داده است." : message, {
        //       toastId: ErrorToastId.ERR_500,
        //     });
        //   })();
        //   break;
    }

    return Promise.reject(
        error?.response?.data?.error === undefined
            ? error
            : error?.response?.data?.error
    );
});

export default Api;
