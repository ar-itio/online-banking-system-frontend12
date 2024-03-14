import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AccountTransfer = () => {
  let navigate = useNavigate();

  const [addMoneyRequest, setAddMoneyRequest] = useState({});
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");

  const customer = JSON.parse(sessionStorage.getItem("active-customer"));
  const handleUserInput = (e) => {
    setAddMoneyRequest({ ...addMoneyRequest, [e.target.name]: e.target.value });
  };

  const accountTransfer = (e) => {
    addMoneyRequest.userId = customer.id;

    fetch("http://localhost:8080/api/transaction/accountTransfer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + customer_jwtToken,
      },
      body: JSON.stringify(addMoneyRequest),
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
              window.location.href = "/home";
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
      });
    e.preventDefault();
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card form-card border-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color text-center custom-bg-text">
            <h4 className="card-title">Account Transfer</h4>
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3 text-color">
                <label for="amount" class="form-label">
                  <b>Amount</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  name="amount"
                  onChange={handleUserInput}
                  value={addMoneyRequest.amount}
                  required
                />
              </div>
              <div className="mb-3 text-color">
                <label for="beneficiaryName" class="form-label">
                  <b>Beneficiary Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="beneficiaryName"
                  name="beneficiaryName"
                  onChange={handleUserInput}
                  value={addMoneyRequest.beneficiaryName}
                  required
                />
              </div>
              <div className="mb-3 text-color">
                <label for="accountNumber" class="form-label">
                  <b>Account Number</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="accountNumber"
                  name="accountNumber"
                  onChange={handleUserInput}
                  value={addMoneyRequest.accountNumber}
                  required
                />
              </div>

              <div className="mb-3 text-color">
                <label for="swiftCode" class="form-label">
                  <b>Swift Code</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="swiftCode"
                  name="swiftCode"
                  onChange={handleUserInput}
                  value={addMoneyRequest.swiftCode}
                  required
                />
              </div>

              <div className="mb-3 text-color">
                <label for="bankName" class="form-label">
                  <b>Bank Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="bankName"
                  name="bankName"
                  onChange={handleUserInput}
                  value={addMoneyRequest.bankName}
                  required
                />
              </div>

              <div className="mb-3 text-color">
                <label for="bankAddress" class="form-label">
                  <b>Bank Address</b>
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="bankAddress"
                  name="bankAddress"
                  onChange={handleUserInput}
                  value={addMoneyRequest.bankAddress}
                  required
                />
              </div>

              <div className="mb-3 text-color">
                <label for="purpose" class="form-label">
                  <b>Purpose</b>
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="purpose"
                  name="purpose"
                  onChange={handleUserInput}
                  value={addMoneyRequest.purpose}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn bg-color custom-bg-text"
                onClick={accountTransfer}
              >
                Transfer
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTransfer;
