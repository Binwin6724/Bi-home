// src/components/ResumeUpload.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist';
import '../css/ResumeUpload.css';

// Set the workerSrc to the correct path of the locally copied pdf.worker.mjs file
pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.mjs`;

const ResumeUpload = ({ setExtractedData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const extractTextFromPDF = async (file) => {
    try {
      console.log("Extracting text from PDF...");
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";

      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n";
      }

      console.log("Text extraction complete.");
      return fullText;
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      return "";
    }
  };

  const parsePDFContent = (text) => {
    console.log("Parsing extracted text...");
    const parsedData = {
      personalInfo: {
        name: extractField(text, "Name:", "Contact:"),
        contact: extractField(text, "Contact:", "Email:"),
        email: extractField(text, "Email:", "Address:"),
        address: extractField(text, "Address:", "Summary:"),
        summary: extractField(text, "Summary:", "Education:"),
      },
      education: extractEducation(text),
      experience: extractExperience(text),
      skills: extractField(text, "Skills:", "Custom Sections:").split(",").map(skill => skill.trim()),
      customSections: extractCustomSections(text),
    };
    console.log("Parsing complete:", parsedData);
    return parsedData;
  };

  const extractField = (text, start, end) => {
    const startIndex = text.indexOf(start);
    if (startIndex === -1) return ""; // Handle missing field

    const endIndex = text.indexOf(end, startIndex + start.length);
    if (endIndex === -1) return text.substring(startIndex + start.length).trim(); // Handle missing end delimiter

    return text.substring(startIndex + start.length, endIndex).trim();
  };

  const extractEducation = (text) => {
    const educationText = extractField(text, "Education:", "Experience:");
    const educationEntries = educationText.split("\n").filter(entry => entry.trim());

    return educationEntries.map(entry => {
      const [degreeInstitution, details] = entry.split(" at ");
      const [degree, institution] = degreeInstitution.split(" - ");
      const [dates, grade] = details.split("Grade:");
      const [startDate, endDate] = (dates || "").replace(/[()]/g, "").split(" - ");
      return {
        degree: degree ? degree.trim() : "",
        institution: institution ? institution.trim() : "",
        startDate: startDate ? startDate.trim() : "",
        endDate: endDate ? endDate.trim() : "",
        grade: grade ? grade.trim() : "",
      };
    });
  };

  const extractExperience = (text) => {
    const experienceText = extractField(text, "Experience:", "Skills:");
    const experienceEntries = experienceText.split("\n").filter(entry => entry.trim());

    return experienceEntries.map(entry => {
      const [jobCompany, details] = entry.split(" at ");
      const [jobTitle, company] = jobCompany.split(" - ");
      const [dates, description] = details.split("Description:");
      const [startDate, endDate] = (dates || "").replace(/[()]/g, "").split(" - ");
      return {
        jobTitle: jobTitle ? jobTitle.trim() : "",
        company: company ? company.trim() : "",
        startDate: startDate ? startDate.trim() : "",
        endDate: endDate ? endDate.trim() : "",
        description: description ? description.trim() : "",
      };
    });
  };

  const extractCustomSections = (text) => {
    const customSectionsText = extractField(text, "Custom Sections:", "");
    const customSectionEntries = customSectionsText.split("\n\n").filter(entry => entry.trim());

    return customSectionEntries.map(entry => {
      const [title, ...content] = entry.split("\n");
      return {
        title: title.trim(),
        content: content.map(item => item.trim()),
      };
    });
  };

  const handleUpload = async () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
      const text = await extractTextFromPDF(selectedFile);
      const parsedData = parsePDFContent(text);
      setExtractedData(parsedData);
      navigate("/cv-maker"); // Redirect to the CV Maker page
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <div className="resume-upload-container">
      <h2>Upload Your Resume</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {selectedFile && (
        <div>
          <p>Selected file: {selectedFile.name}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
