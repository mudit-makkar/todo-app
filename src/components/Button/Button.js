import styles from "./style.module.css";
export default function Button({ handleClick, text }) {
  return (
    <>
      <button
        onClick={() => {
          handleClick();
        }}
        className={styles.button}
      >
        {text}
      </button>
    </>
  );
}
