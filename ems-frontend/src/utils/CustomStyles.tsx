import { TableStyles } from "react-data-table-component";

export const customStyles: TableStyles = {
  headCells: {
    style: {
      fontSize: "18px",
      fontWeight: "bold",
      backgroundColor: "#f8f9fa",
      color: "#333",
    },
  },
  rows: {
    style: {
      minHeight: "60px",
      padding: "10px 0",
      "&:hover": {
        backgroundColor: "#f0f0f0",
        transition: "background-color 0.3s ease",
      },
    },
  },
};
