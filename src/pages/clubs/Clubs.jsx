import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Menu from "../../components/Menu";
import axios from "axios";
const Clubs = () => {
    const [clubs, setClubs] = useState([]);
    useEffect(() => {
        displayClubs();
    }, []); // Sans les crochets ça tourne en boucle
    const displayClubs = async () => {
        await axios.get("http://127.0.0.1:8000/api/clubs").then((res) => {
            setClubs(res.data);
        });
    };
    const deleteClub = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/clubs/${id}`).then(displayClubs);
    };
    return (
        <div>
            <Menu />
            <div className="container mt-5">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nom du club</th>
                            <th>Logo</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clubs.map((club) => (
                            <tr key={club.id}>
                                <td>{club.nameClub}</td>
                                <td>
                                    <img
                                        src={`http://127.0.0.1:8000/storage/uploads/${club.logoClub}`}
                                        width="75px"
                                    />
                                </td>
                                <td>
                                    <Link to={`/clubs/edit/${club.id}`} className='btn btn-success me-2'>
                                        Edit
                                    </Link>
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            deleteClub(club.id);
                                        }}
                                    >
                                        Supprimer
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};
export default Clubs;
