import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PersonalData() {
  const [perDetData, setPerDetData] = useState([]);
  const [inputVal, setInputVal] = useState({
    firstName: "",
    lastName:"",
    mobileNo: "",
    email: "",
    address: "",
    gender: "",
  });
  const [editData, setEditData] = useState({
    firstName: "",
    lastName:"",
    mobileNo: "",
    email: "",
    address: "",
    isEditMode: false,
    id: 0,
  });

  useEffect(() => {
    getPersonalData();
    postPersonalData();
  }, []);

  //=================||  GET DATA  ||=========================//

  const getPersonalData = async (e) => {
    await axios.get("http://localhost:3005/personalDetails").then((res) => {
      var response = res.data;
      var updatedResult = [];
      for (var ind = 0; ind < response.length; ind++) {
        updatedResult.push({
          firstName: response[ind].firstName,
          lastName: response[ind].lastName,
          mobileNo: response[ind].mobileNo,
          email: response[ind].email,
          address: response[ind].address,
          id: response[ind].id,
          isEditMode: false,
        });
      }
      setPerDetData(updatedResult);
    });
  };

  //=================||  POST DATA  ||=========================//

  let { firstName,lastName, mobileNo, email, address } = inputVal;

  const changeInputVal = (e) => {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };

  const postPersonalData = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3005/personalDetails", inputVal)
      .then(() => {
        setInputVal({
          firstName: "",
          lastName:"",
          mobileNo: "",
          email: "",
          address: "",
          gender: "",
        });
        getPersonalData();
      });
  };

  //=================||  EDIT DATA  ||=========================//

  const changeEditVal = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const updatePersonalData = () => {
    axios
      .put(`http://localhost:3005/personalDetails/${editData.id}`, editData)
      .then((res) => {
        setEditData({ firstName: "",lastName:"", mobileNo: "", email: "", address: "", id: 0 });
        getPersonalData();
      });
  };

  const onEditClick = (id) => {
    const localPersonalData = [...perDetData];
    for (var ind = 0; ind < localPersonalData.length; ind++) {
      if (id === localPersonalData[ind].id) {
        localPersonalData[ind].isEditMode = true;
        setEditData({
          firstName: localPersonalData[ind].firstName,
          lastName: localPersonalData[ind].lastName,
          mobileNo: localPersonalData[ind].mobileNo,
          email: localPersonalData[ind].email,
          address: localPersonalData[ind].address,
          id: localPersonalData[ind].id,
        });
      }
    }
    setPerDetData(localPersonalData);
  };

  //=================||  DELETE DATA  ||=========================//

  const onDeleteClick = (id) => {
    axios.delete(`http://localhost:3005/personalDetails/${id}`).then(() => {
      getPersonalData();
    });
  };

  return (
    <>
      <>
        <Accordion>
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <PersonIcon />
              &nbsp;Personal Details
            </Accordion.Header>
            <Accordion.Body>
              <Form autoComplete="off" onSubmit={postPersonalData}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formBasicEmail">
                    <Form.Label className="d-flex flex-row">First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => {
                        changeInputVal(e);
                      }}
                      placeholder="Enter FirstName"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formBasicEmail">
                    <Form.Label className="d-flex flex-row">
                      Last Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={(e) => {
                        changeInputVal(e);
                      }}
                      placeholder="Enter LastName"
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formBasicEmail">
                    <Form.Label className="d-flex flex-row">Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        changeInputVal(e);
                      }}
                      placeholder="Enter Email"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formBasicEmail">
                    <Form.Label className="d-flex flex-row">
                      Mobile Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="mobileNo"
                      value={mobileNo}
                      onChange={(e) => {
                        changeInputVal(e);
                      }}
                      placeholder="Enter Mobile Number"
                    />
                  </Form.Group>
                </Row>

                <Form.Group
                  className="mb-3"
                  controlId="formBasicEmail"
                ></Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label className="d-flex flex-row">Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="address"
                    value={address}
                    onChange={(e) => {
                      changeInputVal(e);
                    }}
                    required
                    placeholder="Enter Address"
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
      </>
      {
        <>
          <Table>
            <thead></thead>
            <tbody>
              {perDetData.map((item, key) => {
                return item.id === editData.id ? (
                  <>
                    <tr>
                      <td style={{ padding: "10px" }}>
                        <TextField
                          variant="standard"
                          type="text"
                          name="firstName"
                          onChange={(e) => {
                            changeEditVal(e);
                          }}
                          value={editData.firstName}
                          style={{ width: "35vh" }}
                        />
                      </td>
                      <td style={{ padding: "10px" }}>
                        <TextField
                          variant="standard"
                          type="text"
                          name="lastName"
                          onChange={(e) => {
                            changeEditVal(e);
                          }}
                          value={editData.lastName}
                          style={{ width: "35vh" }}
                        />
                      </td>
                      <td>
                        <TextField
                          variant="standard"
                          type="text"
                          name="mobileNo"
                          onChange={(e) => {
                            changeEditVal(e);
                          }}
                          value={editData.mobileNo}
                          style={{ width: "35vh" }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <TextField
                          variant="standard"
                          type="email"
                          name="email"
                          onChange={(e) => {
                            changeEditVal(e);
                          }}
                          value={editData.email}
                          style={{ width: "35vh" }}
                        />
                      </td>
                      <td>
                        <TextField
                          variant="standard"
                          type="text"
                          name="address"
                          onChange={(e) => {
                            changeEditVal(e);
                          }}
                          value={editData.address}
                          style={{ width: "35vh" }}
                        />
                      </td>
                      <td>
                        <SaveIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => updatePersonalData()}
                        />
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr key={key}>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.mobileNo}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
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
