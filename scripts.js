// Configuração das moedas para conversão.
const currencies = {
    USD: { rate: 5.22, symbol: "US$" },
    EUR: { rate: 6.21, symbol: "€" },
    GBP: { rate: 7.15, symbol: "£" },
  }
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// Manipulação de dados no input amount para receber somente números.
amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

// Captação de Evento de submit (enviar) formulário.
form.onsubmit = (event) => {
    event.preventDefault()
  
    const selectedCurrency = currencies[currency.value]
  
    if (!selectedCurrency || !amount.value) {
      showError("Preencha o valor e selecione a moeda.")
      return
    }
  
    convertCurrency(
      amount.value,
      selectedCurrency.rate,
      selectedCurrency.symbol
    )
  }

//Função de conversão e moeda.
function convertCurrency(amount, rate, symbol) {
    try {
        const total = Number(amount) * rate

        if (isNaN(total)) {
            showError("Valor inválido para conversão.")
            return
        }

        description.textContent = `${symbol}1 = ${formatCurrencyBRL(rate)}`
        result.textContent = `${formatCurrencyBRL(total).replace("R$", "")} Reais`

        footer.classList.add("show-result")
    }
    catch (error) {
        footer.classList.remove("show-result")
        console.error(error)
        showError("Erro ao realizar a conversão.")
    }
}

// Converte para número para utilizar o toLocaleString para formatar no padrão BRL (R$).
function formatCurrencyBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}

// Exibe o erro dentro do próprio layout.
function showError(message) {
    description.textContent = ""
    result.textContent = message
    footer.classList.add("show-result")
}