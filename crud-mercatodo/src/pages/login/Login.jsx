import React, {Component}from 'react';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';
import NavBar from '../../components/navbar/NavBar';
import Footer from '../../components/footer/Footer';

//url para petición
const baseUrl="http://localhost:3001/usuarios";

//guardar la var inicio de sesión
const cookies = new Cookies();

class Login extends Component {
    //ESTADO capturar lo que el usuario escribe en el input

    state={
        form:{
            username: '',
            password: ''
        }
    }

    //METODO para guardar en el estado capturar los inputs
    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    //login= peticion tipo get=consultar info 
    logIn=async()=>{
        await axios.get(baseUrl, {params: {username: this.state.form.username, password: md5(this.state.form.password)}})
        .then(response=>{
            return response.data; //retornamos la data del api cuando el inicio de sesion es correcto
        })
        .then(response=>{  
            if(response.length>0){  //usamos la data response length mayor a 0 y encuentra la data
                var reply=response[0]; 
                cookies.set('id', reply.id, {path: "/"});
                cookies.set('first_lastname', reply.first_lastname, {path: "/"});
                cookies.set('second_lastname', reply.second_lastname, {path: "/"});
                cookies.set('name', reply.name, {path: "/"});
                cookies.set('username', reply.username, {path: "/"});
                alert(`Bienvenido ${reply.name} ${reply.first_lastname}`);
                window.location.href="./admin";   //redirigir la pagina
            }else{
                window.location.href="./user";   //redirigir la pagina
            }
        })
        .catch(error=>{
            console.log(error);
        })

    }
    //redirecciona a tabla de productos
    componentDidMount() {
        if(cookies.get('username')){
            window.location.href="./admin";
        }
    }
    
    render() {
        return (
    <div className="master">
        <NavBar />
        <div className="firstContainer">
            <div className="secondContainer">
            <div className="form-group">
                <label>Usuario: </label>
                <br />
                <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.handleChange}
                />
                <br />
                <label>Contraseña: </label>
                <br />
                <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.handleChange}
                />
                <br />
                <button className="btn btn-warning" onClick={()=> this.logIn()}>Iniciar Sesión</button>
            </div>
            </div>
        </div>
        <Footer/>
      </div>
        );
    }
}

export default Login;