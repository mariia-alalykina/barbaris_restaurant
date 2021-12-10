'use strict'

function showMenu()
{
    document.getElementById(" dropMenu").classList.toggle("show");
}

window.onclick = function(e)
{
    if(!e.target.matches('.menuButton'))
    {
        let drop_menu = document.getElementById("dropMenu");
        if (drop_menu.classList.contains('show'))
        {
            drop_menu.classList.remove('show');
            drop_menu.classList.add('hide');
        }
    }
}

if (sessionStorage.getItem('is_authorit'))
{
    if(sessionStorage.getItem('u_id') == 0) {
        document.querySelector('#img_basket').classList.add('hide');
        document.querySelector('.reg_auth a').innerHTML = 'Кабінет адміністратора'
        
    }
    else if (sessionStorage.getItem('u_id') == 1) {
        document.querySelector('.reg_auth a').innerHTML = 'Мій кабінет'
        /* document.querySelector('.nav').lastElementChild.innerHTML = "\n                        <a href=\"/login.html\">Мій кабінет</a>\n                    ";
        let block = document.createElement('div');
        block.id = 'log_out';
        let logout = document.createElement('a');
        logout.innerText = 'Вийти';
        logout.addEventListener('click', log_out);
        block.appendChild(logout);
        document.querySelector('nav').appendChild(block); */

    }
}

let goods_in_basket = 0,
count_in_basket = document.querySelector('#img_basket span');

goods_in_basket = sessionStorage.getItem('count_in_basket');
count_in_basket.innerText = goods_in_basket;

