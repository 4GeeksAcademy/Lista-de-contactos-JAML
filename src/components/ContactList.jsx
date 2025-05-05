import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Contact } from "../pages/Contact";
import useGlobalReducer from "../hooks/useGlobalReducer"
import { getContacts, getSlug } from "../fetch";

export const ContactList = () => {

    const { store, dispatch } = useGlobalReducer()

    const contacts = store.contacts
    const slug = store.slug


    useEffect(() => {

        const fetchData = async () => {
            const _contacts = await getContacts()
            dispatch({ type: 'all_contacts', payload: _contacts })
            const _slug = await getSlug()
            dispatch({ type: 'get_slug', payload: _slug })
        }
        fetchData()
    }, [])

    return (
        <>
            <div className="text-center mt-2">
                <h1>{slug} contact list</h1>

                <div className="button-AddNewContact">
                    <Link to='/add'>
                        <button className="addNewContact btn btn-primary me-2">Add New Contact</button>
                    </Link>
                </div>
            </div>

            <div className="container-cards">
                {
                    contacts.length > 0 ?

                        contacts.map((contact) => {
                            return (
                                <Contact key={contact.id} contact={contact || ''} />
                            )
                        }) : <h3 className="mt-5">No hay contactos agregados en la {slug}, dale click al boton de agregar contactos para ingresar tu primer contacto.</h3>
                }
            </div>
        </>

    )
}