import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { Spinner } from 'react-bootstrap'; // Import spinner from react-bootstrap
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
  IMAGE: 'image',
};

const DraggableImage = ({ image, index, moveImage, handleDelete }) => {
  const [, ref] = useDrag({
    type: ItemTypes.IMAGE,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.IMAGE,
    hover: (item) => {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      style={{
        margin: '10px',
        display: 'inline-block',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      <img
        src={image.url}
        alt={image.name}
        style={{ width: '150px' }}
      />
      <div>{image.name}</div>
      <button
        onClick={() => handleDelete(index)}
        style={{
          position: 'absolute',
          top: '-5px',
          right: '-5px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '25px',
          height: '25px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          lineHeight: '1',
          padding: '0',
        }}
      >
        &times;
      </button>
    </div>
  );
};

const ImageToPDF = () => {
  const [images, setImages] = useState([]);
  const [fileCount, setFileCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file, index) => ({
      id: `image-${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      name: file.name, // Add the file name
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
    setFileCount((prevCount) => prevCount + files.length);
  };

  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setImages(updatedImages);
  };

  const handleDelete = (index) => {
    setImages((oldImages) => oldImages.filter((_, i) => i !== index));
    setFileCount((prevCount) => prevCount - 1);
  };

  const handlePDFDownload = () => {
    setLoading(true); // Start loading state

    const doc = new jsPDF();
    images.forEach((image, index) => {
      if (index !== 0) {
        doc.addPage();
      }
      doc.addImage(image.url, 'JPEG', 10, 10, 180, 160); // Adjust dimensions as needed
    });

    doc.save('images.pdf');
    setLoading(false); // End loading state
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h1>Upload Images to Convert to PDF</h1>
        <label className="custom-file-upload">
          Choose Files
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
        {fileCount > 0 && (
          <span style={{ marginLeft: '10px' }}>{fileCount} files selected</span>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
          {images.map((image, index) => (
            <DraggableImage
              key={image.id}
              image={image}
              index={index}
              moveImage={moveImage}
              handleDelete={handleDelete}
            />
          ))}
        </div>
        <button
          onClick={handlePDFDownload}
          style={{ marginTop: '20px', position: 'relative' }}
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
                style={{ marginRight: '10px' }}
              />
              Generating PDF...
            </>
          ) : (
            'Download PDF'
          )}
        </button>
      </div>
    </DndProvider>
  );
};

export default ImageToPDF;
