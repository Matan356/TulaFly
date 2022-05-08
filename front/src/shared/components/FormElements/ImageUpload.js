import { Button } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";


const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = async (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    let image = await resizeFile(pickedFile);
    props.onInput(props.id, image, fileIsValid);
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        512,
        512,
        "JPEG",
        90,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div >
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div>
        <div style={{maxWidth:10}} >
          {previewUrl && <img width={300} src={previewUrl} alt="Preview" />}
        </div>
        <Button variant="contained" color="secondary" type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
