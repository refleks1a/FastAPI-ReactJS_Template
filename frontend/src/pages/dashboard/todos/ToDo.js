import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RouterPath } from "../../../assets/dictionary/RouterPath";
import BootstrapTable from 'react-bootstrap-table-next';
import DataService from "./ToDoService";
import { useState, useEffect } from "react";
import AddToDo from "./add_todo/AddToDo"

export default function ToDo() {

  const [refresh, setRefresh] = useState(0);

  const [ItemsTodos, setItemsTodos] = useState([]);
  const [ItemsPagination, setItemsPagination] = useState([]);

  const [pg, setPg] = useState();
  const [perPage, setPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const handleMakeDone = (id, e) => {

    e.preventDefault();

    const data = { id: id,   
      todo_in: {
      is_done: true
    }
    }
 
    DataService.makeDoneToDo(data)
    .then(() => {
      setRefresh(Date.now())
    })
    .catch((error) => {
       //error
    });
  };

  const handleDelete = (id, e) => {

    e.preventDefault();
 
    DataService.deleteToDo(id)
    .then(() => {
      setRefresh(Date.now())
    })
    .catch((error) => {
       //error
    });
  };

  function FormatterLinkDeleteToDo(
    cell,
    row,
    rowIndex,
    formatExtraData
  ) {
    return (
      <span>
        <Button variant="link" size="sm" 
        onClick={(e) => handleMakeDone(formatExtraData[rowIndex].id, e)}
        >Done</Button>
        <Button variant="link" size="sm" 
        onClick={(e) => handleDelete(formatExtraData[rowIndex].id, e)}
        >Delete</Button>
      </span>
    );
  }

  const columns = [{
    dataField: 'id',
    text: '#'
  }, {
    dataField: 'title',
    text: 'Title'
  }, {
    dataField: '',
    text: 'Actions',
    formatter: FormatterLinkDeleteToDo,
    formatExtraData: ItemsTodos,
    align: 'right',
    headerAlign: 'right',
  }];

  useEffect(() => {
    DataService.getTodos(false, 1, 50)
    .then(
      response => {
      setItemsTodos(response.data.items)
    }
    )
    .catch((error) => {
      // console.log("error")
    });
     
  }, [refresh]);
  

  return (
    <>
      <Container>
        <Row className="justify-content-md-center pt-5 ">
          <Col xs={12}>
            <Card>
              <Card.Body>
                <Card.Title>
                <Container fluid className="p-0">
                  <Row>
                  <Col xs={6}>List to do</Col>
                  <Col xs={6} className="d-flex justify-content-end"><AddToDo/></Col>
                  </Row>
                  </Container></Card.Title>
                <BootstrapTable bordered={false} hover keyField='id' data={ ItemsTodos } columns={ columns } />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
