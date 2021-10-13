import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "../../components/products/products.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Table,
    Button,
    Container,
    
} from "reactstrap";

const baseUrl='https://apimercatodo.herokuapp.com/api/products/'


function Global() {

  const [data, setData]=useState([]);
  const [search, setSearch] = useState("");
 
  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data.products);
    })
  }
  
  useEffect(async()=>{
    await peticionGet();
  },[])

  const filteredProducts = data.filter(dato => {
        return dato.pro_name.toLowerCase().includes(search.toLowerCase())
    }  )
  
 return (
           <>
                <header>
                    <h1>Mercatodo</h1>
                </header>
                <div className="all">
                    <Container>
                        <div className="buscador">
                            <br />
                            <p>Bienvenido encuentra lo que necesitas</p>
                            <Button
                                color="success"
                                // onClick={() => this.mostrarModalInsertar()}
                            >
                                +Agregar producto
                            </Button>
                            <input
                              type="text"
                              placeholder="Buscar"
                              onChange={(e) => setSearch(e.target.value)}
                            />
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
                                {filteredProducts.map(dato =>(
                                    <tr key={dato.id}>
                                        <td>{dato.id}</td>
                                        <td>{dato.pro_name}</td>
                                        <td>{dato.pro_provider}</td>
                                        <td>{dato.pro_existences}</td>
                                        <td>{dato.pro_date}</td>
                                        <td>{dato.pro_description}</td>
                                        <td>{dato.pro_category}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                </div>  
            </>
 )
}

export default Global;