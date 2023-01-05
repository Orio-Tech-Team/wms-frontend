import ImageUploading from "react-images-uploading";
import { Label } from "reactstrap";
import React from "react";
import { useState } from "react";
import styles from "./styles.module.css";

const InputTypeImage = ({
  comClass,
  text,
  required,
  images,
  setImages,
  maxImages,
  fetchedImages,
}) => {
  //
  const [state, setState] = useState([]);
  const changeFunction = (imageList, addUpdateIndex) => {
    // data for submit

    //
    console.log(imageList, addUpdateIndex);
    const sendData = imageList.map((item) => {
      return { image_url: item.data_url };
    });
    console.log(sendData);
    setState(imageList);
    setImages(sendData);
  };
  //
  return (
    <div className={`${comClass} ${styles.container}`}>
      <Label for="form-2-first-name">
        {text}
        {required ? <em>*</em> : ""}
      </Label>
      <ImageUploading
        multiple
        value={state}
        onChange={changeFunction}
        maxNumber={maxImages}
        dataURLKey="data_url"
        maxFileSize={15000000}
        acceptType={["jpg", "png"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
          errors,
        }) => (
          // write your building UI
          <>
            {errors ? (
              <div>
                {errors.maxNumber && (
                  <span>Number of selected images exceed maxNumber</span>
                )}
                {errors.acceptType && (
                  <span>Your selected file type is not allow</span>
                )}
                {errors.maxFileSize && (
                  <span>Selected file size exceed maxFileSize</span>
                )}
                {errors.resolution && (
                  <span>
                    Selected file is not match your desired resolution
                  </span>
                )}
              </div>
            ) : (
              ""
            )}
            <div className={styles.btn_wrapper}>
              <button
                type="button"
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Upload Images
              </button>
              <button type="button" onClick={onImageRemoveAll}>
                Remove all images
              </button>
              <div className={styles.images_wrapper}>
                {imageList.length > 0 || !fetchedImages
                  ? ""
                  : fetchedImages.map((image, index) => {
                      return (
                        <div key={index} className={styles.uploaded_image}>
                          {console.log(image)}
                          <img src={image} alt="" width="100" />
                          {/* <div className={styles.uploaded_images_btn_wrapper}>
                    <button
                      type="button"
                      onClick={() => onImageUpdate(index)}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => onImageRemove(index)}
                    >
                      Remove
                    </button>
                  </div> */}
                        </div>
                      );
                    })}
                {imageList.map((image, index) => (
                  <div key={index} className={styles.uploaded_image}>
                    <img src={image["data_url"]} alt="" width="100" />
                    <div className={styles.uploaded_images_btn_wrapper}>
                      <button
                        type="button"
                        onClick={() => onImageUpdate(index)}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={() => onImageRemove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </ImageUploading>
    </div>
  );
};

export default InputTypeImage;
