import cron from "node-cron";
import { salaryService } from "../services/salaryService.js";
import { currentMonth, currentYear } from "./constant.js";

cron.schedule("0 10 1 * *", async () => {
  if (
    currentYear > new Date().getFullYear() ||
    (currentYear === new Date().getFullYear() + 1 && currentMonth === 1)
  ) {
    console.log("New year reached! Add New Salary Structure!");
    return;
  }

  console.log(
    "Running scheduled salary process on the 1st day of the month..."
  );
  await salaryService.processSalaries();
});
