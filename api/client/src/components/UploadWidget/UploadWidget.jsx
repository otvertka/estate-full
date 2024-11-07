import { createContext, useEffect, useState } from "react";
const CloudinaryScriptContext = createContext();

function UploadWidget({ uwConfig, setPublicId, setState }) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            const uwScript = document.getElementById("uw");
            if (!uwScript) {
                const script = document.createElement("script");
                script.setAttribute("async", "");
                script.setAttribute("id", "uw");
                script.src = "https://upload-widget.cloudinary.com/global/all.js";
                script.addEventListener("load", () => setLoaded(true));
                document.body.appendChild(script);
            } else {
                setLoaded(true);
            }
        }
    }, [loaded]);

    const initializeCloudinaryWidget = () => {
        if (loaded) {
            const myWidget = window.cloudinary.createUploadWidget(
                uwConfig,
                (error, result) => {
                    if (!error && result && result.event === "success") {
                        setState((prev) => {
                            if (prev.length === 0) {
                                return [result.info.secure_url];
                            } else {
                                return [...prev, result.info.secure_url];
                            }
                        });
                    }
                }
            );
            document.getElementById("upload_widget").addEventListener(
                "click",
                function () {
                    setState([]);
                    myWidget.open();
                },
                false
            );
        }
    };

    return (
        <CloudinaryScriptContext.Provider value={{ loaded }}>
            <button
                id="upload_widget"
                className="cloudinary-button"
                onClick={initializeCloudinaryWidget}
            >
                Upload
            </button>
        </CloudinaryScriptContext.Provider>
    );
};
export default UploadWidget;
export { CloudinaryScriptContext };