export const initialStore = () => {

  return {
    slug: '',
    contacts: []
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case 'get_slug':
      
    return {
      ...store,
      slug: action.payload
    }

    case 'all_contacts':

      return {
        ...store,
        contacts: action.payload
      }

    case 'add_contact':

      return {
        ...store,
        contacts: [...store.contacts, action.payload]
      }

    case 'update_contact':

      return {
        ...store,
        contact: store.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact)
      }

    case 'delete_contact':

      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== action.payload)
      }

    default:
      throw Error('Unknown action.');
  }
}
