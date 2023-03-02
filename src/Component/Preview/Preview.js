import React, { useRef, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import SaveIcon from "@mui/icons-material/Save";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

export default function Preview(props) {
  const [titleData, setTitleData] = useState([]);
  const [achivementData, setAchivementData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [perDetData, setPerDetData] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getTitleData();
    getAchivementData();
    getEducationData();
    getExperienceData();
    getPerDetData();
  }, []);

  const getTitleData = async (e) => {
    let titleRes = await axios.get("http://localhost:3005/title");
    setTitleData(titleRes.data.slice(-1));
  };

  const getAchivementData = async (e) => {
    let achievementRes = await axios.get("http://localhost:3005/achivement");
    setAchivementData(achievementRes.data.slice(-1));
  };

  const getEducationData = async (e) => {
    let educationRes = await axios.get("http://localhost:3005/education");
    setEducationData(educationRes.data.slice(-1));
  };

  const getExperienceData = async (e) => {
    let experienceRes = await axios.get("http://localhost:3005/experience");
    setExperienceData(experienceRes.data.slice(-1));
  };

  const getPerDetData = async (e) => {
    let perDetRes = await axios.get("http://localhost:3005/personalDetails");
    setPerDetData(perDetRes.data.slice(-1));
  };

  const recentImageDataUrl = localStorage.getItem("profile_Image");

  const SaveAsPDF = async () => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data = await html2canvas(document.querySelector("#resumeData"));
    const img = data.toDataURL("image/png");
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("shipping_label.pdf");
    setAnchorEl(null);
  };

  const SaveAsWord = () => {
    var blob = new Blob([document.getElementById("resumeData").innerHTML], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8",
    });
    saveAs(blob, "note.docx");
    setAnchorEl(null);
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <div id="resumeData">
          <Modal.Body>
            <Card>
              <Card.Body>
                <Container>
                  <Row>
                    <Col>
                      <List component="nav" aria-label="mailbox folders">
                        <ListItem divider>
                          <Modal.Title id="contained-modal-title-vcenter">
                            <Grid container spacing={2}>
                              <Grid item>
                                <Avatar
                                  src={recentImageDataUrl}
                                  alt="image"
                                  sx={{ width: 60, height: 60 }}
                                />
                              </Grid>
                              <Grid item xs={12} md>
                                <Grid
                                  item
                                  xs
                                  container
                                  direction="column"
                                  spacing={2}
                                >
                                  <Grid item xs>
                                    <Typography
                                      gutterBottom
                                      variant="subtitle1"
                                      component="div"
                                    >
                                      {perDetData.map((item, i) => (
                                        <h4 key={i}>{item.firstName}</h4>
                                      ))}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {titleData.map((item, i) => (
                                        <h6 key={i}>{item.title}</h6>
                                      ))}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Modal.Title>
                        </ListItem>
                      </List>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <List component="nav" aria-label="mailbox folders">
                        <ListItem divider>
                          <Card.Title>
                            <EmojiEventsRoundedIcon /> Achivement
                          </Card.Title>
                        </ListItem>
                      </List>
                      <ListItemText>
                        {achivementData.map((item, i) => {
                          return <p key={i}>{item.achivment}</p>;
                        })}
                      </ListItemText>

                      <List component="nav" aria-label="mailbox folders">
                        <ListItem divider>
                          <Card.Title>
                            <ContactPageIcon /> Contact
                          </Card.Title>
                        </ListItem>
                      </List>
                      {perDetData.map((item, i) => {
                        return (
                          <>
                            <ListItemText>
                              <PersonOutlineIcon />
                              &nbsp;{item.firstName} {item.lastName}
                            </ListItemText>
                            <ListItemText>
                              <LocalPhoneOutlinedIcon />
                              &nbsp;{item.mobileNo}
                            </ListItemText>
                            <ListItemText>
                              <EmailOutlinedIcon />
                              &nbsp;{item.email}
                            </ListItemText>
                            <ListItemText>
                              <LocationOnOutlinedIcon />
                              &nbsp;{item.address}
                            </ListItemText>
                          </>
                        );
                      })}
                      <br />

                      <List component="nav" aria-label="mailbox folders">
                        <ListItem divider />
                      </List>
                      {titleData.map((item) => {
                        return (
                          <ListItemText>
                            <ArrowRightRoundedIcon /> {item.description}
                          </ListItemText>
                        );
                      })}
                    </Col>

                    <Col>
                      <List component="nav" aria-label="mailbox folders">
                        <ListItem divider>
                          <Card.Title>
                            <SchoolIcon /> Education
                          </Card.Title>
                        </ListItem>
                      </List>
                      <ListItemText>
                        {educationData.map((item) => {
                          return (
                            <>
                              <ListItemText>{item.passingYear}</ListItemText>
                              <ListItemText>
                                <b>{item.course}</b>
                              </ListItemText>
                              <ListItemText>{item.collage}</ListItemText>
                              <br />
                            </>
                          );
                        })}
                      </ListItemText>

                      <List component="nav" aria-label="mailbox folders">
                        <ListItem divider>
                          <Card.Title>
                            <WorkspacesIcon /> Experience
                          </Card.Title>
                        </ListItem>
                      </List>
                      <ListItemText>
                        {experienceData.map((item) => {
                          return (
                            <>
                              <ListItemText>
                                <b>{item.title} |</b> {item.experience}
                              </ListItemText>
                              <ListItemText>{item.compony}</ListItemText>
                              <ListItemText>
                                <b>Project</b> : {item.project}
                              </ListItemText>
                              <br />
                            </>
                          );
                        })}
                      </ListItemText>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </Modal.Body>
        </div>
        <Modal.Footer>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <SaveIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={SaveAsWord}>
              <TextSnippetIcon /> Word File
            </MenuItem>
            <MenuItem onClick={SaveAsPDF}>
              <PictureAsPdfIcon /> PDF
            </MenuItem>
          </Menu>
        </Modal.Footer>
      </Modal>
    </>
  );
}
