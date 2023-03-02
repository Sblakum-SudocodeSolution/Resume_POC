import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Experience() {
  const [experienceData, setExperienceData] = useState([]);
  const [editData, setEditData] = useState({
    title: "",
    experience: "",
    compony: "",
    project: "",
    isEditMode: false,
    id: 0,
  });

  const [inputVal, setInputVal] = useState({
    title: "",
    experience: "",
    compony: "",
    project: "",
  });

  useEffect(() => {
    getExperienceData();
    postExpData();
  }, []);

  //===============||  GET DATA  ||=========================//

  const getExperienceData = async (e) => {
    await axios.get("http://localhost:3005/experience").then((res) => {
      var response = res.data;
      var updatedResult = [];
      for (var ind = 0; ind < response.length; ind++) {
        updatedResult.push({
          title: response[ind].title,
          experience: response[ind].experience,
          compony: response[ind].compony,
          project: response[ind].project,
          id: response[ind].id,
          isEditMode: false,
        });
      }
      setExperienceData(updatedResult);
    });
  };

  //===============||  POST DATA  ||=========================//

  let { title, experience, compony, project } = inputVal;

  const changeInputVal = (e) => {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };

  const postExpData = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3005/experience", inputVal)
      .then((res) => {
        setInputVal({
          title: "",
          experience: "",
          compony: "",
          project: "",
        });
        getExperienceData();
      });
  };

  //===============||  EDIT DATA  ||=========================//

  const changeEditVal = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const updateExpData = () => {
    axios
      .put(`http://localhost:3005/experience/${editData.id}`, editData)
      .then((res) => {
        setEditData({
          title: "",
          experience: "",
          compony: "",
          project: "",
          id: 0,
        });
        getExperienceData();
      });
  };

  const onEditClick = (id) => {
    const localExperienceData = [...experienceData];
    for (var ind = 0; ind < localExperienceData.length; ind++) {
      if (id === localExperienceData[ind].id) {
        localExperienceData[ind].isEditMode = true;
        setEditData({
          title: localExperienceData[ind].title,
          experience: localExperienceData[ind].experience,
          compony: localExperienceData[ind].compony,
          project: localExperienceData[ind].project,
          id: localExperienceData[ind].id,
        });
      }
    }
    setExperienceData(localExperienceData);
  };

  //===============||  DELETE DATA  ||=========================//

  const onDeleteClick = (id) => {
    axios.delete(`http://localhost:3005/experience/${id}`).then(() => {
      getExperienceData();
    });
  };

  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <WorkspacesIcon />
            &nbsp;Experience
          </Accordion.Header>
          <Accordion.Body>
            <Form autoComplete="off" onSubmit={postExpData}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label className="d-flex flex-row">Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => {
                      changeInputVal(e);
                    }}
                    required
                    placeholder="Enter Job Title"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label className="d-flex flex-row">
                    Experience
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="experience"
                    value={experience}
                    onChange={(e) => {
                      changeInputVal(e);
                    }}
                    required
                    placeholder="Enter years of experience"
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="d-flex flex-row">Compony</Form.Label>
                <Form.Control
                  type="text"
                  name="compony"
                  value={compony}
                  onChange={(e) => {
                    changeInputVal(e);
                  }}
                  required
                  placeholder="Compony Name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="d-flex flex-row">Project</Form.Label>
                <Form.Control
                  as="textarea"
                  name="project"
                  value={project}
                  onChange={(e) => {
                    changeInputVal(e);
                  }}
                  required
                  placeholder="Add Project Description"
                  style={{ height: "100px", resize: "none" }}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>{" "}
      </Accordion>

      {
        <>
          <Table>
            <thead></thead>
            <tbody>
              {experienceData.map((item, key) => {
                return item.id === editData.id ? (
                  <>
                    <tr>
                      <td>
                        <TextField
                          variant="standard"
                          type="text"
                          name="title"
                          onChange={(e) => {
                            changeEditVal(e);
                          }}
                          value={editData.title}
                          style={{ width: "35vh" }}
                        />
                      </td>
                      <td>
                        <TextField
                          variant="standard"
                          type="text"
                          name="experience"
                          onChange={(e) => {
                            changeEditVal(e);
                          }}
                          value={editData.experience}
                          style={{ width: "35vh" }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <TextField
                          variant="standard"
                          type="text"
                          name="compony"
                          onChange={(e) => {
                            changeEditVal(e);
                          }}
                          value={editData.compony}
                          style={{ width: "35vh" }}
                        />
                      </td>
                      <td>
                        <TextField
                          variant="standard"
                          type="text"
                          name="project"
                          onChange={(e) => {
                            changeEditVal(e);
                          }}
                          value={editData.project}
                          style={{ width: "35vh" }}
                        />
                      </td>
                      <td>
                        <SaveIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => updateExpData()}
                        />
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr key={key}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.experience}</td>
                    <td>{item.compony}</td>
                    <td>{item.project}</td>
                    <td>
                      <EditIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => onEditClick(item.id)}
                      />
                    </td>
                    <td>
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => onDeleteClick(item.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      }
    </>
  );
}
