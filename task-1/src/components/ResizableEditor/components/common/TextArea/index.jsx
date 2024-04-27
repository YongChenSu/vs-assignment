function TextArea({ className, isEditable, placeholderText }) {
  return (
    <textarea
      className={className}
      readOnly={!isEditable}
      placeholder={placeholderText}
    />
  );
}

export default TextArea;
