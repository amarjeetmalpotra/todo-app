let total = 0,
	idCounter = 0

const createItem = (itemNumber, itemValue) => {
	const item = document.createElement(`div`)
	item.setAttribute('class', 'input-group')
	item.setAttribute('id', `item-${itemNumber}`)
	item.innerHTML = `<input
							type="text"
							class="item-box"
							id="box-item-${itemNumber}"
							placeholder="Item name"
							value="${itemValue}"
							disabled
						/>
						<div class="item-btn" id="edit">Edit</div>
						<div class="item-btn del-btn" id="delete">Done</div>`

	document.querySelector('.list').appendChild(item)
	total++
}

document.addEventListener('click', (e) => {
	if (e.target && e.target.id == 'item-add') {
		// Add item
		const itemName = document.getElementById('item-box')
		if (itemName.value === '') {
			itemName.style.borderColor = '#f00000'
			setTimeout(() => {
				itemName.removeAttribute('style')
			}, 2000)
		} else {
			createItem(++idCounter, itemName.value)
			itemName.value = ''
			// Set total
			document.getElementById(
				'todo'
			).innerHTML = `Todo <span class="blue">${total}</span>`
		}
	} else if (e.target && e.target.id == 'edit') {
		// Edit item
		const id = e.target.parentElement.getAttribute('id')
		if (e.target.innerHTML == 'Save') {
			e.target.innerHTML = 'Edit'
			e.target.removeAttribute('style')
			document.getElementById(`box-${id}`).setAttribute('disabled', '')
		} else {
			e.target.innerHTML = 'Save'
			e.target.style.borderColor = '#00cc00'
			document.getElementById(`box-${id}`).removeAttribute('disabled')
			document.getElementById(`box-${id}`).focus()
		}
	} else if (e.target && e.target.id == 'delete') {
		// Delete item
		e.target.parentElement.remove()
		total--

		// Update total
		if (total == 0) document.getElementById('todo').innerHTML = 'Todo'
		else
			document.getElementById(
				'todo'
			).innerHTML = `Todo <span class="blue">${total}</span>`
	}
})
