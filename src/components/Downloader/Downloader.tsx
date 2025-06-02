import React, { useState } from "react";
//@ts-ignore
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

const Downloader: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const handleDownload = () => {
        let pro = 0
        const intervalId = setInterval(async () => {
            pro += 5
            if (pro > 100) {
                clearInterval(intervalId)
                
            } else {
                setProgress(pro)
            }
        },500)
    }

  return <Progress percent={progress} status="success" />;
};
export default Downloader;
