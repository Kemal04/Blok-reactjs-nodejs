import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminNavbar from '../../../components/admin/AdminNavbar'
import Sidebar from '../../../components/admin/Sidebar'
import axios from 'axios';

const AdminUser = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:3001/user')
                setUsers(res.data.users)
            } catch (err) {
                console.log(err)
            }
        }
        fetchUsers()
    }, [])

    return (
        <>
            <div className="hold-transition sidebar-mini layout-fixed">
                <div className="wrapper">
                    <AdminNavbar />
                    <Sidebar />
                    <div className="content-wrapper text-dark" style={{ paddingTop: "70px" }}>
                        <div className='content'>
                            <div className='container py-5'>
                                <div className='d-flex justify-content-between aling-items-center h2 mb-5'>
                                    Ulanyjylar bölümi
                                    <Link to="/admin/ulanyjy-gos" className='text-decoration-none'>+</Link>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <table className="table">
                                            <thead className='table-dark'>
                                                <tr>
                                                    <th scope="col">№</th>
                                                    <th scope="col">Suraty</th>
                                                    <th scope="col">Ulanyjy Ady</th>
                                                    <th scope="col">E-mail adresi</th>
                                                    <th scope="col">Açar sözi</th>
                                                    <th scope="col">Role</th>
                                                    <th scope="col">Duzeltmek</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    users.map(user => (
                                                        <tr key={user.id}>
                                                            <td>{user.id}</td>
                                                            <td>{user.img}</td>
                                                            <td>{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td>************</td>
                                                            <td>{user.roleId == null ? <div className='text-danger fw-bold'>BERILMEDIK</div> : <div className='text-success fw-bold'>{user.role.name}</div>}</td>
                                                            <td>
                                                                <Link className='me-3 btn btn-sm btn-warning' to={`/admin/ulanyjy-uytget/${user.id}`}>Duzeltmek</Link>
                                                                <button className='btn btn-sm btn-danger'>Pozmak</button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminUser