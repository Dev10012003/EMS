import moment from "moment";
export const holidays = [
    new Date("2025-01-01"),
    new Date("2025-01-26"),
    new Date("2025-03-14"),
    new Date("2025-04-18"),
    new Date("2025-08-15"),
    new Date("2025-10-21"),
    new Date("2025-12-25"),
];
export const currentMonth = moment().month() + 1;
export const currentYear = moment().year();
export const defaultStatuses = ["Approved", "Pending", "Rejected"];
export const defaultLeaveTypes = ["Sick Leave", "Casual Leave", "Annual Leave"];
//# sourceMappingURL=constant.js.map