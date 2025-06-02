import Api from "./API/Api";
import {getBaseUrl} from "../config";

class Attachment extends Api {
    urls = {
        download: "Attachment/download-attachment",
    };

    downloadAttachment = async (id: string): Promise<void> => {
        try {
            const link = document.createElement("a");
            link.href = `${getBaseUrl()}/` + this.urls.download + "/" + id;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(`${getBaseUrl()}/` + this.urls.download + "/" + id);
        } catch (e) {
            console.error("Error downloading file", e);
            throw e;
        }
    };
}

export default Attachment;
