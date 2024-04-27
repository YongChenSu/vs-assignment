import style from './Button.module.css';

function Button({ text, onClick }) {
  return (
    <button type="button" className={style.button} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
