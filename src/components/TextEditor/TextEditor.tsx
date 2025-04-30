import { Editor } from "@tinymce/tinymce-react";
import * as React from "react";
import { useThemeContext } from "../../ThemeContext";
import {useEffect, useState} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import styles from "./TextEditor.module.scss"
const TextEditor: React.FC<{
    formik: any;
    setLoading: any;
    initialValue?: string;
}> = ({ formik, setLoading, initialValue }) => {

    const [value,setValue] = useState(initialValue ?? "")
    const { themeMode } = useThemeContext();

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "blockquote"],
            [{ color: [ "#000000",
                    "#2C2E2F",
                    "#6C7378",
                    "#FFFFFF",
                    "#009CDE",
                    "#003087",
                    "#FF9600",
                    "#00CF92",
                    "#DE0063",
                    "#640487",
                ] }],
            [{ background: ["#000000",
                    "#2C2E2F",
                    "#6C7378",
                    "#FFFFFF",
                    "#009CDE",
                    "#003087",
                    "#FF9600",
                    "#00CF92",
                    "#DE0063",
                    "#640487"
                ] }],
            [{ align: [false, "center", "right", "justify"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            [{ direction: "rtl" }],
        ]
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "blockquote",
        "list",
        "bullet",
        "link",
        "color",
        "background",
        "align",
        "font",
        "direction"
    ];
    const handleProcedureContentChange = (content:any) => {
        formik.setFieldValue("description", content)
        setValue(content);
    };


    useEffect(()=>{
        setLoading(false)
    },[])

    return (
        <>
            <ReactQuill
                className={styles.quillBorder}
                theme="snow"
                modules={modules}
                formats={formats}
                value={value}
                onChange={handleProcedureContentChange}
            />
            {/*<Editor
                apiKey="f3vc1amzkxcq17v37oxml3wh7t4a90oq8gco5nbjncm4m4b4"
                value={value}
                onInit={() => setLoading(false)}
                init={{
                    branding: false,
                    contextmenu: "cut copy bold italic underline",
                    directionality: "rtl",
                    height: 400,
                    statusbar: false,
                    language: "fa",

          skin: themeMode === "dark" ? "oxide-dark" : "oxide",

          content_css: themeMode === "dark" ? "dark" : "default",

                    menu: {
                        file: {
                            title: "File",
                            items: "preview | print",
                        },
                        edit: {
                            title: "Edit",
                            items:
                                "undo redo | cut copy paste pastetext | selectall",
                        },
                        insert: {
                            title: "Insert",
                            items: "charmap emoticons hr",
                        },
                        format: {
                            title: "Format",
                            items:
                                "bold italic underline strikethrough superscript subscript codeformat | styles blocks fontsize align lineheight | forecolor backcolor | removeformat",
                        },
                    },
                    menubar: "file | edit | insert | format",
                    resize: false,
                    plugins:
                        "preview autolink directionality visualblocks visualchars fullscreen template codesample charmap pagebreak nonbreaking anchor advlist lists",
                    toolbar:
                        "formatselect | bold italic underline | forecolor backcolor blockquote | alignright aligncenter alignleft alignjustify | rtl ltr | numlist bullist indent outdent | removeformat",
                }}
                onEditorChange={(event) => {
                    formik.setFieldValue("description", event)
                    setValue(event)
                } }
            />*/}
        </>
    );
};

export default TextEditor;
