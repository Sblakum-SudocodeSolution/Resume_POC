import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ImageIcon from "@mui/icons-material/Image";
import axios from "axios";
import Alert from "@mui/material/Alert";
import ProfileImage from "react-bootstrap/Image";

export default function Image() {
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChange = (event) => {
    setSelectedFile({ selectedFile: event.target.files[0] });
  };

  const onFileUpload = () => {
    const formData = new FormData();

    formData.append("myFile", selectedFile, selectedFile.name);

    console.log(selectedFile);

    axios.post("http://localhost:3005/profilePhoto/", formData);
  };

  return (
    <Accordion>
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <ImageIcon /> &nbsp; Image
        </Accordion.Header>
        <Accordion.Body>
          <ProfileImage
            src="https://www.shutterstock.com/image-photo/surreal-image-african-elephant-wearing-260nw-1365289022.jpg"
            height="100vh"
            width="100vh"
            roundedCircle
          />
          <div>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>Upload!</button>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
