import React, { useState } from "react";
import jsPDF from "jspdf";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

const SortableImage = SortableElement(({ image, onDelete }) => (
  <div style={{ position: "relative", display: "inline-block", margin: "10px" }}>
    <img src={image} alt="uploaded" style={{ width: "150px" }} />
    <button
      onClick={onDelete}
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
));

const SortableImageList = SortableContainer(({ images, onDelete }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
      {images.map((image, index) => (
        <SortableImage
          key={`item-${index}`}
          index={index}
          image={image}
          onDelete={() => onDelete(index)}
        />
      ))}
    </div>
  );
});

const ImageToPDF = () => {
  const [images, setImages] = useState([]);
  const [fileCount, setFileCount] = useState(0);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
    setFileCount((prevCount) => prevCount + files.length); // Update the file count correctly
  };

  const moveItem = (arr, fromIndex, toIndex) => {
    const newArr = [...arr];
    const [removed] = newArr.splice(fromIndex, 1);
    newArr.splice(toIndex, 0, removed);
    return newArr;
  };

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    setImages((oldImages) => moveItem(oldImages, oldIndex, newIndex));
  };

  const handleDelete = (index) => {
    setImages((oldImages) => oldImages.filter((_, i) => i !== index));
    setFileCount((prevCount) => prevCount - 1); // Decrease the file count
  };

  const handlePDFDownload = () => {
    const doc = new jsPDF();

    images.forEach((image, index) => {
      if (index !== 0) {
        doc.addPage();
      }
      doc.addImage(image, "JPEG", 10, 10, 180, 160); // Adjust dimensions as needed
    });

    doc.save("images.pdf");
  };

  return (
    <div>
      <h1>Upload Images to Convert to PDF</h1>
      <label className="custom-file-upload">
        Choose Files
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
      </label>
      {fileCount > 0 && <span style={{marginLeft:"10px"}}>{fileCount} files selected</span>}
      <SortableImageList images={images} onSortEnd={handleSortEnd} onDelete={handleDelete} axis="xy" />
      {images.length > 0 && (
        <button onClick={handlePDFDownload} style={{ marginTop: "20px" }}>
          Download PDF
        </button>
      )}
    </div>
  );
};

export default ImageToPDF;
