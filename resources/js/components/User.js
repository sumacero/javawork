import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


function User() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
    },[])

    const getUsers = async () => {
        const response = await axios.get('/getuser');
        setUsers(response.data.users)
    }
    console.log(users)


    return (
        <div>
            <h1>Userページ</h1>
            <table>
                <tbody>
                    <tr>
                        <th>id</th><th>name</th><th>email</th>
                    </tr>
                    {users.map((user) => <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                        </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default User;

if (document.getElementById('user')) {
    ReactDOM.render(<User />, document.getElementById('user'));
}