import './Contact.css'
import { deleteContact } from "../fetch";
import useGlobalReducer from '../hooks/useGlobalReducer';
import { useNavigate } from "react-router-dom";

export const Contact = ({ contact }) => {

    const { dispatch } = useGlobalReducer();

    const navigate = useNavigate();

    const hanledClickUpdate = () => {

        navigate(`/edit/${contact.id}`)

    }

    const hanledClickDelete = async () => {
        console.log(`Contanto ${contact.name} eliminado`)

        const resp = await deleteContact(contact.id)
        if (resp.status) {
            dispatch({ type: 'delete_contact', payload: contact.id })
        } else {
            console.error('Error al eliminar el contacto', error)
        }
    }

    return (
        <>
            <div className="container-cl">
                <div className="card mt-2">
                    <div className="row g-0">
                        <div className="img col-md-4">
                            <img src={'https://unavatar.io/kikobeats'} className="photoContact" alt="" />
                        </div>

                        <div className="col-md-6">
                            <div className="card-body">
                                <h5 className="card-title">{contact.name}</h5>
                                <p className="card-text"><i className="bi bi-geo-alt-fill"></i>  {contact.address}</p>
                                <p className="card-text"><i className="bi bi-telephone"></i>  {contact.phone}</p>
                                <p className="card-text"><i className="bi bi-envelope-at"></i>  {contact.email}</p>
                            </div>
                        </div>

                        <div className="col-md-2 ic-cc">
                            <button className="btn  btn-secundary"><i className="bi bi-pencil" onClick={hanledClickUpdate}></i></button>
                            <button className="btn  btn-secundary"><i className="bi bi-trash3" onClick={hanledClickDelete}></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}