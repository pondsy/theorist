import {useLocation} from "react-router-dom";
import PractitionerDashboard from "./Practitioner";
import ClientDashboard from "./Client";

const Dashboard = () => {

    const {state} = useLocation();
    const role = (state as {role: string}).role;

    return (
        <div>{role && 'practitioner' ? <PractitionerDashboard/> : <ClientDashboard/>}</div>
    )
}

export default Dashboard;