import * as React from "react";
import { useNavigate} from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { Post } from "./Api/Api";
import { fetchPosts } from "./Api/Api";
import Checkboxlist from "./checkbox/Checkboxlist";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "userId", headerName: "UserId", width: 70 },
  { field: "title", headerName: "Title", width: 300 },
  { field: "body", headerName: "Body", width: 500 },
];

const Page2 = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const navigateTo = () => {
    Swal.fire({
      title: "Error",
      text: "Please fill in all the fields",
      icon: "error",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!user.name || !user.phoneNumber || !user.email) {
      navigateTo();
    } else {
      fetchPosts().then((data) => {
        setPosts(data);
        setLoading(false);
      });
    }
  }, []);

  return (
    <>
    <h2 style={{textAlign:'center'}}>Components Page</h2>
    <div style={{display:'flex'}}>
      <div style={{flex:'2', margin:'5px', marginLeft:'10px'}}>
      <Checkboxlist />
      </div>
      <div style={{ height: 400, width: "100%",flex:'2'}}>
        {loading ? (
          <p style={{marginRight:'500px', fontSize:'30px',paddingLeft:'300px'}}>Loading...</p>
        ) : (
          <DataGrid rows={posts} columns={columns} />
        )}
      </div>
    </div>
    </>
  );
};

export default Page2;
