import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/Menu";
const AddPlayer = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [height, setHeight] = useState("");
    const [position, setPosition] = useState("");
    const [club_id, setClubId] = useState("");
    const [photoPlayer, setPhotoPlayer] = useState("");
    const [validationError, setValidationError] = useState({});
    const [clubs, setClubs] = useState([])
    const changeHandler = (event) => {
        setPhotoPlayer(event.target.files[0]);
    };
    const handleChange = (event) => {
        setClubId(event.target.value);
    }
    useEffect(() => {
        getClubs()
    }, [])
    //Méthode pour récupérer les clubs
    const getClubs = async () => {
        await axios.get('http://127.0.0.1:8000/api/clubs').then(res => {
            setClubs(res.data)
        })
    }
    //Méthode d'ajout de joueurs
    const addPlayer = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("height", height);
        formData.append("position", position);
        formData.append("club_id", club_id);
        formData.append("photoPlayer", photoPlayer);
        console.log(club_id)
        await axios
            .post(`http://127.0.0.1:8000/api/players`, formData)
            .then((res) => {
                navigate("/players")
            })
            .catch(({ response }) => {
                if (response.status != 200) {
                    setValidationError(response.data);
                }
            });
    };
    return (
        <div>
            <Menu />
            <div className="container container mt-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-12 col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Création d'un nouveau joueur</h4>
                                <hr />
                                <div className="form-wrapper">
                                    {Object.keys(validationError).length > 0 && (
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="alert alert-danger">
                                                    <ul className="mb-0">
                                                        {Object.entries(validationError).map(
                                                            ([key, value]) => (
                                                                <li key={key}>{value}</li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <Form onSubmit={addPlayer}>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="firstName">
                                                    <Form.Label>Prénom</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={firstName}
                                                        onChange={(event) => {
                                                            setFirstName(event.target.value);
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="lastName">
                                                    <Form.Label>Nom</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={lastName}
                                                        onChange={(event) => {
                                                            setLastName(event.target.value);
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="height">
                                                    <Form.Label>Taille</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={height}
                                                        onChange={(event) => {
                                                            setHeight(event.target.value);
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="position">
                                                    <Form.Label>Position</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={position}
                                                        onChange={(event) => {
                                                            setPosition(event.target.value);
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="club">
                                                    <Form.Label>Club</Form.Label>
                                                    <Form.Select aria-label="Default select example"
                                                        onChange={handleChange}>
                                                        <option>Choisissez un club</option>
                                                        {clubs.map(club => (
                                                            <option
                                                                key={club.id}
                                                                value={club.id}>
                                                                {club.nameClub}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="PhotoPlayer" className="mb-3">
                                                    <Form.Label>Photo du joueur</Form.Label>
                                                    <Form.Control type="file" onChange={changeHandler} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Button
                                            variant="primary"
                                            className="mt-2"
                                            size="lg"
                                            block="block"
                                            type="submit"
                                        >
                                            Créer un nouveau joueur
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AddPlayer;