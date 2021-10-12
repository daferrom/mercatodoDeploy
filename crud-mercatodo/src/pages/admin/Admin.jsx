import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Products from '../../components/products/Products';
const cookies = new Cookies();

class Admin extends Component {

    //borrar las variables al cerrar sesión
    logOut=()=>{
        cookies.remove('id', {path: "/"});
        cookies.remove('first_lastname', {path: "/"});
        cookies.remove('second_lastname', {path: "/"});
        cookies.remove('name', {path: "/"});
        cookies.remove('username', {path: "/"});
        window.location.href='./';
    }
    
    //si no existe username redirecciona a login
    componentDidMount() {
        if(!cookies.get('username')){
            window.location.href="./";
        }
    }

    render() {
        console.log('id: '+ cookies.get('id'));
        console.log('first_lastname: '+cookies.get('first_lastname'));
        console.log('second_lastname: '+cookies.get('second_lastname'));
        console.log('name: '+cookies.get('name'));
        console.log('username: '+cookies.get('username'));
        return (
            <div>
                <Products/>
                <button onClick={()=>this.logOut()}>Cerrar Sesión</button>
            </div>
        );
    }
}

export default Admin;