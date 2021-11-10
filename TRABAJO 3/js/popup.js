const openPopupButton = document.querySelectorAll('[data-popup-target]')
const closePopupButton = document.querySelectorAll('[data-close-button]')

openPopupButton.forEach(button => {
    button.addEventListener('click', () => {
        const popup = document.querySelector(button.dataset.popupTarget)
        openPopup(popup)
    })
})
closePopupButton.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup')
        // const popup2 = button.closest('.popup2')
        closePopup(popup)
        // closePopup(popup2)
    })
})


function openPopup(popup) {
    if (popup == null) return
    popup.classList.add('active')
}

function closePopup(popup) {
    if (popup == null) return
    popup.classList.remove('active')
}
