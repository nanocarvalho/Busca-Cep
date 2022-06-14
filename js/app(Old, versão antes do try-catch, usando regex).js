//Input section
const userInput = document.querySelector('[data-js="cep-input"]')
const userSubmit = document.querySelector('[data-js="user-submit"]')
//Result section
const cepResult = document.querySelector('[data-js="cep-result"]')
const ruaResult = document.querySelector('[data-js="rua-result"]')
const bairroResult = document.querySelector('[data-js="bairro-result"]')
const cidadeResult = document.querySelector('[data-js="cidade-result"]')
const estadoResult = document.querySelector('[data-js="estado-result"]')
//Error section
const errorMessage = document.querySelector('[data-js="error-message"]')


const cepSearch =  async () => {
    //clean the error and the inputs
    errorMessage.textContent = ''
    cleanResult()

    const cep = userInput.value

    //just for now, to prevent execution
    if(cep === '') {
        return
    }

    //ainda não compreendo regex direito, mas dessa forma eu sei que consigo rejeitar e não rodar a api caso o input não seja número
    //Ou caso o número tenha um - pra deixar passar também
    //Curioso existir OR no regex, demorei pra achar esse treco e fazer um que cheque o que eu quero
    const checkIfIsValid = /^[0-9]{5}-[0-9]{3}$|^[0-9]{8}$/
    if (!cep.match(checkIfIsValid)) {
        errorMessage.textContent = `O cep ${cep} foi digitado incorretamente, tente novamente. O formato comum é EX: 15000-123 ou 15000123!`
        return
    }

    const response = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`)
    const data = await response.json()

    if(data.status === 404) {
        errorMessage.textContent = `O cep ${cep} não foi encontrado!`
        return
    }
    cepShow(data)
 
}

const cleanResult = () => {
    //Clear all results
    const inputs = document.querySelectorAll('.result > p')
    inputs.forEach(input => {
        input.innerHTML = ''
    })

}

const cepShow = data => {
    //Get the data
    const cepData = data.cep
    const ruaData = data.address
    const bairroData = data.district
    const cidadeData = data.city
    const estadoData = data.state
    
    //Inject into DOM
    cepResult.textContent = cepData
    ruaResult.textContent = ruaData
    bairroResult.textContent = bairroData
    cidadeResult.textContent = cidadeData
    estadoResult.textContent = estadoData

}

userSubmit.addEventListener('click', cepSearch)
