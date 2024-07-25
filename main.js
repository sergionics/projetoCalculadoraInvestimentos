import { generateReturnsArray } from "./src/investmentGoals";
import { Chart } from "chart.js/auto";

const finalMoneyChart = document.getElementById("final-money-distribuition");
const progressionChart = document.getElementById("progression");

const form = document.getElementById("investment-form");
const resetButton = document.getElementById("reset-button");

let progressionChartRef = {};
let moneyChartRef = {};

function formatCurrency(value) {
  return value.toFixed(2);
}

function renderProgression(evt) {
  evt.preventDefault();
  if (document.querySelector(".error")) {
    return;
  }

  resetCharts();

  const startingAmount = Number(
    document.getElementById("starting-amount").value.replace(",", ".")
  );

  const additionalContribution = Number(
    document.getElementById("additional-contribution").value
  );

  const timeAmount = Number(document.getElementById("time-amount").value);
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const returnRate = Number(
    document.getElementById("return-rate").value.replace(",", ".")
  );
  const evaluationPeriod = document.getElementById("evaluation-period").value;

  const taxRate = Number(
    document.getElementById("tax-rate").value.replace(",", ".")
  );

  const returnsArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContribution,
    returnRate,
    evaluationPeriod
  );

  // montando gráfico 1
  const finalInvestmentObject = returnsArray[returnsArray.length - 1];

  const data = {
    labels: ["Total Investido", "Rendimento", "Imposto"],
    datasets: [
      {
        data: [
          formatCurrency(finalInvestmentObject.investedAmount),
          formatCurrency(
            finalInvestmentObject.totalInterestReturns * (1 - taxRate / 100)
          ),
          formatCurrency(
            finalInvestmentObject.totalInterestReturns * (taxRate / 100)
          ),
        ],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const configFinalMoneyChart = {
    type: "doughnut",
    data: data,
  };

  moneyChartRef = new Chart(finalMoneyChart, configFinalMoneyChart);

  const configProgressionBar = {
    type: "bar",
    data: {
      labels: returnsArray.map((investmentObject) =>
        formatCurrency(investmentObject.month)
      ),
      datasets: [
        {
          label: "Total Investido",
          data: returnsArray.map((investmentObject) =>
            formatCurrency(investmentObject.investedAmount)
          ),
          backgroundColor: "rgb(255, 99, 132)",
        },
        {
          label: "Retorno de investimento",
          data: returnsArray.map(
            (investmentObject) => investmentObject.interestReturns
          ),
          backgroundColor: "rgb(54, 162, 235)",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  };
  progressionChartRef = new Chart(progressionChart, configProgressionBar);
}

function validateInput(evt) {
  if (evt.target.value === "") {
    return;
  }

  const { parentElement } = evt.target; // usando destructioon
  const grandParentElement = evt.target.parentElement.parentElement;
  const inputValue = evt.target.value.replace(",", ".");

  if (
    (!parentElement.classList.contains("error") && isNaN(inputValue)) ||
    Number(inputValue) <= 0
  ) {
    //<p class="text-red-500"> Insira um valor numérico maior que 0</p>
    const errorTextElement = document.createElement("p");
    errorTextElement.classList.add("text-red-500");
    errorTextElement.innerText = "Insira uma valor numérico maior que 0";

    parentElement.classList.add("error");
    grandParentElement.appendChild(errorTextElement);
  } else if (
    parentElement.classList.contains("error") &&
    !isNaN(inputValue) &&
    Number(inputValue) > 0
  ) {
    parentElement.classList.remove("error");
    grandParentElement.querySelector("p").remove();
  }
}

for (const formElement of form) {
  if (formElement.tagName === "INPUT" && formElement.hasAttribute) {
    formElement.addEventListener("blur", validateInput);
  }
}

function clearForm() {
  form["starting-amount"].value = "";
  form["additional-contribution"].value = "";
  form["time-amount"].value = "";
  form["return-rate"].value = "";
  form["tax-rate"].value = "";

  resetCharts();

  const errorInputContainers = document.querySelectorAll(".error");
  for (const errorInputContainer of errorInputContainers) {
    errorInputContainer.classList.remove("error");
    errorInputContainer.parentElement.querySelector("p").remove();
  }
}

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function resetCharts() {
  if (!isObjectEmpty(progressionChartRef) && !isObjectEmpty(moneyChartRef)) {
    progressionChartRef.destroy();
    moneyChartRef.destroy();
  }
}

form.addEventListener("submit", renderProgression);
resetButton.addEventListener("click", clearForm);
