import styles from "./style.module.css";
export default function Dropdown({ value, setValue }) {
  return (
    <>
      <select
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className={styles.dropdown}
      >
        <option value="All" selected>
          All
        </option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
      </select>
    </>
  );
}
