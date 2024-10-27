import { getSession } from "next-auth/react";
import { useState } from "react";


const Dashboard = () => {
    const [form, setForm] = useState({
        name: "",
        lastName: "",
        password: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }
    const updateInfoHandler = async () => {
        const response = await fetch("/api/update-info", {
            method: "POST",
            body: JSON.stringify({ name: form.name, lastName: form.lastName, password: form.password }),
            headers:{"Content-Type" : "application/json"}
        });
        const data = await response.json();
        console.log(data);
    }

    return (<>
        <h1>Dashboard</h1>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button onClick={updateInfoHandler}>Update Info</button>
    </>)
}

export default Dashboard;

export async function getServerSideProps(context) {
    const { req } = context;
    const session = await getSession(req);
    console.log(session);
    // if (!session) {
    //     return {
    //         redirect: {
    //             destination: "/sigin",
    //             permanent: false
    //         }
    //     }
    // }
    return {
        props: { session }
    }
}
