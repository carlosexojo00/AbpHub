import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";

function FormativeCiclesList() {
  const [formativeCicles, setFormativeCicles] = useState([]);
  const [showerrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    getFormativeCicles();
  }, []);

  const getFormativeCicles = async () => {
    let { data: FormativeCicles, error } = await supabase
      .from("FormativeCicles")
      .select("*");
    if (error) {
      setShowErrorMessage(true);
      return;
    }
    setFormativeCicles(FormativeCicles);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nombre", minWidth: 130 },
    { field: "description", headerName: "Descripción", minWidth: 130 },
    { field: "hours", headerName: "Horas", minWidth: 130 },
  ];

  const rows = formativeCicles.map((formativeCicle) => {
    return {
      id: formativeCicle.id,
      name: formativeCicle.name,
      description: formativeCicle.description,
      hours: formativeCicle.hours,
    };
  });

  return (
    <div className="FormativeCiclesList">
      <Stack sx={{ width: "100%" }} spacing={2}>
        {showerrorMessage && (
          <Alert severity="error">Error al obtener los ciclos formativos</Alert>
        )}
      </Stack>
      <h1>Formative Cicles List</h1>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default FormativeCiclesList;
