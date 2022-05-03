import React, { useCallback, useState } from "react";
import styles from "./index.module.scss";

interface InputTaskProps {
  id: string;
  title: string;
  onDone: (id: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
  id,
  title,
  onDone,
  onEdited,
  onRemoved,
}) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input
          type="checkbox"
          checked={checked}
          className={styles.inputTaskCheckbox}
          onChange={(e) => {
            setChecked(e.target.checked);
            if (e.target.checked) {
              onDone(id);
            }
          }}
        ></input>
        <h3 className={styles.inputTaskTitle}>{title}</h3>
      </label>
      <button
      aria-label="Edit"
      className={styles.inputTaskEdit}
      onClick={() => {

      }}
      />
      <button
      aria-label="Remove"
      className={styles.inputTaskRemove}
      onClick={() => {
          if(confirm('Are you sure')) {
              onRemoved(id);
          }
          
      }}
      />
    </div>
  );
};
