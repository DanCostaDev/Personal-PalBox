'use strict'
// const fetchPal = (pal) => {
//     const APIResponse = fetch();
// }
function printPals(pal){
    console.log(pal)
}
// async function logPals() {
//     const response = await fetch("https://raw.githubusercontent.com/mlg404/palworld-paldex-api/main/src/pals.json");
//     const pals = await response.json();
//     // console.log(pals)
//     pals.forEach(printPals)
//   }
// logPals()
//console.log()
// var palsJson = fetch('https://raw.githubusercontent.com/mlg404/palworld-paldex-api/main/src/pals.json')
//     .then((response) => response.json())
//     .then((json) => console.log(json));

// Acesso ao Local Storage
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_pal')) ?? []
const setLocalStorage = (dbPal) => localStorage.setItem("db_pal", JSON.stringify(dbPal))

const openModalDelete = () => document.getElementById('modalDelete').classList.add('active')
const openModalCreateUpdate = () => document.getElementById('modalCreateUpdate').classList.add('active')

const closeModalDelete = () => {
    clearFields()
    document.getElementById('modalDelete').classList.remove('active')
}

const closeModalCreateUpdate = () => {
    clearFields()
    document.getElementById('modalCreateUpdate').classList.remove('active')
}

// -CRUD-------

// DELETE
const deletePal = (id) => {
    const dbPal = readPal()
    for (let index = 0; index < dbPal.length; index++) {
        let element = dbPal[index];
        if(element.id.includes(id)){
            dbPal.splice(index, 1)
            break
        }
    }
    setLocalStorage(dbPal)
}

// UPDATE
const updatePal = (pal) => {
    const dbPal = readPal()
    for (let index = 0; index < dbPal.length; index++) {
        let element = dbPal[index];
        if(element.id == pal.id){
            dbPal[index] = pal
            break
        }
    }

    setLocalStorage(dbPal)
}

// READ
const readPal = () => getLocalStorage()

// CREATE
const createPal = (pal) => {
    const dbPal = getLocalStorage()
    dbPal.push (pal)
    setLocalStorage(dbPal)
}

// VALIDATION
const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

// Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('palInput').innerText = "Pal"
    document.getElementById('palPortraitImage').setAttribute('src', '')
    document.getElementById('passive1Input').innerText = "Passive 1"
    document.getElementById('passive2Input').innerText = "Passive 2"
    document.getElementById('passive3Input').innerText = "Passive 3"
    document.getElementById('passive4Input').innerText = "Passive 4"
    document.getElementById('palGender').value = "Gender"
    document.documentElement.style.setProperty('--form-background-color', '#666')
}
// Cadastrar Pal

const savePal = () =>{
    let newPal = null
    let pal = null
    if(document.getElementById('palInput').dataset.index){
        pal = getPal(document.getElementById('palInput').dataset.index)
    }

    if(pal){
        if(isValidFields){
            newPal = {
                id: pal.id,
                palImage: document.getElementById('palPortraitImage').getAttribute('src'),
                palName: document.getElementById('palInput').innerText,
                palNickname: document.getElementById('palNickname').value,
                palGender: document.getElementById('palGender').value,
                passive1: document.getElementById('passive1Input').innerText,
                passive2: document.getElementById('passive2Input').innerText,
                passive3: document.getElementById('passive3Input').innerText,
                passive4: document.getElementById('passive4Input').innerText
            }
        }
    }
    else{
        if(isValidFields){
            newPal = {
                id: crypto.randomUUID(),
                palImage: document.getElementById('palPortraitImage').getAttribute('src'),
                palName: document.getElementById('palInput').innerText,
                palNickname: document.getElementById('palNickname').value,
                palGender: document.getElementById('palGender').value,
                passive1: document.getElementById('passive1Input').innerText,
                passive2: document.getElementById('passive2Input').innerText,
                passive3: document.getElementById('passive3Input').innerText,
                passive4: document.getElementById('passive4Input').innerText
            }
        }
    }

    if(newPal.passive1.includes("Passive")){
        newPal.passive1 = ""
    }
    
    if(newPal.passive2.includes("Passive")){
        newPal.passive2 = ""
    }
    
    if(newPal.passive3.includes("Passive")){
        newPal.passive3 = ""
    }
    
    if(newPal.passive4.includes("Passive")){
        newPal.passive4 = ""
    }
    
    if(newPal.palNickname == ""){
        newPal.palNickname = newPal.palName
    }

    if(pal){
        updatePal(newPal)
        updateTable()
        document.getElementById('palInput').dataset.index = null
        closeModalCreateUpdate()
    }
    else{
        createPal(newPal)
        updateTable()
        document.getElementById('palInput').dataset.index = null
        closeModalCreateUpdate()
    }
}

function getPal(id){
    const dbPal = readPal()
    for (let index = 0; index < dbPal.length; index++) {
        const element = dbPal[index];
        if(element.id){
            if(element.id.includes(id)){
                return element;
            }
        }
        
    }
    return null
}

function returnPal(element){
    element.id
}

// Criar linha na tabela
const createRow = (pal) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>
            <img src="${pal.palImage}" class="palPortrait"></img>
        </td>
        <td>${pal.palName}</td>
        <td>${pal.palNickname}</td>
        <td>${pal.palGender}</td>
        <td>${pal.passive1}</td>
        <td>${pal.passive2}</td>
        <td>${pal.passive3}</td>
        <td>${pal.passive4}</td>

        <td>
            <button type="button" class="button green" id="edit-${pal.id}">Editar</button>
            <button type="button" class="button red" id="delete-${pal.id}">Excluir</button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
    // newRow.setAttribute('class', 'row')
    // var table = document.getElementById("tablePal")
    // table.insertRow(newRow);

    
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbPal = readPal()
    clearTable()
    dbPal.forEach(createRow)
}

function clearDB(){
    let dbPal = readPal()
    dbPal=[]
    setLocalStorage(dbPal)
}

const fillFields = (pal) => {
    document.getElementById('palInput').innerText = pal.palName
    document.getElementById('palPortraitImage').src = pal.palImage
    document.getElementById('palNickname').value = pal.palNickname
    document.getElementById('palGender').value = pal.palGender
    document.getElementById('passive1Input').innerText = pal.passive1
    document.getElementById('passive2Input').innerText = pal.passive2
    document.getElementById('passive3Input').innerText = pal.passive3
    document.getElementById('passive4Input').innerText = pal.passive4
    document.getElementById('palInput').dataset.index = pal.id

}

const editPal = (id) => {
    const pal = getPal(id)
    fillFields(pal)
    openModalCreateUpdate()
}

const editDelete = (event) =>{
    if (event.target.type == 'button') {

        const [action, id] = event.target.id.split('-')

        if (action == 'edit') {
            editPal(id)
        } else {
            const client = getPal(id)
            let avisoDelete = document.querySelector('#deleteWarning')
            if(client.palName != client.palNickname){
                avisoDelete.textContent = `Deseja realmente excluir o pal ${client.palName} ${client.palNickname}`
            }
            else{
                avisoDelete.textContent = `Deseja realmente excluir o pal ${client.palName}`
            }
            
            openModalDelete()

        // APAGAR O REGISTRO
            document.getElementById('delete').addEventListener('click', () => {
                deletePal(id)
                updateTable()
                closeModalDelete()
            })
        }
    }
}

updateTable()

// Eventos
document.getElementById('registerPal').addEventListener('click', openModalCreateUpdate)

document.getElementById('modalCreateUpdateClose').addEventListener('click', closeModalCreateUpdate)

// Modal apagar
document.getElementById('modalDeleteClose').addEventListener('click', closeModalDelete)

document.getElementById('save').addEventListener('click', savePal)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)
document.getElementById('cancel').addEventListener('click', closeModalCreateUpdate)


// Dropdown
function showDropdown(id) {
    // Array.from(document.getElementsByClassName("dropbtn")).forEach(function(element, idex, Array){
    //     if(window.getComputedStyle(element).display === "show"){
    //         element.classList.toggle("show");
    //     }
    // });
    document.getElementById(id).classList.toggle("show");
}

function createList(){
    var data = ["Ram", "Shyam", "Sita", "Gita"];
    var list = document.createElement("ul")
    list.setAttribute('id', 'passivesList')
    list = document.getElementById("passivesList")
    data.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item;
        list.appendChild(li);
        li.onclick = function selectOption(){
            var input = document.getElementsByClassName('dropbtn');
            input.innerText = li.innerText
            document.getElementById("passiveDropdown").classList.toggle("show");
        }
    });
}


function getPassivesList(){
    return document.getElementById("passivesList");
}

function filterFunction(inputSearchId, dropdownId) {
    var input, filter, ul, div, a, i;
    input = document.getElementById(inputSearchId);
    filter = input.value.toUpperCase();
    var dropdown = document.getElementById(dropdownId);
    div = dropdown.getElementsByTagName("div");
    for (i = 0; i < div.length; i++) {
      var txtValue = div[i].textContent || div[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        div[i].style.display = "";
      } else {
        div[i].style.display = "none";
      }
    }
}

// function selectOption(id, e){
//     e = e || window.event;
//     var src = e.target || e.srcElement;
//     input = document.getElementById(id);
//     input.textContent = src.innerText
//     document.getElementById("passiveDropdown").classList.toggle("show");
// }
