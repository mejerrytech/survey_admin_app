import React, { useEffect, useState } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import styles from './User.module.css';
import { useParams } from 'react-router-dom';

function UserForm() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [dropdownOpen, setDropdownOpen] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(5);

    useEffect(() => {
        getUser();
    }, [id, currentPage, usersPerPage]);

    const getUser = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://192.168.1.7:7500/api/users/search`);
            console.log('Response:', response);
            const fetchedUsers = response.data.data.items || [];
            console.log('Fetched Users:', fetchedUsers);
            setUsers(fetchedUsers);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Users fetched successfully',
                timer: 2000,
                showConfirmButton: false
            });
            setDropdownOpen(new Array(fetchedUsers.length).fill(false));
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response ? error.response.data.error : 'Network Error',
                timer: 4000,
                position: 'top-center'
            });
        } finally {
            setLoading(false);
        }
    };
    
    const handleStatusChange = async (id, newStatus, index) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found in local storage');
            }
            const response = await axios.put(`http://192.168.1.7:7500/api/users/updateUser/${id}`, { status: newStatus }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Response:', response.data);
            const updatedUsers = [...users];
            updatedUsers[index].status = newStatus;
            setUsers(updatedUsers);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Successfully updated',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            console.error('Error:', error.response ? error.response.data.error : error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response ? error.response.data.error : error.message,
                timer: 4000,
                position: 'top-center'
            });
        }
    };

    const filteredUsers = users.filter(user => user.username.toLowerCase().includes(searchQuery.toLowerCase()));

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <input
                        type="text"
                        placeholder="Search by username"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    <div>
                        <select value={usersPerPage} onChange={(e) => setUsersPerPage(parseInt(e.target.value))}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <h1>Users</h1>

                {loading ? (
                    <div className={styles.loadingSpinner}></div>
                ) : (
                    filteredUsers.length > 0 ? (
                        <>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((user, index) => (
                                        <tr key={user.username}>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.status}</td>
                                            <td>
                                                <div className="dropdown">
                                                    <button className="dropbtn" onClick={() => {
                                                        const newDropdownOpen = [...dropdownOpen];
                                                        newDropdownOpen[index] = !newDropdownOpen[index];
                                                        setDropdownOpen(newDropdownOpen);
                                                    }}>...</button>
                                                    {dropdownOpen[index] && (
                                                        <ul className="dropdown-content">
                                                            <li onClick={() => handleStatusChange(user.id, 'active', index)}>active</li>
                                                            <li onClick={() => handleStatusChange(user.id, 'deleted', index)}>deleted</li>
                                                        </ul>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className={styles.pagination}>
                                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                                {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
                                    <button key={i} onClick={() => paginate(i + 1)}>{i + 1}</button>
                                ))}
                                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}>Next</button>
                            </div>
                        </>
                    ) : (
                        <p>No users found</p>
                    )
                )}
            </div>
        </div>
    );

}

export default UserForm;


