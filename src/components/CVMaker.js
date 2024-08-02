// src/components/CVMaker.js
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import '../css/CVMaker.css';

const CVMaker = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    contact: '',
    address: '',
    summary: '',
  });

  const [education, setEducation] = useState([{ institution: '', degree: '', startDate: '', endDate: '' }]);
  const [experience, setExperience] = useState([{ jobTitle: '', company: '', startDate: '', endDate: '', description: '' }]);
  const [skills, setSkills] = useState('');
  const [customSections, setCustomSections] = useState([]);

  const handleInputChange = (e, index, type) => {
    const { name, value } = e.target;
    if (type === 'education') {
      const list = [...education];
      list[index][name] = value;
      setEducation(list);
    } else if (type === 'experience') {
      const list = [...experience];
      list[index][name] = value;
      setExperience(list);
    } else {
      const list = [...customSections];
      list[type].content[index] = value;
      setCustomSections(list);
    }
  };

  const handleAddClick = (type) => {
    if (type === 'education') {
      setEducation([...education, { institution: '', degree: '', startDate: '', endDate: '' }]);
    } else if (type === 'experience') {
      setExperience([...experience, { jobTitle: '', company: '', startDate: '', endDate: '', description: '' }]);
    }
  };

  const handleAddCustomSection = () => {
    setCustomSections([...customSections, { title: '', content: [''] }]);
  };

  const handleCustomSectionTitleChange = (index, e) => {
    const list = [...customSections];
    list[index].title = e.target.value;
    setCustomSections(list);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(personalInfo.name, 10, 10);
    doc.setFontSize(12);
    doc.text(`Contact: ${personalInfo.contact}`, 10, 20);
    doc.text(`Address: ${personalInfo.address}`, 10, 30);
    doc.text(`Summary: ${personalInfo.summary}`, 10, 40);

    // Education Section
    doc.setFontSize(16);
    doc.text('Education', 10, 50);
    education.forEach((edu, index) => {
      doc.setFontSize(12);
      doc.text(`${edu.degree} at ${edu.institution}`, 10, 60 + index * 10);
      doc.text(`(${edu.startDate} - ${edu.endDate})`, 10, 70 + index * 10);
    });

    // Experience Section
    doc.setFontSize(16);
    doc.text('Experience', 10, 80 + education.length * 10);
    experience.forEach((exp, index) => {
      doc.setFontSize(12);
      doc.text(`${exp.jobTitle} at ${exp.company}`, 10, 90 + education.length * 10 + index * 10);
      doc.text(`(${exp.startDate} - ${exp.endDate})`, 10, 100 + education.length * 10 + index * 10);
      doc.text(exp.description, 10, 110 + education.length * 10 + index * 10);
    });

    // Skills Section
    doc.setFontSize(16);
    doc.text('Skills', 10, 120 + (education.length + experience.length) * 10);
    doc.setFontSize(12);
    doc.text(skills, 10, 130 + (education.length + experience.length) * 10);

    // Custom Sections
    customSections.forEach((section, sIndex) => {
      doc.setFontSize(16);
      doc.text(section.title, 10, 140 + (education.length + experience.length) * 10 + sIndex * 20);
      section.content.forEach((item, cIndex) => {
        doc.setFontSize(12);
        doc.text(item, 10, 150 + (education.length + experience.length) * 10 + sIndex * 20 + cIndex * 10);
      });
    });

    doc.save('CV.pdf');
  };

  return (
    <div className="cv-maker-container">
      <h2>BI CV Maker</h2>
      <div className="section">
        <h3>Personal Information</h3>
        <label>Name:</label>
        <input type="text" value={personalInfo.name} onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })} />
        <label>Contact:</label>
        <input type="text" value={personalInfo.contact} onChange={(e) => setPersonalInfo({ ...personalInfo, contact: e.target.value })} />
        <label>Address:</label>
        <input type="text" value={personalInfo.address} onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })} />
        <label>Summary:</label>
        <textarea value={personalInfo.summary} onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })} />
      </div>

      <div className="section">
        <h3>Education</h3>
        {education.map((edu, index) => (
          <div key={index}>
            <label>Institution:</label>
            <input type="text" name="institution" value={edu.institution} onChange={(e) => handleInputChange(e, index, 'education')} />
            <label>Degree:</label>
            <input type="text" name="degree" value={edu.degree} onChange={(e) => handleInputChange(e, index, 'education')} />
            <label>Start Date:</label>
            <input type="date" name="startDate" value={edu.startDate} onChange={(e) => handleInputChange(e, index, 'education')} />
            <label>End Date:</label>
            <input type="date" name="endDate" value={edu.endDate} onChange={(e) => handleInputChange(e, index, 'education')} />
          </div>
        ))}
        <button onClick={() => handleAddClick('education')}>Add Education</button>
      </div>

      <div className="section">
        <h3>Work Experience</h3>
        {experience.map((exp, index) => (
          <div key={index}>
            <label>Job Title:</label>
            <input type="text" name="jobTitle" value={exp.jobTitle} onChange={(e) => handleInputChange(e, index, 'experience')} />
            <label>Company:</label>
            <input type="text" name="company" value={exp.company} onChange={(e) => handleInputChange(e, index, 'experience')} />
            <label>Start Date:</label>
            <input type="date" name="startDate" value={exp.startDate} onChange={(e) => handleInputChange(e, index, 'experience')} />
            <label>End Date:</label>
            <input type="date" name="endDate" value={exp.endDate} onChange={(e) => handleInputChange(e, index, 'experience')} />
            <label>Description:</label>
            <textarea name="description" value={exp.description} onChange={(e) => handleInputChange(e, index, 'experience')} />
          </div>
        ))}
        <button onClick={() => handleAddClick('experience')}>Add Experience</button>
      </div>

      <div className="section">
        <h3>Skills</h3>
        <textarea value={skills} onChange={(e) => setSkills(e.target.value)} />
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
            <button onClick={() => setCustomSections([...customSections.slice(0, sIndex + 1), ...customSections.slice(sIndex + 1).map((section) => ({ ...section, content: [...section.content, ''] }))])}>Add Content</button>
          </div>
        ))}
        <button onClick={handleAddCustomSection}>Add Custom Section</button>
      </div>

      <button className="download-button" onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default CVMaker;
