import styles from "./style.module.css";
export default function Button({ handleClick, text, disabled }) {
  return (
    <>
      <button
        onClick={() => {
          handleClick();
        }}
        className={styles.button}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  );
}
