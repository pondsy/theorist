import {useLocation} from "react-router-dom";
import PractitionerDashboard from "./Practitioner";
import ClientDashboard from "./Client";

const Dashboard = () => {
    const {state} = useLocation();
    const role = (state as {role: string}).role;
    return role && role === 'practitioner' ? <PractitionerDashboard/> : <ClientDashboard/>;
}

export default Dashboard;