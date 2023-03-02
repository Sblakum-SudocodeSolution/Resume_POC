import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import Form from "react-bootstrap/Form";
import axios from "axios";
import TitleIcon from "@mui/icons-material/Title";
import Button from "react-bootstrap/Button";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Title() {
  const [titleData, setTitleData] = useState([]);
  const [inputVal, setInputVal] = useState({
    title: "",
    description: "",
  });
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    isEditMode: false,
    id: 0,
  });

  useEffect(() => {
    getTitleData();
    postTitleData();
  }, []);

  //===============||  GET DATA  ||=========================//

  const getTitleData = async (e) => {
    await axios.get("http://localhost:3005/title").then((res) => {
      var response = res.data;
      var updatedResult = [];
      for (var ind = 0; ind < response.length; ind++) {
        updatedResult.push({
          title: response[ind].title,
          description: response[ind].description,
          id: response[ind].id,
          isEditMode: false,
        });
      }
      setTitleData(updatedResult);
    });
  };

  //=================||  POST DATA  ||=========================//

  const { title, description } = inputVal;

  const changeInputVal = (e) => {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };

  const postTitleData = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3005/title", inputVal).then((res) => {
      setInputVal({ title: "", description: "" });
      getTitleData();
    });
  };

  //=================||  EDIT DATA  ||=========================//

  const changeEditVal = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const updateTitleData = () => {
    axios
      .put(`http://localhost:3005/title/${editData.id}`, editData)
      .then((res) => {
        setEditData({ title: "", description: "", id: 0 });
        getTitleData();
      });
  };

  const onEditClick = (id) => {
    const localTitleData = [...titleData];
    for (var ind = 0; ind < localTitleData.length; ind++) {
      if (id === localTitleData[ind].id) {
        localTitleData[ind].isEditMode = true;
        setEditData({
          title: localTitleData[ind].title,
          description: localTitleData[ind].description,
          id: localTitleData[ind].id,
        });
      }
    }
    setTitleData(localTitleData);
  };

  //=================||  DELETE DATA  ||=========================//

  const onDeleteClick = (id) => {
    axios.delete(`http://localhost:3005/title/${id}`).then(() => {
      getTitleData();
    });
  };

  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <TitleIcon />
            &nbsp;Title & Description
          </Accordion.Header>
          <Accordion.Body>
            <Form
              onSubmit={(e) => {
                postTitleData(e);
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="d-flex flex-row">Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => {
                    changeInputVal(e);
                  }}
                  placeholder="Enter Title"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="d-flex flex-row">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={description}
                  onChange={(e) => {
                    changeInputVal(e);
                  }}
                  placeholder="Enter Description"
                  required
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
              {titleData.map((item, key) => {
                return item.id === editData.id ? (
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
                      />
                    </td>
                    <td>
                      <TextField
                        variant="standard"
                        type="text"
                        name="description"
                        onChange={(e) => {
                          changeEditVal(e);
                        }}
                        value={editData.description}
                      />
                    </td>
                    <td>
                      <SaveIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => updateTitleData()}
                      />
                    </td>
                  </tr>
                ) : (
                  <tr key={key}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
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
