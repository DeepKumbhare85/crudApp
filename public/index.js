
let userData
const headerData = ['_id', 'name', 'age']
const fetchUserData = async () => {
    const response = await fetch('http://localhost:3000/getusers')
    userData = await response.json()

    displayTable(userData)
    console.log(userData)
}

fetchUserData()


const displayTable = (tabledata) => {
    const myTableBody = document.querySelector('.table-body')
    let tableHtml = ``;
    tabledata.forEach(rawData => {
        
        tableHtml += `
            <tr>
                <td>${rawData['_id']}</td>
                <td>${rawData['name']}</td>
                <td>${rawData['age']}</td>
                <td> 
                    <button type='button' class='bg-gray-500' onclick="deleteItem('${rawData['_id']}')">delete</button>
                    <button type='button' class='bg-red-500' onclick="updateItem(this)">Update</button>
                </td>
            </tr>
        `
    })

    myTableBody.innerHTML = tableHtml
}

const deleteItem = async (id) => {
    if(confirm('Are you sure you want to delete')){ 
        const response = await fetch(`http://localhost:3000/deleteUser/${id}`, {
            method: 'DELETE',
        })

        fetchUserData()
    }
    else{
        alert('You cancelled delete operation')
    }
}

const handleSubmit = async () => {

    const username = document.querySelector('#user')
    const age = document.querySelector('#age')

    const response = await fetch('http://localhost:3000/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: username.value,
            age: age.value
        })
    })
}

const updateItem = async (button) => {

    const rowIndex = button.parentNode.parentNode.rowIndex
    
    const myTable = document.querySelector('.user-table')
    console.log(myTable.rows[rowIndex].cells[1].innerHTML)

}