
export const URL_SLUG = "https://playground.4geeks.com/contact/agendas/DeathNote"
export const URL_CONTACT = "https://playground.4geeks.com/contact/agendas/DeathNote/contacts"


// GET SLUG
export const getSlug = async () => {
    try {
        const resp = await fetch(URL_SLUG)
        const data = await resp.json()
        return data.slug
    }
    catch (error) {
        console.error('Se produjo un error', error)
    }
}


//GET ALL CONTACTS
export const getContacts = async () => {

    try {
        const resp = await fetch(URL_CONTACT);
        const data = await resp.json()
        return data.contacts
    }
    catch (error) {
        console.error('Se produjo un error ', error)
    }
}

//POST
export const addContact = async (contactData) => {

    console.log(JSON.stringify(contactData))

    try {
        const resp = await fetch(
            URL_CONTACT, {
            method: 'POST',
            body: JSON.stringify({
                ...contactData
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await resp.json()
        return {
            status: true,
            contact: data
        }
    } catch (error) {
        console.error('Se encontro un error', error)
        return {
            status: false,
            msg: error.detail.msg
        }
    }
}

//PUT
export const updateContact = async (id, contactData) => {
    try {
        const resp = await fetch(`${URL_CONTACT}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(contactData),
            headers: {
                'Content-Type': 'application/json',

            }
        })

        if (!resp.ok) throw new Error('El contacto no pudo ser eliminado')

        const data = await resp.json()
        
        return {
            status: true,
            contact: data
        }
    } catch (error) {
        console.error('Se encontro un error', error)
        return {
            status: false,
            msg: error.detail.msg
        }
    }

}

//DELETE
export const deleteContact = async (id) => {
    try {
        const resp = await fetch(`${URL_CONTACT}/${id}`, {
            method: 'DELETE'
        })

        if (!resp.ok) throw new Error('El contacto no pudo ser eliminado')
        return { status: true, id }
    }
    catch(error) {
        return { status: false, msg: error.message }
    }
}