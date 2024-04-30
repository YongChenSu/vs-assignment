import { useState } from 'react';
import classNames from 'classnames';
import Button from './components/common/Button';
import style from './ResizableEditor.module.css';
import TextArea from './components/common/TextArea';

function ResizableEditor() {
  const [isEditable, setIsEditable] = useState(true);
  const [isLargeEditorSize, setIsLargeEditorSize] = useState(false);
  const handleEditTextArea = () => {
    setIsEditable(prev => !prev);
  };
  const handleToggleEditorSize = () => {
    setIsLargeEditorSize(prev => !prev);
  };

  return (
    <div
      className={classNames(style.container, {
        [style.largeEditor]: isLargeEditorSize,
      })}
    >
      <TextArea className={style.textArea} isEditable={isEditable} />
      <div className={style.buttonsContainer}>
        <Button
          text={isEditable ? 'read only' : 'edit'}
          onClick={handleEditTextArea}
        />
        <Button text="resize" onClick={handleToggleEditorSize} />
      </div>
    </div>
  );
}

export default ResizableEditor;
