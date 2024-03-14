import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewCustomerTransactions = () => {
  let navigate = useNavigate();
  const [allTransactions, setAllTransactions] = useState([]);

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  const retrieveAllTransactions = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/transaction/fetch/transactions/success",
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
            <h2>Customer Success Transactions</h2>
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
                  <th scope="col">Transaction Id</th>
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

export default ViewCustomerTransactions;
