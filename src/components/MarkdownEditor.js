import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun } from 'docx';

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState('');

  const handleDownload = async (format) => {
    if (format === 'html') {
      const blob = new Blob([document.getElementById('preview').innerHTML], { type: 'text/html' });
      saveAs(blob, 'markdown.html');
    } else if (format === 'pdf') {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const previewElement = document.getElementById('preview');
  
      // Ensure the preview element is properly rendered in the canvas
      await html2canvas(previewElement, {
        scale: 2, // Increase the scale for better quality
        useCORS: true, // Handle cross-origin images
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 size width in mm
        const pageHeight = 295; // A4 size height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
  
        let position = 0;
  
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
  
        pdf.save('markdown.pdf');
      });
    } else if (format === 'doc') {
      const content = markdown.split('\n').map((line) => parseMarkdownLineToDocx(line));
  
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: content,
          },
        ],
      });
  
      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, 'markdown.docx');
      });
    }
  };
  const parseMarkdownLineToDocx = (line) => {
    const elements = [];

    // Regex to match bold, italic, and plain text
    const regex = /(\*\*|__)(.*?)\1|(\*|_)(.*?)\3|(`)(.*?)\5|(.+?)(?=\*\*|__|\*|_|`|$)/g;
    let match;

    while ((match = regex.exec(line)) !== null) {
      if (match[2]) {
        // Bold text
        elements.push(
          new TextRun({
            text: match[2],
            bold: true,
          })
        );
      } else if (match[4]) {
        // Italic text
        elements.push(
          new TextRun({
            text: match[4],
            italics: true,
          })
        );
      } else if (match[6]) {
        // Code text
        elements.push(
          new TextRun({
            text: match[6],
            font: 'Courier New',
          })
        );
      } else if (match[7]) {
        // Plain text
        elements.push(new TextRun(match[7]));
      }
    }

    return new Paragraph({
      children: elements,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <textarea
        style={{ width: '50%', height: '100vh', padding: '10px' }}
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Write your markdown here..."
      />
      <div
        id="preview"
        style={{
          width: '50%',
          height: '100vh',
          padding: '10px',
          borderLeft: '1px solid #ccc',
          overflowY: 'auto',
        }}
      >
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <button onClick={() => handleDownload('html')}>Download as HTML</button>
        <button onClick={() => handleDownload('pdf')}>Download as PDF</button>
        <button onClick={() => handleDownload('doc')}>Download as DOC</button>
      </div>
    </div>
  );
};

export default MarkdownEditor;
