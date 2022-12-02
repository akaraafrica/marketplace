import dynamic from "next/dynamic";
import styles from "./index.module.scss";
const ReactQuill: any = dynamic(() => import("react-quill"), { ssr: false });
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: ["#353945"] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
];

function TextEditor({
  label,
  value,
  onChange,
  placeholder,
  height = "16rem",
  errors,
  name,
}: any) {
  return (
    <div className={styles.main}>
      <label>{label}</label>
      <div
        className={
          errors && errors[name]?.type === "required" ? styles.error : ""
        }
      >
        <ReactQuill
          modules={{
            toolbar: toolbarOptions,
          }}
          theme="snow"
          style={{
            height: height,
            marginBottom: "100px",
          }}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {errors && errors[name]?.type === "required" && (
          <span className={styles.errorMsg}>This field is required</span>
        )}
      </div>
    </div>
  );
}

export default TextEditor;
