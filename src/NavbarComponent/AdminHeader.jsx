import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './AdminHeader.css'; // Ensure this file exists in your project
const AdminHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-admin"));
  console.log(user);

  const adminLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-admin");
    sessionStorage.removeItem("admin-jwtToken");
    window.location.reload(true);
    setTimeout(() => {
      navigate("/home");
    }, 2000); // Redirect after 3 seconds
  };

  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <Link
          to="/admin/customer/pending"
          className="sidebar-item"
          >
		  <i className="fa fa-wallet sidebar-icon"></i>
          <span>Pending Customers</span>
        </Link>
     
        <Link
          to="/admin/all/bank/customers"
          className="sidebar-item"  
        >
		 <i className="fa fa-exchange-alt sidebar-icon"></i>
          <span>All Customers</span> 
        </Link>
     
        <Link
          to="/admin/customer/transaction/pending"
          className="sidebar-item"
          
        >
		 <i className="fa fa-list sidebar-icon"></i>
          <span>Pending Transactions</span>
         
        </Link>
     

     
        <Link
          to="/admin/customer/transaction/success"
          className="sidebar-item"
          
        >
		<i className="fa fa-user sidebar-icon"></i>
          <span>Success Transactions</span>
         
        </Link>
     <div className="sidebar-item" onClick={adminLogout}>
          <i className="fa fa-sign-out-alt sidebar-icon"></i>
          <span>Logout</span>
</div>
</div>
     
      <ToastContainer />
    </div>
      
        
  );
};

export default AdminHeader;
