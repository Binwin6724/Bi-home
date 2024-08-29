// src/components/Home.js

import React from "react";
import { Accordion, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaRulerCombined,
  FaArrowsAltV,
  FaWallet,
  FaBriefcase,
  FaFilePdf,
  FaPalette,
  FaLock,
  FaFileAlt,
  FaList,
  FaCode,
  FaCoins,
} from "react-icons/fa";
import { BsFiletypeJson } from "react-icons/bs";
import { IoPeople } from "react-icons/io5";

const renderTooltip = (props) => (
  <Tooltip {...props}>Click to navigate</Tooltip>
);

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ marginBottom: "2rem", textAlign: "center" }}>
        Welcome to the BI Home
      </h1>
      <p style={{ marginBottom: "2rem", textAlign: "center" }}>
        Select a tool from the options below to get started with your tasks.
      </p>
      <Accordion style={{ width: "80vw" }}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <FaRulerCombined style={{ marginRight: "10px" }} /> Square Feet
            Converter
          </Accordion.Header>
          <Accordion.Body>
            <p>
              Convert square feet to other measurement units, making it easy to
              manage space dimensions for your projects.
            </p>
            <Link to="/converter">
              <OverlayTrigger placement="right" overlay={renderTooltip}>
                <Button variant="primary" style={{boxShadow: "none", outline: "none"}}>Go to Square Feet Converter</Button>
              </OverlayTrigger>
            </Link>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <FaArrowsAltV style={{ marginRight: "10px" }} /> Height Converter
          </Accordion.Header>
          <Accordion.Body>
            <p>
              Convert height measurements between different units, such as feet,
              meters, and inches, for accurate comparisons.
            </p>
            <Link to="/height-converter">
              <OverlayTrigger placement="right" overlay={renderTooltip}>
                <Button variant="primary" style={{boxShadow: "none", outline: "none"}}>Go to Height Converter</Button>
              </OverlayTrigger>
            </Link>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <FaWallet style={{ marginRight: "10px" }} /> Expense Tracker
          </Accordion.Header>
          <Accordion.Body>
            <p>
              Keep track of your daily expenses effortlessly. Analyze your
              spending habits and manage your finances better.
            </p>
            <Link to="/expense-tracker">
              <OverlayTrigger placement="right" overlay={renderTooltip}>
                <Button variant="primary" style={{boxShadow: "none", outline: "none"}}>Go to Expense Tracker</Button>
              </OverlayTrigger>
            </Link>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <FaBriefcase style={{ marginRight: "10px" }} /> Experience
            Calculator
          </Accordion.Header>
          <Accordion.Body>
            <p>
              Calculate your professional experience accurately, considering
              multiple jobs and different periods of employment.
            </p>
            <Link to="/experience-calculator">
              <OverlayTrigger placement="right" overlay={renderTooltip}>
                <Button variant="primary" style={{boxShadow: "none", outline: "none"}}>Go to Experience Calculator</Button>
              </OverlayTrigger>
            </Link>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>
            <FaFilePdf style={{ marginRight: "10px" }} /> Image to PDF
          </Accordion.Header>
          <Accordion.Body>
            <p>
              Easily convert your images to PDF files. This tool supports
              various image formats and helps you compile them into a single PDF
              document.
            </p>
            <Link to="/image-to-pdf">
              <OverlayTrigger placement="right" overlay={renderTooltip}>
                <Button variant="primary" style={{boxShadow: "none", outline: "none"}}>Go to Image to PDF</Button>
              </OverlayTrigger>
            </Link>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>
            <FaPalette style={{ marginRight: "10px" }} /> Asset Customizing
          </Accordion.Header>
          <Accordion.Body>
            <p>
              Customize your digital assets for different platforms. Optimize
              your images, videos, and other media for social media and other
              use cases.
            </p>
            <Link to="/asset-customizing">
              <OverlayTrigger placement="right" overlay={renderTooltip}>
                <Button variant="primary" style={{boxShadow: "none", outline: "none"}}>Go to Asset Customizing</Button>
              </OverlayTrigger>
            </Link>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
          <Accordion.Header>
            <FaLock style={{ marginRight: "10px" }} /> Encrypt & Decrypt
          </Accordion.Header>
          <Accordion.Body>
            <p>
              Securely encrypt and decrypt text using various algorithms. Keep
              your sensitive information safe and protected.
            </p>
            <Link to="/encrypt-decrypt">
              <OverlayTrigger placement="right" overlay={renderTooltip}>
                <Button variant="primary" style={{boxShadow: "none", outline: "none"}}>Go to Encrypt & Decrypt</Button>
              </OverlayTrigger>
            </Link>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="7">
          <Accordion.Header>
            <FaFileAlt style={{ marginRight: "10px" }} /> Text Summarizer
          </Accordion.Header>
          <Accordion.Body>
            <p>
              Summarize large blocks of text into concise summaries. Ideal for
              quickly understanding lengthy articles, papers, and reports.
            </p>
            <Link to="/text-summarizer">
              <OverlayTrigger placement="right" overlay={renderTooltip}>
                <Button variant="primary" style={{boxShadow: "none", outline: "none"}}>Go to Text Summarizer</Button>
              </OverlayTrigger>
            </Link>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="8">
          <Accordion.Header>
            <FaList style={{ marginRight: "10px" }} /> Todo List
          </Accordion.Header>
          <Accordion.Body>
            <p>
              Manage your tasks effectively with this To-Do List tool. Add,
              delete, and mark tasks as complete, and keep your productivity
              high.
            </p>
            <Link to="/todo-list">
              <OverlayTrigger placement="right" overlay={renderTooltip}>
                <Button variant="primary" style={{boxShadow: "none", outline: "none"}}>Go to Todo List</Button>
              </OverlayTrigger>
            </Link>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="9">
          <Accordion.Header>
            <BsFiletypeJson style={{ marginRight: "10px" }} /> JSON Validator &
            Prettifier
          </Accordion.Header>
          <Accordion.Body>
            <p>
              Validate and prettify your JSON data easily. You can enter the
              JSON data manually or upload a JSON file.
            </p>
            <Link to="/json-validator">
              <OverlayTrigger placement="right" overlay={renderTooltip}>
                <Button variant="primary" style={{boxShadow: "none", outline: "none"}}>Go to JSON Validator</Button>
              </OverlayTrigger>
            </Link>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="10">
          <Accordion.Header>
            <FaCode style={{ marginRight: "10px" }} /> Encoding & Decoding Tool
          </Accordion.Header>
          <Accordion.Body>
            <p>
              Encode and decode text using various algorithms like Base64, URL
              encoding, Hexadecimal, and ROT13. Choose the encoding type and
              action to get started.
            </p>
            <Link to="/encoding-decoding">
              <OverlayTrigger placement="right" overlay={renderTooltip}>
                <Button variant="primary" style={{boxShadow: "none", outline: "none"}}>
                  Go to Encoding & Decoding Tool
                </Button>
              </OverlayTrigger>
            </Link>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="11">
          <Accordion.Header>
            <IoPeople style={{ marginRight: "10px" }} /> BMI Calculator
          </Accordion.Header>
          <Accordion.Body>
            <p>
              A simple tool that calculates Body Mass Index based on height and
              weight.
            </p>
            <Link to="/bmi-calculator">
              <OverlayTrigger placement="right" overlay={renderTooltip}>
                <Button variant="primary" style={{boxShadow: "none", outline: "none"}}>Go to BMI Calculator</Button>
              </OverlayTrigger>
            </Link>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="12">
          <Accordion.Header>
            <FaCoins style={{ marginRight: "10px" }} /> Coin Flip
          </Accordion.Header>
          <Accordion.Body>
            <p>
              Flip a coin to make decisions, with a realistic flipping
              animation.
            </p>
            <Link to="/coin-flip">
              <OverlayTrigger placement="right" overlay={renderTooltip}>
                <Button variant="primary" style={{boxShadow: "none", outline: "none"}}>Go to Coin Flip</Button>
              </OverlayTrigger>
            </Link>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Home;
