import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Preview from "../Preview/Preview";
import Button from "react-bootstrap/Button";
import Education from "../Form/Education";
import Title from "../Form/Title";
import Achievement from "../Form/Achievement";
import Experience from "../Form/Experience";
import PersonalData from "../Form/PersonalData";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import axios from "axios";

export default function Home() {
  const [previewModalShow, setPreviewModalShow] = useState(false);

  const [user, setUser] = useState([]);
  const [titleData, setTitleData] = useState([]);

  const getUserData = async () => {
    await axios
      .get("http://localhost:3005/personalDetails")
      .then((res) => setUser(res.data.slice(-1)));
  };

  const getTitleData = async () => {
    await axios
      .get("http://localhost:3005/title")
      .then((res) => setTitleData(res.data.slice(-1)));
  };

  useEffect(() => {
    getUserData();
    getTitleData();
  }, []);

  

  const [file, setFile] = useState();

  const handleChange = function loadFile(e) {
    if (e.target.files.length > 0) {
      const file = URL.createObjectURL(e.target.files[0]);
      setFile(file);

      const reader = new FileReader();

      reader.onload = () => {
        localStorage.setItem("profile_Image", reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const recentImageDataUrl = localStorage.getItem("profile_Image");

  return (
    <>
      <Container className="mb-4">
        <Row className="mt-5">
          <Col>
            <Grid container spacing={2}>
              <Grid item>
                <input
                  type="file"
                  onChange={handleChange}
                  id="upload"
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <label htmlFor="upload">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <Avatar
                      src={recentImageDataUrl}
                      alt="image"
                      sx={{ width: 60, height: 60 }}
                    />
                  </IconButton>
                </label>
              </Grid>
              <Grid item>
                <Typography>
                  {user.map((item, i) => (
                    <h4>{item.firstName}</h4>
                  ))}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {titleData.map((item, i) => (
                    <h6 key={i}>{item.title}</h6>
                  ))}
                </Typography>
              </Grid>
            </Grid>
          </Col>
          <Col className="text-end">
            <Button
              variant="outline-secondary"
              size="lg"
              onClick={() => setPreviewModalShow(true)}
            >
              <RemoveRedEyeIcon /> Preview
            </Button>
            <Preview
              show={previewModalShow}
              onHide={() => setPreviewModalShow(false)}
            />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <Row>
              <Col>
                <PersonalData />
              </Col>
            </Row>

            <Row>
              <Col>
                <Experience />
              </Col>
            </Row>

            <Row>
              <Col>
                <Achievement />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                <Education />
              </Col>
            </Row>

            <Row>
              <Col>
                <Title />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
