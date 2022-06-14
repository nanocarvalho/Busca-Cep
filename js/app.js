//Input section
const userInput = document.querySelector('[data-js="cep-input"]')
const userSubmit = document.querySelector('[data-js="user-submit"]')
//Result section
const cepResult = document.querySelector('[data-js="cep-result"]')
const ruaResult = document.querySelector('[data-js="rua-result"]')
const bairroResult = document.querySelector('[data-js="bairro-result"]')
const cidadeResult = document.querySelector('[data-js="cidade-result"]')
const estadoResult = document.querySelector('[data-js="estado-result"]')

const errorDisplay = document.querySelector('[data-js="error-message"]')

const cepSearch =  async () => {
    //clean the error message and the inputs
    errorDisplay.textContent = ''
    cleanResult()

    const cep = userInput.value

    try {
        const response = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`)
        const noErrors = errorHandle(response)

        if(noErrors) {
            const data = await response.json()
            cepShow(data)
        }

    } catch(error) {

        const errorElement = document.querySelector('.error')
        errorElement.classList.toggle('show')
        //Error messages
        const errorText = {
            400: {
                message: `O cep ${cep} foi digitado incorretamente, tente novamente. O formato comum é EX: 15000-123 ou 15000123!`
            },
            404: {
                message: `O cep ${cep} não foi encontrado!`
            },
            'Failed to fetch' : {
                message: 'Sem conexão com a internet'
            }
        }
    
        //Apply the match message to the error Display
        switch(error.message) {
            case '400':
                errorDisplay.textContent = errorText[400].message
                break
            case '404':
                errorDisplay.textContent = errorText[404].message
                break
                //I don't know if this is necessary, but, here we go
            case 'Failed to fetch':
                errorDisplay.textContent = errorText['Failed to fetch'].message
                break
        }
    }
}

//Check errors
const errorHandle = response => {
    if (!response.ok) {
        throw new Error(response.status)
   }
   return response
}

//Clear all results
const cleanResult = () => {
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
    cepResult.textContent = `CEP ${cepData}`
    ruaResult.textContent = ruaData
    bairroResult.textContent = `Bairro ${bairroData}`
    cidadeResult.textContent = `Cidade ${cidadeData}`
    estadoResult.textContent = `Estado ${estadoData}`
}

//Listeners
userSubmit.addEventListener('click', cepSearch)
