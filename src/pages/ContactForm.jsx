import './ContactForm.css'
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate, useParams } from "react-router-dom";
import { addContact, updateContact } from "../fetch";


export const ContactForm = () => {

    const { store, dispatch } = useGlobalReducer();
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    })

    const [error, setError] = useState(false)

    useEffect(() => {
        if (id && store.contacts.length > 0) {
            const contactEdit = store.contacts.find(contact => contact.id === parseInt(id))
            if (contactEdit) {
                setForm({
                    name: contactEdit.name || '',
                    email: contactEdit.email || '',
                    phone: contactEdit.phone || '',
                    address: contactEdit.address || ''
                })
            }
        }
    }, [id, store.contacts])

    const hanledChange = (e) => {
        console.log(e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const sendData = async () => {
        if (!form.name || !form.email || !form.address || !form.phone) {
            setError(true)
            return
        }

        if (id) {
            const resp = await updateContact(id, form)
            if (resp.status) {
                dispatch({ type: 'update_contact', payload: resp.contact })
                navigate('/')
            } else {
                console.error('Error en la edicion:', resp.msg)
            }
        } else {
            const resp = await addContact({ ...form })
            if (resp.status) {
                dispatch({ type: 'add_contact', payload: resp.contact })
                navigate('/')
            } else {
                setError(true)
            }
        }
    }

    return (
        <>
            <div className="container-cl">
                <div className='row p-5'>
                    <h2 className="text-center">{id ? 'Edit contact' : 'Add contact'}</h2>

                    <label className='' htmlFor="fullname">Full Name</label>
                    <input name='name' type="text" placeholder="Full Name" value={form.name} onChange={hanledChange} />

                    <label className='mt-2' htmlFor="email">Email</label>
                    <input name='email' type="email" placeholder="Email" value={form.email} onChange={hanledChange} />

                    <label className='mt-2' htmlFor="phone">Phone</label>
                    <input name='phone' type="text" placeholder="Phone" value={form.phone} onChange={hanledChange} />

                    <label className='mt-2' htmlFor="address">Address</label>
                    <input name='address' type="text" placeholder="Address" value={form.address} onChange={hanledChange} />
                </div>
            </div>

            <div className="container-btn mt-2">
                <button className="btn btn-success mt-2 me-2" onClick={sendData} >{id ? 'Save change' : 'Save'}</button>
                <button className="btn btn-primary mt-2" onClick={() => navigate('/')}>Back</button>
            </div>

            <div className='text-center mt-3'>
                {
                    error ? <p>Error aqui c:</p> : null
                }
            </div>
            {error && <p className="text-danger mt-2 text-center">Todos los campos son obligatorios</p>}

        </>
    )
}