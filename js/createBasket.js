'use strict'

let d = document,
    $cardCont = d.getElementById('basket'),    // блок вывода данных корзины
    $count_in_basket = d.querySelector('#img_basket span'); 
// Функция кроссбраузерной установки обработчика событий
function addEvent(elem, type, handler)
{
  if(elem.addEventListener)
  {
    elem.addEventListener(type, handler, false);
  } 
  else 
  {
    elem.attachEvent('on' + type, function() { handler.call( elem ); } );
  }
  return false;
}
// Получаем данные из LocalStorage
function getCardData(){
  return JSON.parse(sessionStorage.getItem('card'));
}

function setCardData(o){
  sessionStorage.setItem('card', JSON.stringify(o));
  return false;
}

function createElement(tag, className) {
  const $tag = document.createElement(tag);
  if (className) {
      $tag.classList.add(className);
  }  
  return $tag;
}

// Открываем корзину со списком добавленных товаров
let cardData = getCardData(), // вытаскиваем все данные корзины
      totalCost = 0;

let $basketHead = createElement('div', 'basket_head');
$basketHead.innerText = 'Кошик';
$cardCont.appendChild($basketHead);

  // если что-то в корзине уже есть, начинаем формировать данные для вывода
  if(cardData !== null)
  {
      
        for(let items in cardData)
        {
          let $item = createElement('div', 'item');
          let $buttonDel = createElement('div', 'button_del');
          let $deleteBtn = createElement('span', 'delete_btn');
          $deleteBtn.setAttribute('data-id', items);
          $buttonDel.appendChild($deleteBtn);
          $item.appendChild($buttonDel);

          let $basketImage = createElement('div', 'basket_image');
          $basketImage.innerHTML = cardData[items][0];
          $item.appendChild($basketImage);

          let $description = createElement('div', 'description');
          let $dishName = createElement('span');
          $dishName.innerText = cardData[items][1];
          let $dishVolume = createElement('span');
          $dishVolume.innerText = cardData[items][2];
          $description.appendChild($dishName);
          $description.appendChild($dishVolume);
          $item.appendChild($description);

          let $quantity = createElement('div', 'quantity');
          let $inQuantity = createElement('p');
          $inQuantity.innerHTML = '<span>' + cardData[items][3] + '</span> шт.';
          $quantity.appendChild($inQuantity);
          $item.appendChild($quantity);

          let $totalPrice = createElement('div', 'total_price');
          $totalPrice.innerHTML = '<span>' + (cardData[items][4] * cardData[items][3]).toFixed(2) + '</span> грн.';
          $item.appendChild($totalPrice);

          $cardCont.appendChild($item);

          totalCost += cardData[items][4] * cardData[items][3];
        }

        sessionStorage.setItem('total_cost', totalCost);
        let $totalCost = createElement('div');
        $totalCost.id = 'total_cost';
        $totalCost.innerHTML = '<p>Очистити кошик</p><p>Разом: <span>' + totalCost.toFixed(2) + '</span> грн.</p>';
        $cardCont.appendChild($totalCost);

        let $btnSubmit = createElement('button');
        $btnSubmit.setAttribute('type', 'submit');
        $btnSubmit.id = 'make_order';
        $btnSubmit.innerText = 'Оформити замовлення';
        $cardCont.appendChild($btnSubmit);
   }
   else 
   {
    // если в корзине пусто, то сигнализируем об этом
    $cardCont.innerHTML = '<div class="basket_head">Кошик</div><div style = "margin: 10px;">Кошик порожній!</div>';
   }

//удалить из корзины
function removeFromBasket()
{
    //let $dishName = d.querySelector('#basket .description span:first-child').innerText;
    for (let item in cardData)
    {
        if(item == this.getAttribute('data-id'))
        {
          let itemBlock = this.parentNode.parentNode;
          count_in_basket.innerHTML -= parseInt(itemBlock.querySelector('.quantity span').innerText);
          sessionStorage.setItem('count_in_basket', count_in_basket.innerText);
          if (sessionStorage.getItem('count_in_basket') == 0) {
            sessionStorage.removeItem('card');
            window.location.reload();
            return;
          }
          delete cardData[item];          
        }
    }    
    setCardData(cardData);
    
    window.location.reload();
}

function createOrderForm()
{
  document.querySelector('.basket_head').classList.add('hide');
  let items = document.querySelectorAll('.item');
  for (let i = 0; i < items.length; i++) {
    items[i].classList.add('hide');
  }
  document.querySelector('#total_cost').classList.add('hide');
  document.querySelector('#make_order').classList.add('hide');

  document.querySelector('.order').classList.remove('hide');
}

//очистить корзину
if(d.querySelector('#total_cost p:first-child'))
{
  addEvent(d.querySelector('#total_cost p:first-child'), 'click', function(e) 
  {
    sessionStorage.removeItem('card');
    sessionStorage.setItem('count_in_basket', 0);
    window.location.reload();
  });
}

//оформить заказ
if (d.getElementById('make_order'))
{
  d.getElementById('make_order').addEventListener('click', createOrderForm);
}

let itemBox = d.querySelectorAll('.delete_btn');
//добавляем обработчики ко всем кнопкам удалить
for(let i = 0; i < itemBox.length; i++)
{
  addEvent(itemBox[i], 'click', removeFromBasket);
}