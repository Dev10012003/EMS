import { summaryRepository } from "../repositories/dashboardRepository.js";
import { defaultLeaveTypes, defaultStatuses } from "../utils/constant.js";

export class SummaryService {
  async getAdminSummary() {
    const totalEmployees = await summaryRepository.getTotalEmployees();
    const totalDepartments = await summaryRepository.getTotalDepartments();
    const totalSalaries = await summaryRepository.getTotalSalaries();

    const leaveData = await summaryRepository.getLeaveSummary();
    const salaryData = await summaryRepository.getSalarySummary();

    const statusMap = new Map<string, any[]>();
    leaveData.forEach((status) => {
      statusMap.set(status._id, status.records || []);
    });

    const leaveSummary = {
      appliedFor: [
        ...(statusMap.get("Approved") || []),
        ...(statusMap.get("Pending") || []),
        ...(statusMap.get("Rejected") || []),
      ],
      approved: statusMap.get("Approved") || [],
      pending: statusMap.get("Pending") || [],
      rejected: statusMap.get("Rejected") || [],
    };

    return {
      totalEmployees,
      totalDepartments,
      totalSalaries,
      leaveSummary,
      salarySummary: salaryData.length > 0 ? salaryData[0].salaryData : [],
    };
  }

  async getEmployeeSummary(id: string) {
    const employeeSummary = await summaryRepository.getEmployeeSummary(id);

    if (!employeeSummary.length) {
      throw new Error("No employee found");
    }

    const salaryData = employeeSummary.flatMap((emp) => emp.salaryData);
    const leaveData = employeeSummary.flatMap((emp) => emp.leaveData);

    const leaveStatusTypeMap = new Map();
    leaveData.forEach(({ status, leaveType, count }) => {
      const key = `${status}-${leaveType}`;
      leaveStatusTypeMap.set(key, count);
    });

    const leaveStatusTypeData = defaultStatuses.flatMap((status) =>
      defaultLeaveTypes.map((leaveType) => ({
        status,
        leaveType,
        count: leaveStatusTypeMap.get(`${status}-${leaveType}`) || 0,
      }))
    );

    return {
      salaryData,
      leaveData: leaveStatusTypeData,
    };
  }
}

export const summaryService = new SummaryService();
