/*
 * Vanilla javascript just to expreriment.
 * Could be easily converted to jquery if needed.
*/

//Get modal element
var modal = document.getElementsByClassName('modal')[0];

//Get modal buttons
var modalBtnCancel = document.getElementById('btn-change-role-cancel');

//Listen for cancel click
modalBtnCancel.addEventListener('click', cancelModal);

//Lister for ouside click
window.addEventListener('click', clickOutside);

function openModal() {
    modal.style.display = 'block';
}

function cancelModal() {
     modal.style.display = 'none';
}

function clickOutside(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}
