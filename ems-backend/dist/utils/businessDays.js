import moment from "moment-business-days";
import { holidays } from "./constant.js";
const holidayStrings = holidays.map((holiday) => moment(holiday).format("YYYY-MM-DD"));
moment.updateLocale("en", {
    holidays: holidayStrings,
    holidayFormat: "YYYY-MM-DD",
});
export const countBusinessDays = (start, end) => {
    let totalDays = start.businessDiff(end);
    if (end.isoWeekday() < 6 && !end.isSame(end.clone().endOf("month"), "day")) {
        totalDays++;
    }
    return totalDays;
};
//# sourceMappingURL=businessDays.js.map