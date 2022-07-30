//Todos meus campos

const nome = document.getElementById('nome')
const email = document.getElementById('email')
const celular = document.getElementById('celular')
const cidade = document.getElementById('cidade')

const getLocalStorage = () => JSON.parse(localStorage.getItem("db_client")) ?? []
const setLocalStorage = (dbClient) =>  localStorage.setItem("db_client", JSON.stringify(dbClient))

const daleteClient = (id) => {
    const dbClient = getLocalStorage()
    dbClient.splice(id, 1)
    setLocalStorage(dbClient)
}

const updateClient = (id, client) => {
    const dbClient = getLocalStorage()
    dbClient[id] = client
    setLocalStorage(dbClient)
}

const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push (client)
    setLocalStorage(dbClient)
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')

    fields.forEach(field => field.value = '')
}

const isValidFields = () => {
    if(nome.value.length <= 4){
        nome.classList.add('error')
    }else{
        return document.getElementById('form').reportValidity()
    }   
}

const saveClient = () => {
    if(isValidFields()){
        const client = {
            nome: nome.value,
            email: email.value,
            celular: celular.value,
            cidade: cidade.value
        }
        createClient(client)
        modal.classList.remove('active')
        updateTable()
        clearFields()
    }
}

const newRow = (client) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" id="edit" class="button green">editar</button>
            <button type="button" id="delete" class="button red">excluir</button>
        </td>
    `
    document.querySelector('#tableClients>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClients>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = getLocalStorage()
    dbClient.forEach(newRow)
}

const deleteButton = document.querySelector('#delete')

const editDelete = (e) => {
    if(e.target.type == 'button'){
        console.log(e.target.type)
    }
}

updateTable()

const modal = document.getElementById('modal')


const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
    clearFields()
} 

const openModal = () => {
    document.getElementById('modal').classList.add('active')
}

document.getElementById('modalClose')
.addEventListener('click', closeModal)

document.getElementById('singUpClients')
.addEventListener('click', openModal)

document.getElementById('save')
.addEventListener('click', saveClient)

document.querySelector('#tableClients>tbody')
.addEventListener('click', editDelete)