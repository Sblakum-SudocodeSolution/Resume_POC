import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import SchoolIcon from "@mui/icons-material/School";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Education() {
  const [educationData, setEducationData] = useState([]);
  const [inputVal, setInputVal] = useState({
    course: "",
    passingYear: "",
    percentage: "",
    grade: "",
    collage: "",
  });
  const [editData, setEditData] = useState({
    course: "",
    passingYear: "",
    percentage: "",
    grade: "",
    collage: "",
    isEditMode: false,
    id: 0,
  });

  useEffect(() => {
    getEducationData();
    postEducationData();
  }, []);

  //===============||  GET DATA  ||=========================//

  const getEducationData = async (e) => {
    await axios.get("http://localhost:3005/education").then((res) => {
      var response = res.data;
      var updatedResult = [];
      for (var ind = 0; ind < response.length; ind++) {
        updatedResult.push({
          course: response[ind].course,
          passingYear: response[ind].passingYear,
          percentage: response[ind].percentage,
          grade: response[ind].grade,
          collage: response[ind].collage,
          id: response[ind].id,
          isEditMode: false,
        });
      }
      setEducationData(updatedResult);
    });
  };

  //=================||  POST DATA  ||=========================//

  let { course, passingYear, percentage, grade, collage } = inputVal;

  const changeInputVal = (e) => {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };

  const postEducationData = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3005/education", inputVal)
      .then((res) => {
        setInputVal({
          course: "",
          passingYear: "",
          percentage: "",
          grade: "",
          collage: "",
        });
        getEducationData();
      });
  };

  //=================||  EDIT DATA  ||=========================//

  const changeEditVal = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const updateEducationData = () => {
    axios
      .put(`http://localhost:3005/education/${editData.id}`, editData)
      .then((res) => {
        setEditData({
          course: "",
          passingYear: "",
          percentage: "",
          grade: "",
          collage: "",
          id: 0,
        });
        getEducationData();
      });
  };

  const onEditClick = (id) => {
    const localEducationData = [...educationData];
    for (var ind = 0; ind < localEducationData.length; ind++) {
      if (id === localEducationData[ind].id) {
        localEducationData[ind].isEditMode = true;
        setEditData({
          course: localEducationData[ind].course,
          passingYear: localEducationData[ind].passingYear,
          percentage: localEducationData[ind].percentage,
          grade: localEducationData[ind].grade,
          collage: localEducationData[ind].collage,
          id: localEducationData[ind].id,
        });
      }
    }
    setEducationData(localEducationData);
  };

  //=================||  DELETE DATA  ||=========================//

  const onDeleteClick = (id) => {
    axios.delete(`http://localhost:3005/education/${id}`).then(() => {
      getEducationData();
    });
  };

  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <SchoolIcon /> &nbsp;Education
          </Accordion.Header>
          <Accordion.Body>
            <Form
              autoComplete="off"
              onSubmit={(e) => {
                postEducationData(e);
              }}
            >
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label className="d-flex flex-row">Course</Form.Label>
                  <Form.Control
                    type="text"
                    name="course"
                    value={course}
                    onChange={(e) => {
                      changeInputVal(e);
                    }}
                    required
                    placeholder="Enter Course"
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label className="d-flex flex-row">
                    Passing Year
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="passingYear"
                    value={passingYear}
                    onChange={(e) => {
                      changeInputVal(e);
                    }}
                    required
                    placeholder="Enter Passing Year"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label className="d-flex flex-row">
                    Percentage
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="percentage"
                    value={percentage}
                    onChange={(e) => {
                      changeInputVal(e);
                    }}
                    required
                    placeholder="Enter Percentage"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip" className="mb-3">
                  <Form.Label className="d-flex flex-row">Grade</Form.Label>
                  <Form.Control
                    type="text"
                    name="grade"
                    value={grade}
                    onChange={(e) => {
                      changeInputVal(e);
                    }}
                    required
                    placeholder="Enter Grade"
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-4" controlId="formGridAddress1">
                <Form.Label className="d-flex flex-row">college</Form.Label>
                <Form.Control
                  type="text"
                  name="collage"
                  value={collage}
                  onChange={(e) => {
                    changeInputVal(e);
                  }}
                  required
                  placeholder="Enter College Name"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Save
              </Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {
        <>
          <Table>
            <thead></thead>
            <tbody>
              {educationData.map((item, key) => {
                return item.id === editData.id ? (
                  <>
                    <tr>
                      <td>
                        <TextField
                          variant="standard"
                          type="text"
                          name="course"
                          onChange={(e) => {
                            changeEditVal(e);
                          }}
                          value={editData.course}
                        />
                      </td>
                      <td>
                        <TextField
                          variant="standard"
                          type="text"
                          name="passingYear"
                          onChange={(e) => {
                            changeEditVal(e);
                          }}
                          value={editData.passingYear}
                        />
                      </td>
                      <td>
                        <TextField
                          variant="standard"
                          type="text"
                          name="percentage"
                          onChange={(e) => {
                            changeEditVal(e);
                          }}
                          value={editData.percentage}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <TextField
                          variant="standard"
                          type="text"
                          name="grade"
                          onChange={(e) => {
                            changeEditVal(e);
                          }}
                          value={editData.grade}
                        />
                      </td>
                      <td>
                        <TextField
                          variant="standard"
                          type="text"
                          name="collage"
                          onChange={(e) => {
                            changeEditVal(e);
                          }}
                          value={editData.collage}
                        />
                      </td>

                      <td>
                        <SaveIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => updateEducationData()}
                        />
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr key={key}>
                    <td>{item.id}</td>
                    <td>{item.course}</td>
                    <td>{item.passingYear}</td>
                    <td>{item.percentage}</td>
                    <td>{item.grade}</td>
                    <td>{item.collage}</td>
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
