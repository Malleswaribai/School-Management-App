import DynamicTable from "../DynamicTable";

const AdminDashboard = () => {
    return (
        <>
            <DynamicTable apiEndpoint="http://localhost:80/tableData" />
        </>
    );
};

export default AdminDashboard;
