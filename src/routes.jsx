import {
    createBrowserRouter,
    createRoutesFromElements,
    Outlet,
    Route,
} from "react-router-dom"; 
import { Contact } from "./pages/Contact";
import { ContactForm } from "./pages/ContactForm"
import { ContactList } from "./components/ContactList";

export const router = createBrowserRouter(
    createRoutesFromElements(
    
      <Route path="/" element={<Outlet />} errorElement={<h1>Not found!</h1>} >
        <Route path="/" element={<ContactList />} />
        <Route path="/add" element={<ContactForm />} />
        <Route path="/edit/:id" element={<ContactForm />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    )
);