import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface Department {
  department: string;
  sub_departments: string[];
}

const departments: Department[] = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];

 const Checkboxlist=()=> {
  const [checked, setChecked] = React.useState(
    departments.map((department) => ({
      department: false,
      sub_departments: department.sub_departments.map(() => false),
    }))
  );

  const [expand, setExpand] = React.useState<{ [department: string]: boolean }>(
    {}
  );

  const handleExpand = (department: string) => {
    setExpand((prev) => ({ ...prev, [department]: !prev[department] }));
  };
  const handleChangeDepartment = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChecked((prevChecked) => {
      prevChecked[index].department = event.target.checked;
      prevChecked[index].sub_departments = prevChecked[
        index
      ].sub_departments.map(() => event.target.checked);
      return [...prevChecked];
    });
  };

  const handleChangeSubDepartment = (
    departmentIndex: number,
    subDepartmentIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChecked((prevChecked) => {
      prevChecked[departmentIndex].sub_departments[subDepartmentIndex] =
        event.target.checked;
      prevChecked[departmentIndex].department = prevChecked[
        departmentIndex
      ].sub_departments.every((subDepartment) => subDepartment);
      return [...prevChecked];
    });
  };

  return (
    <div style={{flex:'2', marginRight:'10px'}}>
      {departments.map((department, index) => (
        <div key={department.department} style={{ textAlign: "start" }}>
          <FormControlLabel
            label={department.department}
            control={
              <Checkbox
                checked={checked[index].department}
                onChange={(event) => handleChangeDepartment(index, event)}
              />
            }
          />
          <IconButton onClick={() => handleExpand(department.department)}>
            {expand[department.department] ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
          {expand[department.department] && (
            <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
              {department.sub_departments.map(
                (subDepartment, subDepartmentIndex) => (
                  <FormControlLabel
                    key={subDepartment}
                    label={subDepartment}
                    control={
                      <Checkbox
                        checked={
                          checked[index].sub_departments[subDepartmentIndex]
                        }
                        onChange={(event) =>
                          handleChangeSubDepartment(
                            index,
                            subDepartmentIndex,
                            event
                          )
                        }
                      />
                    }
                  />
                )
              )}
            </Box>
          )}
        </div>
      ))}
    </div>
  );
}
export default Checkboxlist;