import {useLocation} from "react-router-dom";

const Dashboard = () => {

    const {state} = useLocation();
    const role = (state as {role: string}).role;

    return (
        <div>{`logged in as ${role}!`}</div>
    )
}

export default Dashboard;