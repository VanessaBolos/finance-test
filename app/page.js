"use client";

import { useState, useContext, useEffect, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, DoughnutController } from "chart.js";
import { financeContext } from "@/lib/store/finance-context";
import { authContext } from "@/lib/store/auth-context";
import { currencyFormatter } from "@/lib/utils";
import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";
import AddIncomeModal from "@/components/modals/AddIncomeModal";
import AddExpensesModal from "@/components/modals/AddExpensesModal";
import SignIn from "@/components/SignIn";

ChartJS.register(
  ArcElement, Tooltip, Legend, DoughnutController
);

export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  const [balance, setBalance] = useState(0);

  const { expenses, income } = useContext(financeContext);
  const { user } = useContext(authContext);

  const chartInstanceRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const newBalance =
      income.reduce((total, i) => total + i.amount, 0) -
      expenses.reduce((total, e) => total + e.total, 0);

    setBalance(newBalance);

    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstanceRef.current = new ChartJS(ctx, {
        type: "doughnut",
        data: {
          labels: expenses.map((expense) => expense.title),
          datasets: [
            {
              data: expenses.map((expense) => expense.total),
              backgroundColor: expenses.map((expense) => expense.color),
              borderColor: ["#18181b"],
              borderWidth: 5,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                font: {
                  size: 12
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const value = context.raw;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${currencyFormatter(value)} (${percentage}%)`;
                }
              }
            }
          },
          cutout: "60%"
        }
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [expenses, income]);
  if (!user) {
    return <SignIn />;
  }

  return (
    <>
    {/* Add Income Modal */}
      <AddIncomeModal show={showAddIncomeModal} onClose={setShowAddIncomeModal} />
     {/* Add Expenses Modal */}  
      <AddExpensesModal show={showAddExpenseModal} onClose={setShowAddExpenseModal} />

      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button onClick={() => setShowAddExpenseModal(true)} className="btn btn-primary">
            + Expenses
          </button>
          <button onClick={() => setShowAddIncomeModal(true)} className="btn btn-primary-outline">
            + Income
          </button>
        </section>

        {/* Expenses */}
        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {expenses.map((expense) => {
              return <ExpenseCategoryItem key={expense.id} expense={expense} />;
              })}
          </div>
        </section>

        <section className="py-6">
          <a id="stats" />
          <h3 className="text-2xl">Stats</h3>
          <div className="w-full max-w-md mx-auto">
            <canvas ref={chartRef} />
          </div>
        </section>
      </main>
    </>
  );
}