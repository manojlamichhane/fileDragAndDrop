import { useState, useRef } from "react";
import background from "./../assets/globalagriculture.jpg";
import "./../App.css";
import axios from "axios";

type imageProp = {
  name: string;
  url: string;
};

const Upload = () => {
  const [image, setImage] = useState<imageProp>();
  const [file, setFile] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLDivElement>();
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const selectFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const uploadFile = async () => {
    setIsUploading(true);
    await axios.post(
      "https://agrovision.azurewebsites.net/uploadfile",
      { file: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setIsUploading(false);
    setIsUploaded(true);
  };
  const onFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
      setFile(target.files[0]);
      setImage({
        name: target.files[0].name,
        url: URL.createObjectURL(target.files[0]),
      });
    }
  };

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "copy";
    }
  };
  const onDragLeave = (event: DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };
  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer && event.dataTransfer.files?.length) {
      setFile(event.dataTransfer.files[0]);
      setImage({
        name: event.dataTransfer.files[0].name,
        url: URL.createObjectURL(event.dataTransfer.files[0]),
      });
    }
  };
  const deleteImage = () => {
    setImage({ name: "", url: "" });
  };

  return (
    <div
      id="select"
      className="main"
      style={{
        backgroundImage: `linear-gradient( rgba(8, 8, 37, 0.75), rgba(0, 15, 80, 0.675)),url(${background})`,
      }}
    >
      {isUploaded ? (
        <div className="card">
          <div className="top">
            <p>Analyze Image</p>
          </div>
          <div className="drag-area">
            <div className="container">
              {image ? (
                <div className="image">
                  <span className="delete" onClick={deleteImage}>
                    &times;
                  </span>
                  <img src={image && image.url} alt="image" />
                </div>
              ) : null}
            </div>
            <button type="button" disabled={!image} onClick={uploadFile}>
              Analyze Image
            </button>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="top">
            <p>Select Image</p>
          </div>
          <div
            className="drag-area"
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            {isDragging ? (
              <span className="select">Drop images here</span>
            ) : (
              <>
                Drag & Drop image here or{" "}
                <span className="select" role="button" onClick={selectFiles}>
                  Browse
                </span>
              </>
            )}

            <input
              name="file"
              type="file"
              className="file"
              ref={fileInputRef}
              onChange={onFileSelect}
            ></input>
          </div>
          <div className="container">
            {image ? (
              <div className="image">
                <span className="delete" onClick={deleteImage}>
                  &times;
                </span>
                <img src={image && image.url} alt="image" />
              </div>
            ) : null}
          </div>
          <button type="button" disabled={!image} onClick={uploadFile}>
            {isUploading ? "Uploading" : "Upload"}
          </button>
        </div>
      )}
      {/* <div className="card">
        <div className="top">
          <p>Select Image</p>
        </div>
        <div
          className="drag-area"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          {isDragging ? (
            <span className="select">Drop images here</span>
          ) : (
            <>
              Drag & Drop image here or{" "}
              <span className="select" role="button" onClick={selectFiles}>
                Browse
              </span>
            </>
          )}

          <input
            name="file"
            type="file"
            className="file"
            ref={fileInputRef}
            onChange={onFileSelect}
          ></input>
        </div>
        <div className="container">
          {image ? (
            <div className="image">
              <span className="delete" onClick={deleteImage}>
                &times;
              </span>
              <img src={image && image.url} alt="image" />
            </div>
          ) : null}
        </div>
        <button type="button" disabled={!image} onClick={uploadFile}>
          {isUploading ? "Uploading" : "Upload"}
        </button>
      </div> */}
    </div>
  );
};

export default Upload;
