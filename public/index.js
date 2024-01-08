
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
    tabledata.forEach(rawData => {
        console.log(rawData)
        const row = document.createElement('tr')

        for (const key of headerData) {
            const cell = document.createElement('td')
            cell.textContent = rawData[key]
            row.appendChild(cell)
        }
        const deleteBtn = document.createElement('td')
        console.log(rawData['_id'])
        deleteBtn.innerHTML = `<button type='button' class='bg-gray-500 delete-btn' data-id=${rawData['_id']} >delete</button>`;
        row.appendChild(deleteBtn)
        myTableBody.appendChild(row)
    })
}


