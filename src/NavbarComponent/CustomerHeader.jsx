import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import './CustomerHeader.css'; // Ensure this file exists in your project

const CustomerHeader = () => {
  let navigate = useNavigate();
  const customer = JSON.parse(sessionStorage.getItem("active-customer"));
  const userLogout = () => {
    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-customer");
    sessionStorage.removeItem("customer-jwtToken");

    setTimeout(() => {
      navigate("/home");
    }, 1000);

    window.location.reload();
  };

  return (
    
    <div className="sidebar">
      
      <div className="sidebar-menu">
        <Link to="/customer/add/money" className="sidebar-item">
          <i className="fa fa-wallet sidebar-icon"></i>
          <span>Add Money</span>
        </Link>
        <Link
          to="/customer/beneficiary/add"
          className="sidebar-item"
        >
           <i className="fa fa-exchange-alt sidebar-icon"></i>
          <span>Add Beneficiary </span>
        </Link>
        <Link
          to="/customer/beneficiary/view"
          className="sidebar-item"  
        >
           <i className="fa fa-exchange-alt sidebar-icon"></i>
          <span>View Beneficiary</span>
        </Link>

        
        <Link
          to="/customer/quick/account/transfer"
          className="sidebar-item"
        >
          <i className="fa fa-exchange-alt sidebar-icon"></i>
         
          <span>Quick Account Transfer</span>
        </Link>
      
        <Link to="/customer/account/money/transfer" className="sidebar-item">
          <i className="fa fa-exchange-alt sidebar-icon"></i>
          <span>Account Transfer</span>
        </Link>

        <Link to="/customer/transaction/all" className="sidebar-item">
          <i className="fa fa-list sidebar-icon"></i>
          <span>My Transactions</span>
        </Link>

       <Link to="/customer/profile" className="sidebar-item">
          <i className="fa fa-user sidebar-icon"></i>
          <span>My Profile</span>
  </Link>
  
       <div className="sidebar-item" onClick={userLogout}>
          <i className="fa fa-sign-out-alt sidebar-icon"></i>
          <span>Logout</span>
</div>
      </div>
     
      <ToastContainer />
    </div>
  );
};

export default CustomerHeader;