import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewAllPendingCustomers = () => {
  let navigate = useNavigate();
  const [allCustomer, setAllCustomer] = useState([]);

  const [customerName, setCustomerNumber] = useState("");

  const [tempCustomerName, setTempCustomerName] = useState("");

  const [updateUserStatusRequest, setUpdateUserStatusRequest] = useState({
    userId: "",
    status: "",
  });

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  const retrieveAllCustomers = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/fetch/customer/pending/request",
      {
        headers: {
          Authorization: "Bearer " + admin_jwtToken, // Replace with your actual JWT token
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  useEffect(() => {
    const getAllCustomers = async () => {
      const customers = await retrieveAllCustomers();
      if (customers) {
        setAllCustomer(customers.users);
      }
    };

    getAllCustomers();
  }, []);

  const approveUser = (userId, e) => {
    updateUserStatusRequest.userId = userId;
    updateUserStatusRequest.status = "Active";

    fetch("http://localhost:8080/api/user/update/status", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + admin_jwtToken,
      },
      body: JSON.stringify(updateUserStatusRequest),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          console.log(res);

          if (res.success) {
            console.log("Got the success response");

            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          } else {
            console.log("Didn't got success response");
            toast.error("It seems server is down", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 1000); // Redirect after 3 seconds
      });
  };

  const rejectUser = (userId) => {
    updateUserStatusRequest.userId = userId;
    updateUserStatusRequest.status = "Reject";

    fetch("http://localhost:8080/api/user/update/status", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + admin_jwtToken,
      },
      body: JSON.stringify(updateUserStatusRequest),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          console.log(res);

          if (res.success) {
            console.log("Got the success response");

            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          } else {
            console.log("Didn't got success response");
            toast.error("It seems server is down", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 1000); // Redirect after 3 seconds
      });
  };

  return (
    <div>
      <div className="mt-2">
        <div
          className="card form-card ms-5 me-5 mb-5 custom-bg border-color "
          style={{
            height: "45rem",
          }}
        >
          <div className="card-header custom-bg-text text-center bg-color">
            <h2>All Pending Customers</h2>
          </div>
          <div
            className="card-body"
            style={{
              overflowY: "auto",
            }}
          >
            <div className="table-responsive mt-3">
              <table className="table table-hover text-color text-center">
                <thead className="table-bordered border-color bg-color custom-bg-text">
                  <tr>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Street</th>
                    <th scope="col">City</th>
                    <th scope="col">Pincode</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allCustomer.map((customer) => {
                    return (
                      <tr>
                        <td>
                          <b>{customer.name}</b>
                        </td>
                        <td>
                          <b>{customer.email}</b>
                        </td>
                        <td>
                          <b>{customer.gender}</b>
                        </td>
                        <td>
                          <b>{customer.contact}</b>
                        </td>
                        <td>
                          <b>{customer.street}</b>
                        </td>
                        <td>
                          <b>{customer.city}</b>
                        </td>
                        <td>
                          <b>{customer.pincode}</b>
                        </td>
                        <td>
                          <b>{customer.status}</b>
                        </td>
                        <td>
                          <button
                            onClick={() => rejectUser(customer.id)}
                            className="btn btn-sm bg-danger custom-bg-text ms-2"
                          >
                            Reject
                          </button>

                          <button
                            onClick={() => approveUser(customer.id)}
                            className="btn btn-sm bg-success custom-bg-text ms-2"
                          >
                            Approve
                          </button>

                          <ToastContainer />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllPendingCustomers;
