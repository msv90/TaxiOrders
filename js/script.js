$(document).ready(function(){

  // List of orders
  renderOrdersList();

  // Single order
  $("body").on('click', '.go-to-single-order', function(){

    orderId = $(this).attr('id');

    renderOrderSingle(orderId);

  });

  // Back to single order
  $("body").on('click', '#back-to-orders-list', function(){
    renderOrdersList();
  });

  // List of orders: function
  function renderOrdersList(){
    $('#content').empty();
    $('#content').html('<div class="row"></div>');

    $.getJSON('data/orders.json', function(data){

      $.each(data, function(key, value){
        var orderItem = '<div class="col-12 col-lg-6">';
        orderItem += '<div class="order-item">';
        orderItem += '<p><a class="go-to-single-order" id="' + value.id + '">Заказ №' + value.id + '</a></p>';
        orderItem += '<p><span class="bold">От:</span> ' + value.startAddress.city + ' ' + value.startAddress.address + '</p>';
        orderItem += '<p><span class="bold">До:</span> ' + value.endAddress.city + ' ' + value.endAddress.address + '</p>';
        orderItem += '<p class="price">' + value.price.amount/100 + ' ' + value.price.currency + '</p>';
        orderItem += '<p class="time">' + value.orderTime.slice(0, 10) + '<br>' + value.orderTime.slice(11, 19) + '</p>';
        orderItem += '</div>';
        orderItem += '</div>';

        $('#content .row').append(orderItem);
      });

    });
  }

  // Single order: function
  function renderOrderSingle(orderId){
    $('#content').empty();

    $.getJSON('data/orders.json', function(data){

      $.each(data, function(key, value){
        if(value.id == orderId){

          var orderSingle = '<div class="row">';
          orderSingle += '<div class="col-12" id="back-to-orders-list"><i class="fas fa-arrow-left"></i></div>';
          orderSingle += '</div>';
          orderSingle += '<div class="row">';
          orderSingle += '<div class="col-12">';
          orderSingle += '<h1>Заказ №' + value.id + '</h1>';
          orderSingle += '</div>';
          orderSingle += '</div>';
          orderSingle += '<div class="order-single row">';
          orderSingle += '<div class="col-12 col-lg-6">';
          orderSingle += '<p><span class="bold">От:</span> ' + value.startAddress.city + ' ' + value.startAddress.address + '</p>';
          orderSingle += '<p><span class="bold">До:</span> ' + value.endAddress.city + ' ' + value.endAddress.address + '</p>';
          orderSingle += '<p><span class="bold">Цена:</span> ' + value.price.amount/100 + ' ' + value.price.currency + '</p>';
          orderSingle += '<p><span class="bold">Время заказа:</span> ' + value.orderTime.slice(0, 10) + value.orderTime.slice(11, 19) + '</p>';
          orderSingle += '</div>';
          orderSingle += '<div class="col-12 col-lg-6">';
          orderSingle += '<p><span class="bold">Водитель:</span> ' + value.vehicle.driverName + '</p>';
          orderSingle += '<p><span class="bold">Автомобиль:</span> ' + value.vehicle.modelName + '</p>';
          orderSingle += '<p><span class="bold">Рег. номер:</span> ' + value.vehicle.regNumber + '</p>';
          orderSingle += '<p><img class="vehicle-photo" src="img/' + value.vehicle.photo + '"></p>';
          orderSingle += '</div>';
          orderSingle += '</div>';

          $('#content').append(orderSingle);

        }
      });

    });
  }

});
