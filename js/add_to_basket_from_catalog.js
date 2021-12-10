'use strict'

let itemBox = document.querySelectorAll('.product-grid');       // блок каждого товара //количество товаров в корзине

// Получаем данные из LocalStorage
function getCardData(){
  return JSON.parse(sessionStorage.getItem('card'));
}
// Записываем данные в LocalStorage
function setCardData(o){
  sessionStorage.setItem('card', JSON.stringify(o));
  return false;
}
// Добавляем товар в корзину
function addToBasket(e)
{
  this.disabled = true; // блокируем кнопку на время операции с корзиной
  let cardData = getCardData() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
      parentBox = this.parentNode, // родительский элемент кнопки "Добавить в корзину"
      doubleParentBox = parentBox.parentNode,
      itemId = this.getAttribute('data-id'), // ID товара
      itemImg = doubleParentBox.querySelector('.image').innerHTML, //фото блюда
      itemTitle = parentBox.querySelector('.title span').innerHTML, // название блюда
      itemVolume = parentBox.querySelector('.dishVolume').innerHTML, //имя автора
      itemPrice = parentBox.querySelector('.price span').innerHTML; // стоимость товара
  
  if(cardData.hasOwnProperty(itemId))
  { // если такой товар уже в корзине, то добавляем +1 к его количеству
    cardData[itemId][3] += 1;
  } 
  else 
  { // если товара в корзине еще нет, то добавляем в объект
    cardData[itemId] = [itemImg, itemTitle, itemVolume, 1, itemPrice];
  }
  if(!setCardData(cardData))
  { // Обновляем данные в SessionStorage
    this.disabled = false; // разблокируем кнопку после обновления LS
  }
  count_in_basket.innerHTML++;
  sessionStorage.setItem('count_in_basket', count_in_basket.innerHTML);
 return false;
}

// Устанавливаем обработчик события на каждую кнопку "Добавить в корзину"
for(let i = 0; i < itemBox.length; i++)
{
  itemBox[i].querySelector('.add-to-cart').addEventListener('click', addToBasket);
}

if(sessionStorage.getItem('u_id') == 0) {
  for(let i = 0; i < itemBox.length; i++)
  {
    itemBox[i].querySelector('.add-to-cart').removeEventListener('click', addToBasket);
  }
}