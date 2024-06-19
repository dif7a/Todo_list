const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
console.log(itemsArray);

document.querySelector('.btn').addEventListener("click",() => {
    const item = document.querySelector('#item')
    createItem(item)
})

function createItem(item){
itemsArray.push(item.value)
localStorage.setItem('items', JSON.stringify(itemsArray))
location.reload()
}

function displayItem(){
    let items = ""
    for(let i=0; i<itemsArray.length;i++){
        items += `<div class="item">
        <div class="input-controller">
            <textarea disabled>${itemsArray[i]}</textarea>
            <div class="edit-controller">
                <i class="fa-regular fa-edit edit_btn"></i>
                <i class="fa-regular fa-trash-can delete_btn"></i>
            </div>
        </div>
        <div class="update-controller">
            <button class="save_btn">Save</button>
            <button class="cancel_btn">Cancel</button>
        </div>
    </div>`
    }
document.querySelector('.todo-list').innerHTML = items
activedeletelistner()
activeeditlistener()
activesavelistner()
activecancellistner()
}

function activedeletelistner(){
    let deletebtn = document.querySelectorAll('.delete_btn')
     deletebtn.forEach((db,i) =>{
        db.addEventListener('click', () => {deleteItem(i)})
     })
}

function deleteItem(i){
itemsArray.splice(i,1)
localStorage.setItem('items', JSON.stringify(itemsArray))
location.reload()
}

function activeeditlistener(){
    let editbtn = document.querySelectorAll('.edit_btn')
    const updatecontroller = document.querySelectorAll('.update-controller')
    const inputcontroller = document.querySelectorAll('.input-controller textarea')
    editbtn.forEach((eb,i) => {
        eb.addEventListener('click', () => {
            updatecontroller[i].style.display = 'block'
        inputcontroller[i].disabled = false
    })
        })  
}

function activesavelistner(){
    const savebtn = document.querySelectorAll('.save_btn')
    const inputcontroller = document.querySelectorAll('.input-controller textarea') 
    savebtn.forEach((sb,i) => {
        sb.addEventListener('click',() => {
            updateItem(inputcontroller[i].value,i)
        })
    })
}

function updateItem(text,i){
    itemsArray[i] = text
    localStorage.setItem("items",JSON.stringify(itemsArray))
    location.reload()
}

function activecancellistner(){
    const cancelbtn = document.querySelectorAll('.cancel_btn')
    const updatecontroller = document.querySelectorAll('.update-controller')
    const inputcontroller = document.querySelectorAll('.input-controller textarea')
    cancelbtn.forEach((cb,i) => {
        cb.addEventListener('click', () => {
           updatecontroller[i].style.display = 'none' 
           inputcontroller[i].disabled = true
           inputcontroller[i].style.border = "none"
        })
    })
}

const d = new Date();
document.getElementById("date").innerHTML = d.toString().split(' ').splice(1,3).join(' ');

window.onload = function(){
    displayItem()
}
