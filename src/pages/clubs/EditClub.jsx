import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../components/Menu";
const EditClub = () => {
    const { club } = useParams()
    const navigate = useNavigate();
    const [nameClub, setNameClub] = useState("");
    const [logoClub, setLogoClub] = useState(null);
    const [validationError, setValidationError] = useState({});
    useEffect(() => {
        getClub()
    }, [])
    // GET - Récupère les valeurs de la fiche avec l'API
    const getClub = async () => {
        await axios
            .get(`http://127.0.0.1:8000/api/clubs/${club}`)
            .then(res => {
                setNameClub(res.data.nameClub)
            })
            .catch(error => {
                console.log(error)
            })
    }
    const changeHandler = (event) => {
        setLogoClub(event.target.files[0]);
    };
    //Fonction d'ajout de club
    const updateClub = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append("nameClub", nameClub);
        if (logoClub !== null) {
            formData.append("logoClub", logoClub)
        }
        await axios
            .post(`http://127.0.0.1:8000/api/clubs/${club}`, formData)
            .then((res) => {
                navigate("/clubs")
            })
            .catch(({ response }) => {
                if (response.status === 422) {
                    setValidationError(response.data.errors);
                }
            });
    };
    return (
        <div>
            <Menu />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-12 col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Modifier un club</h4>
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
                                    <Form onSubmit={updateClub}>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="Name">
                                                    <Form.Label>Nom du club</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={nameClub}
                                                        onChange={(event) => {
                                                            setNameClub(event.target.value);
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="Logo" className="mb-3">
                                                    <Form.Label>Logo</Form.Label>
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
                                            Créer
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
export default EditClub;