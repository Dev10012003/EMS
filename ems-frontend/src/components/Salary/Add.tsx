import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { ISalaryFormValues } from "../../interfaces/Salary";
import {
  useAddSalaryMutation,
  useGetDepartmentsQuery,
  useGetEmployeesByDepartmentQuery,
  useGetSalaryDetailQuery,
} from "../../services/apiSlice";
import { handleAxiosError } from "../../utils/ErrorHandler";

function Add() {
  const navigate = useNavigate();
  const [departmentId, setDepartmentId] = useState<string>("");
  const [employeeId, setEmployeeId] = useState<string>("");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const { data: departments = [] } = useGetDepartmentsQuery();
  const { data: employees = [] } = useGetEmployeesByDepartmentQuery(
    departmentId,
    { skip: !departmentId }
  );

  const { data: salaryDetail } = useGetSalaryDetailQuery(employeeId, {
    skip: !employeeId,
  });

  const [addSalary] = useAddSalaryMutation();

  const validationSchema = Yup.object({
    department: Yup.string()
      .required("Department is required")
      .nullable()
      .min(1, "Department is required"),
    employeeId: Yup.string()
      .required("Employee is required")
      .nullable()
      .min(1, "Employee is required"),
    basicSalary: Yup.number()
      .typeError("Basic Salary must be a number")
      .required("Basic Salary is required"),
    allowances: Yup.number()
      .typeError("Allowances must be a number")
      .required("Allowances is required"),
    deductions: Yup.number()
      .typeError("Deductions must be a number")
      .required("Deductions is required"),
    payDate: Yup.string().required("Pay Date is required"),
  });

  const initialValues: ISalaryFormValues = {
    department: "",
    employeeId: "",
    basicSalary: null,
    allowances: null,
    deductions: null,
    payDate: "",
  };

  const formik = useFormik<ISalaryFormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await addSalary(values).unwrap();
        if (response.success) {
          navigate("/admin-dashboard/employees");
          toast.success(response.message);
        }
      } catch (error) {
        handleAxiosError(error);
      }
    },
  });

  useEffect(() => {
    if (salaryDetail) {
      formik.setValues({
        ...formik.values,
        basicSalary: salaryDetail.basicSalary ?? null,
        allowances: salaryDetail.allowances ?? null,
        deductions: salaryDetail.deductions ?? null,
        payDate: salaryDetail?.payDate
          ? new Date(salaryDetail.payDate).toISOString().split("T")[0]
          : "",
      });
      setIsUpdate(true);
    } else {
      setIsUpdate(false);
    }
  }, [salaryDetail]);

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDepartmentId = e.target.value;

    formik.setValues({
      department: newDepartmentId,
      employeeId: "",
      basicSalary: null,
      allowances: null,
      deductions: null,
      payDate: "",
    });

    setDepartmentId(newDepartmentId);
    setEmployeeId("");
    setIsUpdate(false);
  };

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newEmployeeId = e.target.value;

    formik.setValues({
      ...formik.values,
      employeeId: newEmployeeId,
      basicSalary: null,
      allowances: null,
      deductions: null,
      payDate: "",
    });

    setEmployeeId(newEmployeeId);
    setIsUpdate(false);
  };

  return (
    <div className="w-full">
      <div className="px-3 sm:px-6 md:px-8 lg:px-12 xl:px-8 py-10 sm:py-12">
        <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-8 rounded-md shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-teal-600">
            Salary Structure
          </h2>
          <hr className="border-t-2 border-teal-600 my-6" />
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
              <div>
                <label className="common-form-label">Department</label>
                <select
                  name="department"
                  className="common-form-input"
                  onChange={handleDepartmentChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.department}
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
                {formik.touched.department && formik.errors.department && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.department}
                  </p>
                )}
              </div>
              <div>
                <label className="common-form-label">Employee</label>
                <select
                  name="employeeId"
                  className="common-form-input"
                  onChange={handleEmployeeChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.employeeId}
                >
                  <option value="" disabled>
                    Select Employee
                  </option>
                  {employees.length > 0 ? (
                    employees.map((emp) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.employeeId}
                      </option>
                    ))
                  ) : (
                    <option disabled>No Employee</option>
                  )}
                </select>
                {formik.touched.employeeId && formik.errors.employeeId && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.employeeId}
                  </p>
                )}
              </div>
              <div>
                <label className="common-form-label">Basic Salary</label>
                <input
                  type="number"
                  name="basicSalary"
                  placeholder="Insert Basic Salary"
                  className="common-form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.basicSalary ?? ""}
                />
                {formik.touched.basicSalary && formik.errors.basicSalary && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.basicSalary}
                  </p>
                )}
              </div>
              <div>
                <label className="common-form-label">Allowances</label>
                <input
                  type="number"
                  name="allowances"
                  placeholder="Insert Allowances"
                  className="common-form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.allowances ?? ""}
                />
                {formik.touched.allowances && formik.errors.allowances && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.allowances}
                  </p>
                )}
              </div>
              <div>
                <label className="common-form-label">Deductions</label>
                <input
                  type="number"
                  name="deductions"
                  placeholder="Insert Deductions"
                  className="common-form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.deductions ?? ""}
                />
                {formik.touched.deductions && formik.errors.deductions && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.deductions}
                  </p>
                )}
              </div>
              <div>
                <label className="common-form-label">Pay Date</label>
                <input
                  type="date"
                  name="payDate"
                  className="common-form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.payDate}
                />
                {formik.touched.payDate && formik.errors.payDate && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.payDate}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-7 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-md text-lg"
            >
              {isUpdate ? "Update" : "Add"} Salary Structure
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Add;
