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
//import Footer from "../footer/Footer";
import * as ProductServer from './ProductServer'
import { useState } from "react";
import { useEffect } from "react";

<<<<<<< HEAD
 


const Products = () => {
    const [Products, setProducts] = useState([]) 

    const initialstate = [
        /*{
            id: 1,
            pro_name: "sachichas",
            pro_provider: "ranchera",
            pro_existences: "23",
            pro_date: "10/06/2021",
            pro_description: "comida embutida ",
            pro_category: "embutido",
        },*/
    ]

    const listProducts = async () => {
        try {
            const res = await ProductServer.listProducts();
            const data = await res.json();
            console.log(data);
            //setProducts(res.data);
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        listProducts()
    },[]);

     
    const [modalInsertar, setmodalInsertar] = useState(false)
    const [modalActualizar, setModalActualizar] = useState(false)
    const [status, setStatus] = useState(false)
    let   [data, setData] = useState([]) 
    const [form, setForm] = useState({
            id: '',
            pro_name: '',
            pro_provider: '',
            pro_existences: '',
            pro_date: '',
            pro_description: '',
            pro_category: '',
        })

    const endpoint ='https://apimercatodo.herokuapp.com/api/products/'
   
    useEffect(() => {
        listProducts()
    },[])

    /*
    const fetchProducts = async () =>{
        const response = await fetch.get(endpoint)
        const resJson = await response.json()
        setData( data = resJson)
        console.log(resJson)
=======
    getProducts = () => {
        var url = 'https://cryptic-headland-77186.herokuapp.com/productos/';
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
>>>>>>> e6df3a7369ffe52785ec20040f39131c1af415c6
    }
    */

    /*
    const getProducts = () => {
        var url = 'https://apimercatodo.herokuapp.com/api/products/';
        var request ="";
        axios.get(url + request).then(res => {
            setData({...data, res.data});
            setStatus({...status, true})
        });
    }
    */
    const mostrarModalActualizar = (dato, modalActualizar) => {
        setForm({...form, dato});
        setModalActualizar(modalActualizar, true );
    };

    const cerrarModalActualizar = () => {
        setModalActualizar(modalActualizar, false);
    };

    const mostrarModalInsertar = () => {
        setmodalInsertar({
            modalInsertar: true,
        });
    };

    const cerrarModalInsertar = () => {
        setmodalInsertar(modalInsertar, false);
    };

    const editar = (dato) => {
        var contador = 0;
        var arreglo = data;
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
        setData({ ...data, arreglo});
        setModalActualizar(modalActualizar, false );
    };

    const eliminar = (dato) => {
        var opcion = window.confirm(
            "Estás Seguro que deseas Eliminar el elemento " + dato.id
        );
        if (opcion == true) {
            var contador = 0;
            var arreglo = data;
            arreglo.map((registro) => {
                if (dato.id == registro.id) {
                    arreglo.splice(contador, 1);
                }
                contador++;
            });
            setData({ ...data, arreglo });
            setModalActualizar(modalActualizar, false);
        }
    };

    const insertar = () => {
        var valorNuevo = { ...form };
        valorNuevo.id = data.length + 1;
        var lista = data;
        lista.push(valorNuevo);
        setmodalInsertar(modalInsertar, false);
        setData({ ...data, lista });
    };

    const handleChange = (e) => {
        setForm({...form,  [e.target.name]: e.target.value });
    };

    
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
                                onClick={() => mostrarModalInsertar()}
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
                                {data.map((dato) => (
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
                                                    mostrarModalActualizar(
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
                                                    eliminar(dato)
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

                    <Modal isOpen={modalActualizar}>
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
                                    value={form.id}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label>Producto:</label>
                                <input
                                    className="form-control"
                                    name="producto"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.pro_name}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label>Provedor:</label>
                                <input
                                    className="form-control"
                                    name="Provedor"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.pro_provider}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Categotia:</label>
                                <input
                                    className="form-control"
                                    name="Categoria"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.pro_category}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Producto:</label>
                                <input
                                    className="form-control"
                                    name="Producto"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.pro_name}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Provedor:</label>
                                <input
                                    className="form-control"
                                    name="Provedor"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.pro_provider}
                                />
                            </FormGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                color="primary"
                                onClick={() => editar(form)}
                            >
                                Editar
                            </Button>
                            <Button
                                color="danger"
                                onClick={() => cerrarModalActualizar()}
                            >
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={modalInsertar}>
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
                                    value={data.length + 1}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label>Producto:</label>
                                <input
                                    className="form-control"
                                    name="Producto"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label>Provedor:</label>
                                <input
                                    className="form-control"
                                    name="Provedor"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Cantidad:</label>
                                <input
                                    className="form-control"
                                    name="Cantidad"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Fecha:</label>
                                <input
                                    className="form-control"
                                    name="Fecha"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Descripcion:</label>
                                <input
                                    className="form-control"
                                    name="Fecha"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Categoria:</label>
                                <input
                                    className="form-control"
                                    name="Fecha"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                color="primary"
                                onClick={() => insertar()}
                            >
                                Insertar
                            </Button>
                            <Button
                                className="btn btn-danger"
                                onClick={() => cerrarModalInsertar()}
                            >
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>  
            </>
        );
    
}
export default Products;