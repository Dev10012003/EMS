import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import "reflect-metadata";
import connectToDatabase from "./db/dbConnect.js";
import authRouter from "./routes/auth.js";
import dashboardRouter from "./routes/dashboard.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import leaveRouter from "./routes/leave.js";
import salaryRouter from "./routes/salary.js";
import settingRouter from "./routes/setting.js";
import "./utils/salaryScheduler.js";

dotenv.config();

const projectRoot = process.cwd();

const app = express();

app.use(cors({ exposedHeaders: "Content-Disposition" }));
app.use(express.json());
app.use(express.static("public/uploads"));
app.use("/api/auth", authRouter);
app.use("/api/setting", settingRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/dashboard", dashboardRouter);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(projectRoot, "ems-frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(projectRoot, "ems-frontend", "build", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
