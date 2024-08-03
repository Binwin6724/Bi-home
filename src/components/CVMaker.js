import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import TagInput from "../helpers/TagInput";
import "../css/CVMaker.css";
import ImageCropper from "../helpers/ImageCropper";

const CVMaker = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    contact: "",
    address: "",
    email: "",
    summary: "",
    photo: null,
    photoURL: "",
  });
  const [education, setEducation] = useState([
    {
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      grade: "",
      gradeFormat: "CGPA",
    },
  ]);
  const [experience, setExperience] = useState([
    { jobTitle: "", company: "", startDate: "", endDate: "", description: "" },
  ]);
  const [skills, setSkills] = useState([]);
  const [customSections, setCustomSections] = useState([]);
  const [croppedPhoto, setCroppedPhoto] = useState(null);

  const handleInputChange = (e, index, type) => {
    const { name, value, type: inputType } = e.target;
    if (type === "education") {
      const list = [...education];
      list[index][name] = inputType === "checkbox" ? e.target.checked : value;
      setEducation(list);
    } else if (type === "experience") {
      const list = [...experience];
      list[index][name] = inputType === "checkbox" ? e.target.checked : value;
      setExperience(list);
    } else {
      const list = [...customSections];
      list[type].content[index] = value;
      setCustomSections(list);
    }
  };

  const handleAddClick = (type) => {
    if (type === "education") {
      setEducation([
        ...education,
        {
          institution: "",
          degree: "",
          startDate: "",
          endDate: "",
          grade: "",
          gradeFormat: "CGPA",
        },
      ]);
    } else if (type === "experience") {
      setExperience([
        ...experience,
        {
          jobTitle: "",
          company: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ]);
    }
  };

  const handleDeleteClick = (index, type) => {
    if (type === "education") {
      setEducation(education.filter((_, eduIndex) => eduIndex !== index));
    } else if (type === "experience") {
      setExperience(experience.filter((_, expIndex) => expIndex !== index));
    }
  };

  const handleAddCustomSection = () => {
    setCustomSections([...customSections, { title: "", content: [""] }]);
  };

  const handleCustomSectionTitleChange = (index, e) => {
    const list = [...customSections];
    list[index].title = e.target.value;
    setCustomSections(list);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPersonalInfo({ ...personalInfo, photo: file });
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
  
    // Start Y position for the content below the image
    let currentY = 80; // Adjust based on the expected height of the image
  
    if (croppedPhoto) {
      // Ensure `croppedPhoto` is a data URL. If it's a Blob, convert it first
      const reader = new FileReader();
      reader.onload = function(event) {
        const imgData = event.target.result;
        addImageToPDF(doc, imgData, currentY, pageHeight);
      };
      if (croppedPhoto instanceof Blob) {
        reader.readAsDataURL(croppedPhoto); // Convert Blob to Data URL
      } else {
        // Assume `croppedPhoto` is already a Data URL
        addImageToPDF(doc, croppedPhoto, currentY, pageHeight);
      }
    } else {
      // No image, start adding content immediately
      addPdfContent(doc, currentY, pageHeight);
    }
  };
  
  const addImageToPDF = (doc, imgData, currentY, pageHeight) => {
    const imageWidth = 50; // Set image width
    const imageHeight = 50; // Set image height
    const imageX = (doc.internal.pageSize.getWidth() - imageWidth) / 2; // Center the image horizontally
  
    doc.addImage(imgData, 'JPEG', imageX, 10, imageWidth, imageHeight); // Adjust Y position as needed
  
    // Continue with the rest of the PDF content
    addPdfContent(doc, currentY, pageHeight);
  };
  const addPdfContent = (doc, startY, pageHeight) => {
    let currentY = startY;

    const checkPageOverflow = (additionalHeight) => {
      if (currentY + additionalHeight >= pageHeight - 10) {
        doc.addPage();
        currentY = 10; // Reset Y position to start of the new page
      }
    };

    // Adding personal information
    doc.setFontSize(20);
    doc.text(personalInfo.name, 105, currentY, { align: "center" });
    currentY += 10;
    doc.setFontSize(12);
    doc.text(`Contact: ${personalInfo.contact}`, 10, currentY);
    currentY += 6;
    doc.text(`Email: ${personalInfo.email}`, 10, currentY);
    currentY += 6;
    doc.text(`Address: ${personalInfo.address}`, 10, currentY);
    currentY += 6;
    doc.text(`Summary:`, 10, currentY);
    currentY += 6;
    currentY = addMultiLineText(doc, personalInfo.summary, 10, currentY);
    currentY += 10; // Add spacing after the summary

    checkPageOverflow(10);

    // Education Section
    if (education.length > 0) {
      doc.setFontSize(16);
      doc.text("Education", 10, currentY);
      currentY += 10;

      education.forEach((edu) => {
        const eduText = `${edu.degree} at ${edu.institution}`;
        const eduDetails = `(${edu.startDate} - ${edu.endDate || "Present"})`;
        const gradeText = edu.grade
          ? `Grade: ${edu.grade} (${edu.gradeFormat})`
          : "";
        const descriptionHeight =
          doc.splitTextToSize(edu.description, 180).length * 6;

        // Calculate the total height needed for the education block
        const requiredHeight =
          6 + 6 + (gradeText ? 6 : 0) + descriptionHeight + 10;

        checkPageOverflow(requiredHeight); // Check before adding content

        doc.setFontSize(12);
        doc.text(eduText, 10, currentY);
        currentY += 6;
        doc.text(eduDetails, 10, currentY);
        currentY += 6;
        if (gradeText) {
          doc.text(gradeText, 10, currentY);
          currentY += 6;
        }
        currentY = addMultiLineText(doc, edu.description, 10, currentY);
        currentY += 10; // Add some space after each entry
      });
      currentY += 5;
    }

    checkPageOverflow(10);

    // Experience Section
    if (experience.length > 0) {
      doc.setFontSize(16);
      doc.text("Experience", 10, currentY);
      currentY += 10;

      experience.forEach((exp) => {
        const expText = `${exp.jobTitle} at ${exp.company}`;
        const expDetails = `(${exp.startDate} - ${exp.endDate || "Present"})`;
        const descriptionHeight =
          doc.splitTextToSize(exp.description, 180).length * 6;

        // Calculate the total height needed for the experience block
        const requiredHeight = 6 + 6 + descriptionHeight + 10;

        checkPageOverflow(requiredHeight); // Check before adding content

        doc.setFontSize(12);
        doc.text(expText, 10, currentY);
        currentY += 6;
        doc.text(expDetails, 10, currentY);
        currentY += 6;
        currentY = addMultiLineText(doc, exp.description, 10, currentY);
        currentY += 10; // Add some space after each entry
      });
      currentY += 5;
    }

    checkPageOverflow(10);

    // Skills Section
    if (skills.length > 0) {
      doc.setFontSize(16);
      doc.text("Skills", 10, currentY);
      currentY += 10;

      doc.setFontSize(12);
      currentY = addMultiLineText(doc, skills.join(", "), 10, currentY);

      checkPageOverflow(10);
    }
    checkPageOverflow(10);
    // Custom Sections
    if (customSections.length > 0) {
      customSections.forEach((section) => {
        const sectionTitleHeight = 10;
        const contentHeight = section.content.reduce(
          (acc, item) => acc + doc.splitTextToSize(item, 180).length * 6 + 5,
          0
        );
        const requiredHeight = sectionTitleHeight + contentHeight;

        checkPageOverflow(requiredHeight); // Check before adding content

        doc.setFontSize(16);
        doc.text(section.title, 10, currentY);
        currentY += 10;

        section.content.forEach((item) => {
          currentY = addMultiLineText(doc, item, 10, currentY);
          currentY += 5; // Add some space after each content
        });

        currentY += 5;
      });
    }
    checkPageOverflow(10);
    // Save the PDF at the end
    doc.save("CV.pdf");
  };

  const addMultiLineText = (doc, text, x, y) => {
    const textLines = doc.splitTextToSize(text, 180); // 180 is the width of the line
    doc.text(textLines, x, y);
    return y + textLines.length * 6; // 6 is the line height
  };

  return (
    <div className="cv-maker-container">
      <h2>CV Maker</h2>
      <div className="section">
        <h3>Personal Information</h3>
        <label>Name:</label>
        <input
          type="text"
          value={personalInfo.name}
          onChange={(e) =>
            setPersonalInfo({ ...personalInfo, name: e.target.value })
          }
        />
        <label>Contact:</label>
        <input
          type="text"
          value={personalInfo.contact}
          onChange={(e) =>
            setPersonalInfo({ ...personalInfo, contact: e.target.value })
          }
        />
        <label>Email:</label>
        <input
          type="email"
          value={personalInfo.email}
          onChange={(e) =>
            setPersonalInfo({ ...personalInfo, email: e.target.value })
          }
        />
        <label>Address:</label>
        <input
          type="text"
          value={personalInfo.address}
          onChange={(e) =>
            setPersonalInfo({ ...personalInfo, address: e.target.value })
          }
        />
        <label>Summary:</label>
        <textarea
          value={personalInfo.summary}
          onChange={(e) =>
            setPersonalInfo({ ...personalInfo, summary: e.target.value })
          }
        />

        <label>Upload Photo:</label>
        <input type="file" accept="image/*" onChange={handlePhotoUpload} />
        {personalInfo.photo && (
          <ImageCropper
            photo={personalInfo.photo}
            setCroppedPhoto={setCroppedPhoto}
          />
        )}
      </div>

      <div className="section">
        <h3>Education</h3>
        {education.map((edu, index) => (
          <div key={index}>
            <label>Institution:</label>
            <input
              type="text"
              name="institution"
              value={edu.institution}
              onChange={(e) => handleInputChange(e, index, "education")}
            />
            <label>Degree:</label>
            <input
              type="text"
              name="degree"
              value={edu.degree}
              onChange={(e) => handleInputChange(e, index, "education")}
            />
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={edu.startDate}
              onChange={(e) => handleInputChange(e, index, "education")}
            />
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={edu.isCurrent ? "Present" : edu.endDate}
              onChange={(e) => handleInputChange(e, index, "education")}
              disabled={edu.isCurrent}
            />
            <div className="checkbox-container">
              <label> Currently Studying</label>
              <input
                type="checkbox"
                name="isCurrent"
                checked={edu.isCurrent}
                onChange={(e) => handleInputChange(e, index, "education")}
              />
            </div>
            <label>Grade:</label>
            <input
              type="text"
              name="grade"
              value={edu.grade}
              onChange={(e) => handleInputChange(e, index, "education")}
            />
            <label>Grade Format:</label>
            <select
              name="gradeFormat"
              value={edu.gradeFormat}
              onChange={(e) => handleInputChange(e, index, "education")}
            >
              <option value="CGPA">CGPA</option>
              <option value="Percentage">Percentage</option>
              <option value="Other">Other</option>
            </select>
            <button onClick={() => handleDeleteClick(index, "education")}>
              Delete
            </button>
          </div>
        ))}
        <button onClick={() => handleAddClick("education")}>
          Add Education
        </button>
      </div>

      <div className="section">
        <h3>Work Experience</h3>
        {experience.map((exp, index) => (
          <div key={index}>
            <label>Job Title:</label>
            <input
              type="text"
              name="jobTitle"
              value={exp.jobTitle}
              onChange={(e) => handleInputChange(e, index, "experience")}
            />
            <label>Company:</label>
            <input
              type="text"
              name="company"
              value={exp.company}
              onChange={(e) => handleInputChange(e, index, "experience")}
            />
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={exp.startDate}
              onChange={(e) => handleInputChange(e, index, "experience")}
            />
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={exp.isCurrent ? "Present" : exp.endDate}
              onChange={(e) => handleInputChange(e, index, "experience")}
              disabled={exp.isCurrent}
            />
            <div className="checkbox-container">
              <label>Currently Working</label>
              <input
                type="checkbox"
                name="isCurrent"
                checked={exp.isCurrent}
                onChange={(e) => handleInputChange(e, index, "experience")}
              />
            </div>
            <label>Description:</label>
            <textarea
              name="description"
              value={exp.description}
              onChange={(e) => handleInputChange(e, index, "experience")}
            />
            <button onClick={() => handleDeleteClick(index, "experience")}>
              Delete
            </button>
          </div>
        ))}
        <button onClick={() => handleAddClick("experience")}>
          Add Experience
        </button>
      </div>

      <div className="section">
        <h3>Skills</h3>
        <TagInput tags={skills} setTags={setSkills} />
      </div>

      <div className="section">
        <h3>Custom Sections</h3>
        {customSections.map((section, sIndex) => (
          <div key={sIndex}>
            <label>Section Title:</label>
            <input
              type="text"
              value={section.title}
              onChange={(e) => handleCustomSectionTitleChange(sIndex, e)}
            />
            {section.content.map((item, cIndex) => (
              <div key={cIndex}>
                <label>Content:</label>
                <textarea
                  value={item}
                  onChange={(e) => handleInputChange(e, cIndex, sIndex)}
                />
              </div>
            ))}
            <button
              onClick={() =>
                setCustomSections([
                  ...customSections.slice(0, sIndex + 1),
                  ...customSections.slice(sIndex + 1).map((section) => ({
                    ...section,
                    content: [...section.content, ""],
                  })),
                ])
              }
            >
              Add Content
            </button>
          </div>
        ))}
        <button onClick={handleAddCustomSection}>Add Custom Section</button>
      </div>

      <button className="download-button" onClick={generatePDF}>
        Download PDF
      </button>
    </div>
  );
};

export default CVMaker;
