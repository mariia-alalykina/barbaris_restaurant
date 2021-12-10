let bookingData = JSON.parse(localStorage.getItem('bookings'));

function createElement(tag, className) {
  const $tag = document.createElement(tag);
  if (className) {
      $tag.classList.add(className);
  }  
  return $tag;
}

let $tbody = document.querySelector('#adminBooking tbody');

if(bookingData !== null) {
  for(let items in bookingData) {
      let $tr = createElement('tr');

      let $tdNumber = createElement('td');
      $tdNumber.innerText = (parseInt(items)+1).toString();
      $tr.appendChild($tdNumber);

      let $tdName = createElement('td');
      $tdName.innerText = bookingData[items][0];
      $tr.appendChild($tdName);

      let $tdPhone = createElement('td');
      $tdPhone.innerText = bookingData[items][1];
      $tr.appendChild($tdPhone);

      let $tdTable = createElement('td');
      $tdTable.innerText = bookingData[items][2];
      $tr.appendChild($tdTable);

      let $tdDate = createElement('td');
      $tdDate.innerText = bookingData[items][3];
      $tr.appendChild($tdDate);

      let $tdTime = createElement('td');
      $tdTime.innerText = bookingData[items][4];
      $tr.appendChild($tdTime);

      let $tdDelete = createElement('td');
      let $deleteBtn = createElement('span', 'delete_btn');
      $deleteBtn.setAttribute('data-id', (parseInt(items)+1).toString());
      $tdDelete.appendChild($deleteBtn);
      $tr.appendChild($tdDelete);

      $tbody.appendChild($tr);
  }


}
else {
  $tbody.innerText = "Наразі бронювання відсутні!";
}

function removeFromBookings()
{
    for (let item in bookingData)
    {
        if(item == parseInt(this.getAttribute('data-id')) - 1)
        {
          let numOfBookings = localStorage.getItem('numOfBookings');
          numOfBookings = parseInt(numOfBookings) - 1;
          localStorage.setItem('numOfBookings', numOfBookings.toString());
          if (localStorage.getItem('numOfBookings') == 0) {
            localStorage.removeItem('bookings');
            window.location.reload();
            return;
          }
          delete bookingData[item];          
        }
    }    
    localStorage.setItem('bookings', JSON.stringify(bookingData));
    
    window.location.reload();
}

let itemBox = document.querySelectorAll('.delete_btn');
//добавляем обработчики ко всем кнопкам удалить
for(let i = 0; i < itemBox.length; i++)
{
    itemBox[i].addEventListener('click', removeFromBookings);
}