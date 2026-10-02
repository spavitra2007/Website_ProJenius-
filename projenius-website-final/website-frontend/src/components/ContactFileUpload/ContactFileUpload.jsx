import React, { useRef, useState } from "react";
import ContactIcon from "../ContactIcon/ContactIcon";
import ContactFieldError from "../ContactFieldError/ContactFieldError";
import "./ContactFileUpload.css";

/* =========================================================
   FILE SIZE FORMATTER
========================================================= */

export const formatFileSize = (bytes = 0) => {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};


/* =========================================================
   CONTACT FILE UPLOAD
   - Keeps the selected File object in parent state
   - Does NOT upload directly
   - Parent form sends it to backend on submit
========================================================= */

export default function ContactFileUpload({
  field,
  file,
  error,
  maxMB,
  onSelect,
}) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const id = `pjct-f-${field.id}`;
  const hintId = `${id}-hint`;
  const errId = `${id}-err`;

  /* -------------------------------------------------------
     Select / clear file
  ------------------------------------------------------- */

  const pick = (pickedFile) => {
    onSelect(field.id, pickedFile || null);
  };


  /* -------------------------------------------------------
     File input
  ------------------------------------------------------- */

  const handleInput = (event) => {
    const selectedFile = event.target.files?.[0] || null;

    pick(selectedFile);

    /*
      Do NOT clear event.target.value here.

      The selected File needs to remain available until
      ContactSmartForm submits the FormData.
    */
  };


  /* -------------------------------------------------------
     Drag & Drop
  ------------------------------------------------------- */

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragging(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragging(false);

    const droppedFile = event.dataTransfer.files?.[0] || null;

    if (droppedFile) {
      pick(droppedFile);
    }
  };


  /* -------------------------------------------------------
     Remove selected file
  ------------------------------------------------------- */

  const handleRemove = () => {
    pick(null);

    /*
      Reset the actual input so the same file can be selected
      again after removing it.
    */
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };


  return (
    <div
      className={`pjct-upload${
        error ? " pjct-upload--invalid" : ""
      }`}
    >

      {/* =====================================================
          LABEL
      ===================================================== */}

      <span
        className="pjct-upload__label"
        id={`${id}-label`}
      >
        {field.label}
      </span>


      {/* =====================================================
          UPLOAD ZONE
      ===================================================== */}

      <div
        className={`pjct-upload__zone${
          dragging
            ? " pjct-upload__zone--drag"
            : ""
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >

        {/* Hidden file input */}

        <input
          ref={inputRef}
          className="pjct-upload__input"
          id={id}
          name={field.id}
          type="file"
          accept={field.accept}
          data-pjct-field={field.id}
          aria-labelledby={`${id}-label`}
          aria-describedby={`${hintId}${
            error ? ` ${errId}` : ""
          }`}
          onChange={handleInput}
        />


        {/* Choose file button */}

        <label
          className="pjct-upload__button"
          htmlFor={id}
        >
          <ContactIcon name="upload" />
          Choose file
        </label>


        {/* Drag text */}

        <span className="pjct-upload__text">
          or drag and drop it here
        </span>

      </div>


      {/* =====================================================
          FILE HINT
      ===================================================== */}

      <p
        className="pjct-upload__hint"
        id={hintId}
      >
        {field.fmt} · up to {maxMB} MB. Nothing is uploaded
        until you send the enquiry.
      </p>


      {/* =====================================================
          SELECTED FILE
      ===================================================== */}

      {file && (
        <div className="pjct-upload__file">

          <ContactIcon name="file" />

          <span className="pjct-upload__file-name">
            {file.name}
          </span>

          <span className="pjct-upload__file-size">
            {formatFileSize(file.size)}
          </span>

          <button
            type="button"
            className="pjct-upload__remove"
            onClick={handleRemove}
            aria-label={`Remove ${file.name}`}
          >
            <ContactIcon
              name="x"
              size="1em"
              strokeWidth={2.2}
            />

            Remove
          </button>

        </div>
      )}


      {/* =====================================================
          ERROR
      ===================================================== */}

      <ContactFieldError
        id={errId}
        message={error}
      />

    </div>
  );
}