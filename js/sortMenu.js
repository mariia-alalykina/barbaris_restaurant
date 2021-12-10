'use strict'

let $delets = document.querySelectorAll('.product-grid .delete_btn');
 // Получить кнопку, которая открывает модальный
 let btn = document.querySelector(".add_dish");
 
function removeDish(e) {
    if (confirm('Ви дійсно хочете видалити цю страву?')) {
    let $mainParent = this.parentNode.parentNode;
     $mainParent.remove();
    }
    
}

    function getSorted(isReverse) {
        let section = document.querySelector('body > .container .row');
        let products = document.querySelector('.product-content .price span').parentNode.parentNode.parentNode.parentNode;
        let prices = document.querySelectorAll('.product-content .price span');

        let sorted = [...prices].sort(function(a, b) {
            if(isReverse) {
                return b.innerHTML - a.innerHTML;
            } else {
                return a.innerHTML - b.innerHTML;
            }
        });

        section.innerHTML = "";

        for(let item of sorted) {
            section.appendChild(item.parentNode.parentNode.parentNode.parentNode);
        }
    }

function showAddForm() {
    // Получить модальный
    let modal = document.getElementById("myModal");
    modal.style.display = "block";

    // Получить элемент <span>, который закрывает модальный
    let span = document.querySelector(".close_btn");

    // Когда пользователь нажимает на <span> (x), закройте модальное окно
    span.onclick = function() {
        modal.style.display = "none";
        }

    // Когда пользователь щелкает в любом месте за пределами модального, закройте его
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    } 
}


    if(sessionStorage.getItem('u_id') == 0) {
        for(let i = 0; i < $delets.length; i++) {
            $delets[i].classList.remove('hide');
            $delets[i].addEventListener('click', removeDish);
        }
        document.querySelector('body button.add_dish').classList.remove('hide');
        document.querySelector('body button.add_dish').addEventListener('click', showAddForm);
    }