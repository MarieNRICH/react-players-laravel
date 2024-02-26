import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Menu from "../../components/Menu";
import axios from "axios";
const Players = () => {
    const [players, setPlayers] = useState([]);
    const [clubs, setClubs] = useState([]);
    useEffect(() => {
        displayPlayers();
        displayClubs();
    }, []); // Sans les crochets ça tourne en boucle

    const displayPlayers = async () => {
        await axios.get("http://127.0.0.1:8000/api/players").then((res) => {
            setPlayers(res.data);
        });
    };

    const displayClubs = async () => {
        await axios.get("http://127.0.0.1:8000/api/clubs").then((res) => {
            setClubs(res.data);
        });
    };
    const deletePlayer = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/players/${id}`).then(displayPlayers);
    };

    const getClubName = (clubId) => {
        const foundClub = clubs.find((club) => club.id === clubId);
        return foundClub ? foundClub.nameClub : "error - club not found !";
    }

    return (
        <div>
            <Menu />
            <div className="container mt-5">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Taille</th>
                            <th>Position</th>
                            <th>Club</th>
                            <th>Photo Player</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) => (
                            <tr key={player.id}>
                                <td>{player.firstName}</td>
                                <td>{player.lastName}</td>
                                <td>{player.height}</td>
                                <td>{player.position}</td>
                                <td>{player.club.nameClub}</td>
                                <td>
                                    <img
                                        src={`http://127.0.0.1:8000/storage/uploads/${player.photoPlayer}`}
                                        width="75px"
                                    />
                                </td>
                                <td>
                                    <Link to={`/players/edit/${player.id}`} className='btn btn-success me-2'>
                                        Edit
                                    </Link>
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            deletePlayer(player.id);
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
export default Players;
