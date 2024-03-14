import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewPendingTransactions = () => {
  let navigate = useNavigate();
  const [allTransactions, setAllTransactions] = useState([]);

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  const [updateUserStatusRequest, setUpdateUserStatusRequest] = useState({
    userId: "",
    status: "",
  });

  const retrieveAllTransactions = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/transaction/fetch/transactions/pending",
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
    const getAllTransactions = async () => {
      const transactions = await retrieveAllTransactions();
      if (transactions) {
        setAllTransactions(transactions.transactions);
      }
    };

    getAllTransactions();
  }, []);

  const convertToEpochTime = (dateString) => {
    const selectedDate = new Date(dateString);
    const epochTime = selectedDate.getTime();
    return epochTime;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  const approveTransaction = (transactionId, e) => {
    updateUserStatusRequest.userId = transactionId;
    updateUserStatusRequest.status = "Approve";

    fetch("http://localhost:8080/api/transaction/update/status", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //    Authorization: "Bearer " + admin_jwtToken,
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

  const rejectTransaction = (transactionId) => {
    updateUserStatusRequest.userId = transactionId;
    updateUserStatusRequest.status = "Reject";

    fetch("http://localhost:8080/api/transaction/update/status", {
      method: "PUT",
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
            <h2>Customer Pending Transactions</h2>
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
                  <th scope="col">TransactionId</th>
                    <th scope="col">Type</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Sender Name</th>
                    <th scope="col">Sender Address</th>
                    <th scope="col">Description</th>
                    <th scope="col">Beneficiary Name</th>
                    <th scope="col">Account Number</th>
                    <th scope="col">Swift Code</th>
                    <th scope="col">Bank Name</th>
                    <th scope="col">Bank Address</th>
                    <th scope="col">Purpose</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allTransactions.map((transaction) => {
                    return (
                      <tr>
                         <td>
                          <b>{transaction.transactionId}</b>
                        </td>
                        <td>
                          <b>{transaction.type}</b>
                        </td>
                        <td>
                          <b>{transaction.amount}</b>
                        </td>
                        <td>
                          <b>{transaction.user.name}</b>
                        </td>
                        <td>
                          <b>
                            {transaction.senderName
                              ? transaction.senderName
                              : "-"}
                          </b>
                        </td>
                        <td>
                          <b>
                            {transaction.senderAddress
                              ? transaction.senderAddress
                              : "-"}
                          </b>
                        </td>
                        <td>
                          <b>
                            {transaction.description
                              ? transaction.description
                              : "-"}
                          </b>
                        </td>
                        <td>
                          <b>
                            {transaction.beneficiaryName
                              ? transaction.beneficiaryName
                              : "-"}
                          </b>
                        </td>
                        <td>
                          <b>
                            {transaction.accountNumber
                              ? transaction.accountNumber
                              : "-"}
                          </b>
                        </td>
                        <td>
                          <b>
                            {transaction.swiftCode
                              ? transaction.swiftCode
                              : "-"}
                          </b>
                        </td>
                        <td>
                          <b>
                            {transaction.bankName ? transaction.bankName : "-"}
                          </b>
                        </td>
                        <td>
                          <b>
                            {transaction.bankAddress
                              ? transaction.bankAddress
                              : "-"}
                          </b>
                        </td>
                        <td>
                          <b>
                            {transaction.purpose ? transaction.purpose : "-"}
                          </b>
                        </td>
                        <td>
                          <b>{transaction.status ? transaction.status : "-"}</b>
                        </td>
                        <td>
                          <button
                            onClick={() => rejectTransaction(transaction.id)}
                            className="btn btn-sm bg-danger custom-bg-text ms-2"
                          >
                            Reject
                          </button>

                          <button
                            onClick={() => approveTransaction(transaction.id)}
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

export default ViewPendingTransactions;
