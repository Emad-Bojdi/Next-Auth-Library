import { getSession } from "next-auth/react";
import { CONFIG_FILES } from "next/dist/shared/lib/constants";

const Dashboard = () => {
    return <h1>Dashboard</h1>
}

export default Dashboard;

export async function getServerSideProps(context) {
    console.log(context);
    const { req } = context;
    const session = await getSession(req);
    if (!session) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false
            }
        }
    }
    return {
        props: { session }
    }
}
