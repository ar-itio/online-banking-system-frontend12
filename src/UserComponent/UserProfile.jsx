import { useParams, useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  let navigate = useNavigate();

  //  const customer = JSON.parse(sessionStorage.getItem("active-customer"));
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const [customer, setCustomer] = useState({});

  const retrieveAllBankUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user/fetch/id?id=" + user.id
      );
      return response.data;
    } catch (error) {
      // Handle any errors here
      console.error("Error fetching bank managers:", error);
      throw error;
    }
  };

  useEffect(() => {
    const getCustomer = async () => {
      const customerRes = await retrieveAllBankUsers();
      if (customerRes) {
        setCustomer(customerRes.users[0]);
      }
    };

    getCustomer();
  }, []);

  const navigateToUpdateProfilePage = async () => {
    navigate("/customer/profile/update", { state: customer });
  };
  return (
    <div>
      {/* User Profile Card */}
      <div className="d-flex align-items-center justify-content-center ms-5 mt-1 me-5 mb-3">
        <div
          className="card rounded-card h-100 shadow-lg"
          style={{
            width: "900px",
          }}
        >
          <div className="card-body">
            <h4 className="card-title text-color-second text-center">
              Customer Profile
            </h4>

            <div className="row mt-4">
              <div className="col-md-4">
                <p className="mb-2">
                  <b>Customer Name:</b> {customer.name}
                </p>
              </div>
              <div className="col-md-4">
                <p className="mb-2">
                  <b>Email:</b> {customer.email}
                </p>
              </div>
              <div className="col-md-4">
                <p className="mb-2">
                  <b>Contact:</b> {customer.contact}
                </p>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-4">
                <p className="mb-2">
                  <b>Gender:</b> {customer.gender}
                </p>
              </div>
              <div className="col-md-4">
                <p className="mb-2">
                  <b>Address:</b>{" "}
                  {customer.street +
                    " " +
                    customer.city +
                    " " +
                    customer.pincode}
                </p>
              </div>

              <div className="col-md-4">
                <p className="mb-2">
                  <b>Account Balance:</b> Rs. {customer.accountBalance}
                </p>
              </div>
            </div>
            <div className="d-flex aligns-items-center justify-content-center mt-3">
              <button
                class="btn bg-color custom-bg-text ms-5 mb-3"
                onClick={navigateToUpdateProfilePage}
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
