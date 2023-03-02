import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import EditIcon from "@mui/icons-material/Edit";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SaveIcon from "@mui/icons-material/Save";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Achievement() {
  const [achivementData, setAchivementData] = useState([]);
  const [inputVal, setInputVal] = useState({
    achivment: "",
  });
  const [editData, setEditData] = useState({
    achivment: "",
    isEditMode: false,
    id: 0,
  });

  useEffect(() => {
    getAchivementData();
    postAchievementData();
  }, []);

  //===============||  GET DATA  ||=========================//

  const getAchivementData = async (e) => {
    await axios.get("http://localhost:3005/achivement").then((res) => {
      var response = res.data;
      var updatedResult = [];
      for (var ind = 0; ind < response.length; ind++) {
        updatedResult.push({
          achivment: response[ind].achivment,
          id: response[ind].id,
          isEditMode: false,
        });
      }
      setAchivementData(updatedResult);
    });
  };

  //=================||  POST DATA  ||=========================//

  let { achivment } = inputVal;

  const changeInputVal = (e) => {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };

  const postAchievementData = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3005/achivement", inputVal)
      .then((res) => {
        setInputVal({ achivment: "" });
        getAchivementData();
      });
  };

  //=================||  EDIT DATA  ||=========================//

  const changeEditVal = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const updateAchievementData = () => {
    axios
      .put(`http://localhost:3005/achivement/${editData.id}`, editData)
      .then((res) => {
        setEditData({ achivment: "", id: 0 });
        getAchivementData();
      });
  };

  const onEditClick = (id) => {
    const localAchieveData = [...achivementData];
    for (var ind = 0; ind < localAchieveData.length; ind++) {
      if (id === localAchieveData[ind].id) {
        localAchieveData[ind].isEditMode = true;
        setEditData({
          achivment: localAchieveData[ind].achivment,
          id: localAchieveData[ind].id,
        });
      }
    }
    setAchivementData(localAchieveData);
  };

  const onDeleteClick = (id) => {
    axios.delete(`http://localhost:3005/achivement/${id}`).then(() => {
      getAchivementData();
    });
  };

  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <EmojiEventsIcon />
            &nbsp;Achievement
          </Accordion.Header>
          <Accordion.Body>
            <Form
              autoComplete="off"
              onSubmit={(e) => {
                postAchievementData(e);
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="d-flex flex-row">Achivment</Form.Label>
                <Form.Control
                  as="textarea"
                  name="achivment"
                  value={achivment}
                  onChange={(e) => {
                    changeInputVal(e);
                  }}
                  placeholder="Enter Achievements"
                  required
                  style={{ height: "100px", resize: "none" }}
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
              {achivementData.map((item, key) => {
                return item.id === editData.id ? (
                  <tr>
                    <td>
                      <TextField
                        variant="standard"
                        type="text"
                        name="achivment"
                        onChange={(e) => {
                          changeEditVal(e);
                        }}
                        value={editData.achivment}
                        style={{ width: "80vh" }}
                      />
                    </td>
                    <td>
                      <SaveIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => updateAchievementData()}
                      />
                    </td>
                  </tr>
                ) : (
                  <tr key={key}>
                    <td>{item.id}</td>
                    <td>{item.achivment}</td>

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
