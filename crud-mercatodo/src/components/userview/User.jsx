import React from "react";
import "./user.css";
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

const data = [
    {
        id: 1,
        Producto: "sachichas",
        Provedor: "ranchera",
        Cantidad: "23",
        Fecha: "10/06/2021",
        Descripcion: "comida embutida ",
        Categoria: "embutido",
    },
    {
        id: 2,
        Producto: "chorizo",
        Provedor: "ranchera",
        Cantidad: "23",
        Fecha: "10/06/2021",
        Descripcion: "comida embutida ",
        Categoria: "embutido",
    },
    {
        id: 3,
        Producto: "hamburguesa",
        Provedor: "ranchera",
        Cantidad: "23",
        Fecha: "10/06/2021",
        Descripcion: "comida embutida ",
        Categoria: "embutido",
    },
    {
        id: 4,
        Producto: "mortadela",
        Provedor: "ranchera",
        Cantidad: "23",
        Fecha: "10/06/2021",
        Descripcion: "comida embutida ",
        Categoria: "embutido",
    },
    {
        id: 5,
        Producto: "jamon",
        Cantidad: "23",
        Provedor: "ranchera",
        Fecha: "10/06/2021",
        Descripcion: "comida embutida ",
        Categoria: "embutido",
    },
    {
        id: 6,
        Producto: "jamon",
        Provedor: "ranchera",
        Cantidad: "23",
        Fecha: "10/06/2021",
        Descripcion: "comida embutida ",
        Categoria: "embutido!",
    },
];

class User extends React.Component {
    state = {
        data: data,
        modalActualizar: false,
        modalInsertar: false,
        form: {
            id: "",
            Producto: "",
            Provedor: "",
            Fecha: "",
            Cantidad: "",
            Descripcion: "",
            Categoria: "",
        },
    };

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
                arreglo[contador].Producto = dato.Producto;
                arreglo[contador].Provedor = dato.Provedor;
                arreglo[contador].Cantidad = dato.Cantidad;
                arreglo[contador].Fecha = dato.Fecha;
                arreglo[contador].Descripcion = dato.Descripcion;
                arreglo[contador].Categoria = dato.Categoria;
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
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.data.map((dato) => (
                                    <tr key={dato.id}>
                                        <td>{dato.id}</td>
                                        <td>{dato.Producto}</td>
                                        <td>{dato.Provedor}</td>
                                        <td>{dato.Cantidad}</td>
                                        <td>{dato.Fecha}</td>
                                        <td>{dato.Descripcion}</td>
                                        <td>{dato.Categoria}</td>
                                        
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
export default User;