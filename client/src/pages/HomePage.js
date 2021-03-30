import React, { Component, useState} from "react";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import "../styles/HomePage.css";
import NavBar from "../components/NavBar";
import { AuthConsumer } from "../context/AuthContext"
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'


function MyModal(props) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(props.value);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  return (
    <>
      <Button className = "third-col" variant="primary" onClick={handleShow}>
      {props.title}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Form onSubmit= {(e)=>{
          e.preventDefault();
          props.change(value)
          }}> 
          
          <Modal.Body>
            <Form.Control onChange = {(e)=>{setValue(e.target.value)}} value = {value} type="text"/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose} type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }
  

  render() {
    return (
      <AuthConsumer>
      {
        ({user, id, changePhone, changeEmail, changeName }) =>{
            return(                  
            <React.Fragment>

              <div className='content'>
                  <div className = 'info'>     
                    <NavBar/> 
                    <h1 className = "Title">
                      {"Profile"}
                    </h1>
                    <Card text = "light" bg= "dark" className = "profile-card">
                      <Card.Body>
                        <Card.Title >Personal Info</Card.Title>
                        <ListGroup >
                          <ListGroup.Item variant= "dark" id= "info-list">
                            <div className = "first-col">NAME</div>
                            <div className = "second-col">{user.Name}</div>
                            <MyModal title = "Change Name" value = {user.Name} change = {changeName}/>
                          </ListGroup.Item>

                          <ListGroup.Item variant= "dark" id= "info-list">
                            <div className = "first-col">PHONE</div>
                            <div className = "second-col">{user.Phone}</div>
                            <MyModal title = "Change Phone Number" value = {user.Phone} change = {changePhone}/>
                          </ListGroup.Item>
                          <ListGroup.Item variant= "dark" id= "info-list">
                            <div className = "first-col">EMAIL</div>
                            <div className = "second-col">{user.Email}</div>
                            <MyModal title = "Change Email Number" value = {user.Email} change = {changeEmail}/>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                    
                  </div>
              </div>
            </React.Fragment>)
        }
      }
    </AuthConsumer>
        );
  }
}

export default LoginPage;