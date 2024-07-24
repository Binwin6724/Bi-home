import React, { useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../css/ExpenseTracker.css";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const ExpenseTracker = () => {
  const [details, setDetails] = useState("");
  const [type, setType] = useState("debited");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("needs"); // New state for category
  const [expenses, setExpenses] = useState([]);
  const [salary, setSalary] = useState("");
  const [show, setShow] = useState(false);

  const printRef = useRef(null);

  const handlePrint = () => {
    const input = printRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("expenses.pdf");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(true);
    const newExpense = { details, type, amount: parseFloat(amount), category };
    setExpenses([...expenses, newExpense]);
    setDetails("");
    setType("debited");
    setAmount("");
    setCategory("needs"); // Reset category
  };

  const totalExpenses = expenses.reduce((total, expense) => {
    return expense.type === "debited"
      ? total - expense.amount
      : total + expense.amount;
  }, 0);

  const totalBalance = (parseFloat(salary) || 0) + totalExpenses;

  const categorySpending = expenses.reduce((totals, expense) => {
    if (expense.type === "debited") {
      if (totals[expense.category]) {
        totals[expense.category] += expense.amount;
      } else {
        totals[expense.category] = expense.amount;
      }
    }
    return totals;
  }, {});

  const needsSpending = categorySpending["needs"] || 0;
  const wantsSpending = categorySpending["wants"] || 0;
  const savingsSpending = categorySpending["savings"] || 0;

  const needsLimit = (parseFloat(salary) || 0) * 0.5;
  const wantsLimit = (parseFloat(salary) || 0) * 0.3;
  const savingsLimit = (parseFloat(salary) || 0) * 0.2;

  let spendingAdvice;
  if (parseInt(salary) === totalBalance) {
    spendingAdvice =
      "Wow! You just got your salary, add more details to track your expense";
  } else if (needsSpending > needsLimit) {
    spendingAdvice = "Warning: You're spending too much on needs!";
  } else if (wantsSpending > wantsLimit) {
    spendingAdvice = "Warning: You're spending too much on wants!";
  } else if (savingsSpending < savingsLimit) {
    spendingAdvice = "Warning: You're not saving enough!";
  } else {
    spendingAdvice = "Good job! Your spending and savings are on track.";
  }

  const chartData = {
    labels: ["Needs", "Wants", "Savings"],
    datasets: [
      {
        label: "Expenses",
        data: [needsSpending, wantsSpending, savingsSpending],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Red for needs
          "rgba(255, 206, 86, 0.6)", // Yellow for wants
          "rgba(75, 192, 192, 0.6)", // Green for savings
        ],
        datalabels: {
          anchor: "end",
          align: "end",
          formatter: (value) => `₹${value.toFixed(2)}`,
        },
      },
    ],
  };

  return (
    <div className="container" style={{ maxWidth: "100vw" }}>
      <h2>Expense Tracker</h2>
      <div className="layout-container">
        <div className="left-container">
          <div className="salary-container">
            <label>
              Salary:
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </label>
            <h3>Total Balance: ₹{totalBalance.toFixed(2)}</h3>
            <p>{spendingAdvice}</p>
            <form onSubmit={handleSubmit}>
              <div>
                <label>
                  Details:
                  <input
                    type="text"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Type:
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="debited">Debited</option>
                    <option value="credited">Credited</option>
                  </select>
                </label>
              </div>
              <div>
                <label>
                  Amount:
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Category:
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="needs">Needs</option>
                    <option value="wants">Wants</option>
                    <option value="savings">Savings</option>
                  </select>
                </label>
              </div>
              <button type="submit">Add Expense</button>
            </form>
          </div>
        </div>
        {show ? (
          <div className="right-container" ref={printRef}>
            <h3>Expenses:</h3>
            <ul>
              {expenses.map((expense, index) => (
                <li key={index}>
                  {expense.details} - {expense.type} - {expense.category} - ₹
                  {expense.amount.toFixed(2)}
                </li>
              ))}
            </ul>
            <div className="chart-container">
              <Bar
                data={chartData}
                options={{
                  plugins: {
                    datalabels: {
                      display: true,
                      color: "black",
                      font: {
                        weight: "bold",
                      },
                      formatter: (value) => `₹${value.toFixed(2)}`,
                    },
                  },
                }}
              />
            </div>
            <div className="suggestions-container">
              <h3>Current Budget Distribution</h3>
              <ul>
                <li>
                  Needs: ₹{needsSpending.toFixed(2)} (
                  {((needsSpending / salary) * 100).toFixed(2)}
                  %)
                </li>
                <li>
                  Wants: ₹{wantsSpending.toFixed(2)} (
                  {((wantsSpending / salary) * 100).toFixed(2)}
                  %)
                </li>
                <li>
                  Savings: ₹{savingsSpending.toFixed(2)} (
                  {((savingsSpending / salary) * 100).toFixed(2)}
                  %)
                </li>
              </ul>
              <h3>Recommended Budget Distribution</h3>
              <p>Based on your salary, here's the suggested distribution:</p>
              <ul>
                <li>Needs: ₹{needsLimit.toFixed(2)} (50% of salary)</li>
                <li>Wants: ₹{wantsLimit.toFixed(2)} (30% of salary)</li>
                <li>Savings: ₹{savingsLimit.toFixed(2)} (20% of salary)</li>
              </ul>
            </div>
          </div>
        ) : (
          console.log()
        )}
      </div>
      {show ? (
        <button style={{ backgroundColor: "blue" }} onClick={handlePrint}>
          Print Expenses
        </button>
      ) : (
        console.log()
      )}
    </div>
  );
};

export default ExpenseTracker;
