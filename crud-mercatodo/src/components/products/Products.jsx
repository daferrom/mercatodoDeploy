import React, {Component} from "react";
import axios from 'axios';
import Global from '../../'
import "./products.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";
import Footer from "../footer/Footer";

/* const data = [
    {
        "id": 1,
        "pro_name": "JABON DETERGENTE LIQUIDO",
        "pro_provider": "COCO VARELA",
        "pro_existences": 16,
        "pro_date": "2017-10-25",
        "pro_description": "2 X 3 LITROS PARA PRENDAS DELICADAS Detergente desarrollado para el lavado de prendas delicadas",
        "pro_category": "Elementos de Aseo"
      },
      {
        "id": 2,
        "pro_name": "Detergente polvo jabón rey",
        "pro_provider": "Dersa",
        "pro_existences": 5,
        "pro_date": "2019-03-15",
        "pro_description": "Disfruta del mejor aroma del Detergente Dersa polvo bicarbonato + jabon rey x 6000g",
        "pro_category": "Elementos de Aseo"
      },
      {
        "id": 3,
        "pro_name": "Jabon liquido vainilla coco",
        "pro_provider": "Bacterion",
        "pro_existences": 15,
        "pro_date": "2019-10-20",
        "pro_description": "Lleva tu Jabon liquido Bacterion vainilla coco x1000 ml y protegete de las bacterias durante el dia",
        "pro_category": "Elementos de Aseo"
      }
]; */


class Products extends Component {
   state = {
        data: [],
        status: false,
        modalActualizar: false,
        modalInsertar: false,
        form: {
            id: "",
            pro_name: "",
            pro_provider: "",
            pro_existences: "",
            pro_date: "",
            pro_description: "",
            pro_category: "",
        },
    };
    

    getProducts = () => {
        var url = 'https://apimercatodo.herokuapp.com/api/products/';
        var request ='/products';
        axios.get(url + request).then(res => {
            this.setState({
                data: res.data
                , status: true
            });
        });
    }

     componentDidMount =() => {
        this.getProducts();
    }

    mostrarModalActualizar = (dato) => {
        this.setState({
            form: dato,
            modalActualizar: true,
        });
    };

    cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
    };

    mostrarModalInsertar = () => {
        this.setState({
            modalInsertar: true,
        });
    };

    cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    };

    editar = (dato) => {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
            if (dato.id == registro.id) {
                arreglo[contador].pro_name = dato.pro_name;
                arreglo[contador].pro_provider = dato.pro_provider;
                arreglo[contador].pro_existences = dato.pro_existences;
                arreglo[contador].pro_date = dato.pro_date;
                arreglo[contador].pro_description = dato.pro_description;
                arreglo[contador].pro_category = dato.pro_category;
            }
            contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
    };

    eliminar = (dato) => {
        var opcion = window.confirm(
            "Estás Seguro que deseas Eliminar el elemento " + dato.id
        );
        if (opcion == true) {
            var contador = 0;
            var arreglo = this.state.data;
            arreglo.map((registro) => {
                if (dato.id == registro.id) {
                    arreglo.splice(contador, 1);
                }
                contador++;
            });
            this.setState({ data: arreglo, modalActualizar: false });
        }
    };

    insertar = () => {
        var valorNuevo = { ...this.state.form };
        valorNuevo.id = this.state.data.length + 1;
        var lista = this.state.data;
        lista.push(valorNuevo);
        this.setState({ modalInsertar: false, data: lista });
    };

    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    render() {
        return (
            <>
                <header>
                    <h1>Mercatodo</h1>
                </header>
                <div className="all">
                    <Container>
                        <div className="buscador">
                            <br />
                            <p>Bienvenido Beto encuentra lo que necesitas</p>
                            <Button
                                color="success"
                                onClick={() => this.mostrarModalInsertar()}
                            >
                                +Agregar producto
                            </Button>
                            <input className="Search" type="search"></input>
                        </div>

                        <br />
                        <Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Producto</th>
                                    <th>Provedor</th>
                                    <th>Cantidad</th>
                                    <th>Fecha</th>
                                    <th>Descripcion</th>
                                    <th>Catergoria</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.data.map((dato) => (
                                    <tr key={dato.id}>
                                        <td>{dato.id}</td>
                                        <td>{dato.pro_name}</td>
                                        <td>{dato.pro_provider}</td>
                                        <td>{dato.pro_existences}</td>
                                        <td>{dato.pro_date}</td>
                                        <td>{dato.pro_description}</td>
                                        <td>{dato.pro_category}</td>
                                        <td>
                                            <Button
                                                color="primary"
                                                onClick={() =>
                                                    this.mostrarModalActualizar(
                                                        dato
                                                    )
                                                }
                                            >
                                                Editar
                                            </Button>{" "}
                                        </td>
                                        <td>
                                            <Button
                                                color="danger"
                                                onClick={() =>
                                                    this.eliminar(dato)
                                                }
                                            >
                                                Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>

                    <Modal isOpen={this.state.modalActualizar}>
                        <ModalHeader>
                            <div>
                                <h3>Editar Registro</h3>
                            </div>
                        </ModalHeader>

                        <ModalBody>
                            <FormGroup>
                                <label>Id:</label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={this.state.form.id}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label>Producto:</label>
                                <input
                                    className="form-control"
                                    name="producto"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.form.Producto}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label>Provedor:</label>
                                <input
                                    className="form-control"
                                    name="Provedor"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.form.Provedor}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Categotia:</label>
                                <input
                                    className="form-control"
                                    name="Categoria"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.form.Categoria}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Producto:</label>
                                <input
                                    className="form-control"
                                    name="Producto"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.form.Categoria}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Provedor:</label>
                                <input
                                    className="form-control"
                                    name="Provedor"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.form.Categoria}
                                />
                            </FormGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                color="primary"
                                onClick={() => this.editar(this.state.form)}
                            >
                                Editar
                            </Button>
                            <Button
                                color="danger"
                                onClick={() => this.cerrarModalActualizar()}
                            >
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.modalInsertar}>
                        <ModalHeader>
                            <div color="primary">
                                <h3>Insertar Producto</h3>
                            </div>
                        </ModalHeader>

                        <ModalBody>
                            <FormGroup>
                                <label>Id:</label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={this.state.data.length + 1}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label>Producto:</label>
                                <input
                                    className="form-control"
                                    name="Producto"
                                    type="text"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label>Provedor:</label>
                                <input
                                    className="form-control"
                                    name="Provedor"
                                    type="text"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Cantidad:</label>
                                <input
                                    className="form-control"
                                    name="Cantidad"
                                    type="text"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Fecha:</label>
                                <input
                                    className="form-control"
                                    name="Fecha"
                                    type="text"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Descripcion:</label>
                                <input
                                    className="form-control"
                                    name="Fecha"
                                    type="text"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Categoria:</label>
                                <input
                                    className="form-control"
                                    name="Fecha"
                                    type="text"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                color="primary"
                                onClick={() => this.insertar()}
                            >
                                Insertar
                            </Button>
                            <Button
                                className="btn btn-danger"
                                onClick={() => this.cerrarModalInsertar()}
                            >
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>  
            </>
        );
    }
}
export default Products;