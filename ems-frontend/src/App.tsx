import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminSummary from "./components/AdminDashboard/AdminSummary";
import LeaveDetail from "./components/AdminLeave/Detail";
import AdminLeaveList from "./components/AdminLeave/List";
import LeaveList from "./components/Common/LeaveList";
import Loader from "./components/Common/Loader";
import Setting from "./components/Common/Setting";
import AddDepartment from "./components/Department/AddDepartment";
import DepartmentList from "./components/Department/DepartmentList";
import EditDepartment from "./components/Department/EditDepartment";
import AddEmployee from "./components/Employee/Add";
import Edit from "./components/Employee/Edit";
import EmployeeList from "./components/Employee/List";
import ViewEmployee from "./components/Employee/View";
import Summary from "./components/EmployeeDashboard/Summary";
import AddLeave from "./components/EmployeeLeave/Add";
import AddSalary from "./components/Salary/Add";
import Structure from "./components/Salary/Structure";
import ViewSalary from "./components/Salary/View";
import { useAuth } from "./context/authContext";
import "./css/index.css";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import UnAuthorized from "./pages/UnAuthorized";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";

function App() {
  const authContext = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={
                authContext?.user?.role === "admin"
                  ? "admin-dashboard"
                  : "employee-dashboard"
              }
            />
          }
        />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        ></Route>
        <Route path="/unauthorized" element={<UnAuthorized />}></Route>
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />}></Route>
          <Route
            path="/admin-dashboard/departments"
            element={<DepartmentList />}
          ></Route>
          <Route
            path="/admin-dashboard/department/add"
            element={<AddDepartment />}
          ></Route>
          <Route
            path="/admin-dashboard/department/:id"
            element={<EditDepartment />}
          ></Route>
          <Route
            path="/admin-dashboard/employees"
            element={<EmployeeList />}
          ></Route>
          <Route
            path="/admin-dashboard/employee/add"
            element={<AddEmployee />}
          ></Route>
          <Route
            path="/admin-dashboard/employee/:id"
            element={<ViewEmployee />}
          ></Route>
          <Route
            path="/admin-dashboard/employee/edit/:id"
            element={<Edit />}
          ></Route>
          <Route
            path="/admin-dashboard/salary/add"
            element={<AddSalary />}
          ></Route>
          <Route
            path="/admin-dashboard/employee/salary/:id"
            element={<ViewSalary />}
          ></Route>
          <Route
            path="/admin-dashboard/employee/leave/:id"
            element={<LeaveList />}
          ></Route>
          <Route
            path="/admin-dashboard/leaves"
            element={<AdminLeaveList />}
          ></Route>
          <Route
            path="/admin-dashboard/leaves/:id"
            element={<LeaveDetail />}
          ></Route>
          <Route path="/admin-dashboard/settings" element={<Setting />}></Route>
        </Route>
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["employee"]}>
                <EmployeeDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<Summary />}></Route>
          <Route
            path="/employee-dashboard/profile/:id"
            element={<ViewEmployee />}
          ></Route>
          <Route
            path="/employee-dashboard/leaves"
            element={<LeaveList />}
          ></Route>
          <Route
            path="/employee-dashboard/leave/add"
            element={<AddLeave />}
          ></Route>
          <Route
            path="/employee-dashboard/salary/history/:id"
            element={<ViewSalary />}
          ></Route>
          <Route
            path="/employee-dashboard/salary/structure/:id"
            element={<Structure />}
          ></Route>
          <Route
            path="/employee-dashboard/settings"
            element={<Setting />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
