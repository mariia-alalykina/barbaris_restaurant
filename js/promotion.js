let $delets = document.querySelectorAll('.post-preview .delete_btn');

function removePromotion(e) {
    if (confirm('Ви дійсно хочете видалити цю новину?')) {
    let $mainParent = this.parentNode.parentNode.parentNode;
     $mainParent.remove();
    }
    
}

function showAddForm() {
    let $proms = document.querySelectorAll('.promotion');
    for(let i = 0; i < $proms.length; i++) {
        $proms[i].classList.add('hide');
    }
    
    document.getElementById('proms').innerHTML = "<div class=\"addPromo\"><form><img src = \"img/info.png\" title=\"Заголовок потрібно вказати лише українськими літерами\"><label for=\"promname\">Заголовок акції</label><input type=\"text\" id=\"promname\" name=\"promname\"placeholder=\"Уведіть заголовок акції\"><img src = \"img/info.png\" title=\"Вкажіть адресу зображення у наступному форматі: img/promotion/X.jpg, де X - назва зображення. Розмір зображення повинен бути 1920х1080 пікселів/дюйм.\"><label for=\"adrImg\">Адреса зображення</label><input type=\"text\" id=\"adrImg\" name=\"adrImg\" placeholder=\"img/promotions/X.jpg\"><img src = \"img/info.png\" title=\"Текст акції потрібно вказати лише українськими літерами\"><label for=\"promtext\">Текст акції</label><input type=\"text\" id=\"promtext\" name=\"promtext\" placeholder=\"Уведіть основний текст акції\"><input type=\"submit\" onclick=\"return addPromo()\" value=\"Додати\"></form></div>";
}

if(sessionStorage.getItem('u_id') == 0) {
    for(let i = 0; i < $delets.length; i++) {
        $delets[i].parentNode.classList.remove('hide');
        $delets[i].addEventListener('click', removePromotion);
    }
    document.querySelector('body button.hide').classList.remove('hide');
    document.querySelector('body button.add_promotion').addEventListener('click', showAddForm);
}