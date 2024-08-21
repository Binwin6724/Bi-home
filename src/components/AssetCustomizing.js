import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Select from "react-select";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Spinner } from "react-bootstrap"; // Import spinner from react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

const AspectRatioOptions = [
  { value: "16:9", label: "16:9" },
  { value: "4:3", label: "4:3" },
  { value: "1:1", label: "1:1" },
  { value: "9:16", label: "9:16" },
  { value: "3:2", label: "3:2" },
  { value: "custom", label: "Custom" },
];

const ItemType = {
  FILE: "file",
};

const DraggableFile = ({ file, index, moveFile, removeFile }) => {
  const [, ref] = useDrag({
    type: ItemType.FILE,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType.FILE,
    hover: (item) => {
      if (item.index !== index) {
        moveFile(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      style={{
        userSelect: "none",
        margin: "10px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "inline-block",
        }}
      >
        {file.type.startsWith("image/") ? (
          <>
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              style={{ width: "150px" }}
            />
            <div>{file.name}</div> {/* Display image name */}
          </>
        ) : (
          <video width="150" controls>
            <source src={URL.createObjectURL(file)} type={file.type} />
            Your browser does not support the video tag.
          </video>
        )}
        <button
          onClick={() => removeFile(index)}
          style={{
            position: "absolute",
            top: "-5px",
            right: "-5px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "25px",
            height: "25px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            lineHeight: "1",
            padding: "0",
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [aspectRatio, setAspectRatio] = useState(null);
  const [customDimensions, setCustomDimensions] = useState({
    width: "",
    height: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const onDrop = (acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleAspectRatioChange = (selectedOption) => {
    setAspectRatio(selectedOption.value);
  };

  const handleCustomDimensionChange = (e) => {
    const { name, value } = e.target;
    setCustomDimensions((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDelete = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const moveFile = (fromIndex, toIndex) => {
    const updatedFiles = [...files];
    const [movedFile] = updatedFiles.splice(fromIndex, 1);
    updatedFiles.splice(toIndex, 0, movedFile);
    setFiles(updatedFiles);
  };

  const convertFile = () => {
    setLoading(true); // Start loading spinner
    const newConvertedFiles = [];

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width, height;

          switch (aspectRatio) {
            case "16:9":
              width = img.width;
              height = (img.width * 9) / 16;
              break;
            case "4:3":
              width = img.width;
              height = (img.width * 3) / 4;
              break;
            case "1:1":
              width = img.width;
              height = img.width;
              break;
            case "9:16":
              width = img.width;
              height = (img.width * 16) / 9;
              break;
            case "3:2":
              width = img.width;
              height = (img.width * 2) / 3;
              break;
            case "custom":
              width = parseInt(customDimensions.width) || img.width;
              height = parseInt(customDimensions.height) || img.height;
              break;
            default:
              width = img.width;
              height = img.height;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            const convertedFile = new File([blob], `converted_${file.name}`, {
              type: file.type,
            });
            const convertedUrl = URL.createObjectURL(convertedFile);
            newConvertedFiles.push({
              url: convertedUrl,
              name: file.name,
              type: "image",
            });
            if (newConvertedFiles.length === files.length) {
              // Check if all files are processed
              setConvertedFiles(newConvertedFiles);
              setLoading(false); // End loading spinner
            }
          }, file.type);
        };
      } else if (file.type.startsWith("video/")) {
        const convertedUrl = URL.createObjectURL(file);
        newConvertedFiles.push({
          url: convertedUrl,
          name: file.name,
          type: "video",
        });
        if (newConvertedFiles.length === files.length) {
          // Check if all files are processed
          setConvertedFiles(newConvertedFiles);
          setLoading(false); // End loading spinner
        }
      }
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="file-uploader">
        <div
          {...getRootProps()}
          style={{
            border: "2px dashed #cccccc",
            padding: "20px",
            cursor: "pointer",
          }}
        >
          <input {...getInputProps()} />
          <p>Drag & drop files here, or click to select files</p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
          {files.map((file, index) => (
            <DraggableFile
              key={file.name}
              file={file}
              index={index}
              moveFile={moveFile}
              removeFile={handleDelete}
            />
          ))}
        </div>

        <Select
          options={AspectRatioOptions}
          onChange={handleAspectRatioChange}
          placeholder="Select Aspect Ratio or Dimension"
        />

        {aspectRatio === "custom" && (
          <div className="custom-dimensions">
            <input
              type="number"
              name="width"
              placeholder="Width"
              value={customDimensions.width}
              onChange={handleCustomDimensionChange}
            />
            <input
              type="number"
              name="height"
              placeholder="Height"
              value={customDimensions.height}
              onChange={handleCustomDimensionChange}
            />
          </div>
        )}

        <button
          onClick={convertFile}
          style={{ marginTop: "20px", position: "relative" }}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{ marginRight: "10px" }}
              />
              Converting...
            </>
          ) : (
            "Convert Files"
          )}
        </button>

        {convertedFiles.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h2>Converted Files:</h2>
            {convertedFiles.map((file, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                {file.type === "image" ? (
                  <a
                    href={file.url}
                    download={`converted_${index}_${file.name}`}
                  >
                    <img
                      src={file.url}
                      alt={`Converted ${index}`}
                      style={{ width: "150px" }}
                    />
                    <p>Download Image</p>
                  </a>
                ) : (
                  <a
                    href={file.url}
                    download={`converted_${index}_${file.name}`}
                  >
                    <video width="150" controls>
                      <source src={file.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <p>Download Video</p>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default FileUploader;
