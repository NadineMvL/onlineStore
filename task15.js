let carts = document.querySelectorAll('.quickAdd');

// connect to all add to cart buttons via query selector

//I followed these youtube videos https://www.youtube.com/watch?v=PoTGs38DR9E

let stockArray = [{
        name: 'Monkey Incense Holder',
        price: 16,
        inCart: 0,
    },

    //create an arry of all the products with their properties & values, create incCart to use with the shopping cart clicker
    {
        name: 'Buddha Incense Holder',
        price: 20,
        inCart: 0,
    },
    {
        name: 'Golden Incense Holder',
        price: 20,
        inCart: 0,
    },
    {
        name: 'Incense Pot',
        price: 25,
        inCart: 0,
    }

];
//as the buttons for the products are clicked 2 functions are called simultaneously, and using a for loop to loop through array to find relevant info
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', function () {

        cartNumbers(stockArray[i]);
        totalCost(stockArray[i]);
    })
}

function onLoadCartNumbers() {


    let itemsInCart = sessionStorage.getItem('cartNumbers');
    if (itemsInCart) {
        document.querySelector('.cartAmount').innerHTML = itemsInCart;
    }
}
// when  page is loaded uses session storage to see if htere was anyting in cart before and 
function cartNumbers(stock) {

    let products = parseInt(sessionStorage.getItem('cartNumbers'));

    if (products) {
        sessionStorage.setItem('cartNumbers', products + 1);
        document.querySelector('.cartAmount').innerHTML = products + 1;

        //if there is anything in cart then increase the number of items already in cart by 1
    } else {
        sessionStorage.setItem('cartNumbers', 1);
        document.querySelector('.cartAmount').innerHTML = 1;

        //if nothing in cart yet then make it one (currently set to zero)
    }

    setItems(stock);
}

function setItems(stock) {

    let cartItems = JSON.parse(sessionStorage.getItem('stockInCart'));

    if (cartItems != null) {
        //check to see if there is already something in our cart

        if (cartItems[stock.name] == undefined) {
            //this if is needed when  a different item is added to the cart than before
            cartItems = {
                ...cartItems,

                // the rest operator is used to allow for whatever else is in there to remain there and then you add the new stock from the array
                [stock.name]: stock
            }
        }


        cartItems[stock.name].inCart += 1;
        // go through array, check each stock for the name and increase by 1

    } else {
        stock.inCart = 1;
        cartItems = {
            [stock.name]: stock
        }


    }
    sessionStorage.setItem('stockInCart', JSON.stringify(cartItems));

    //make sure to save new value of stockInCart with sessionStorage and JSON.stringify to convert into correct format
}

function totalCost(stock) {
    let cartCost = JSON.parse(sessionStorage.getItem('totalCost'));

    //you can use this function to display the alert and also save the total cost to display on check out page

    if (cartCost != null) {
        sessionStorage.setItem('totalCost', cartCost + stock.price);
        alert(`Your cost so far is ${cartCost + stock.price} excluding VAT`);

        // get current cartCost and add new item price.
    } else {

        sessionStorage.setItem('totalCost', stock.price);
        alert(`Your cost so far is $${stock.price} excluding VAT`);
        //create a totalCost value
    }

}

function displayCart() {
    let finalCart = JSON.parse(sessionStorage.getItem('stockInCart'));

    //stockInCart was already created in the setItems function so it will be saved in the storage already
    let finalCheckOut = document.querySelector('.finalCheckOut');
    if (finalCart && finalCheckOut) {

        //check to see if finalCheckOut exists on page to make sure function does not run on a different page as all JS is written in same file
        finalCheckOut.innerHTML = '';
        //make sure that finalCheckOut is initially empty onload (when calling the function)
        Object.values(finalCart).map(item => {
            let value = item.inCart * item.price
            //look at the values in the map
            //calculate the value of the price of item multiplied by item price
            finalCheckOut.innerHTML += `<div class='product mainH'> ${item.name} </div>
            <div class='product'>Price per Item: ${item.price}</div>
            <div class='product'>Quantity selected: ${item.inCart}</div>
           
            <div class='product'>Total per item: ${value}</div>
            
                    `


        })

        //print sessionStorage info to the checkout page
    }
}

function subtotal() {
    let getTotal = JSON.parse(sessionStorage.getItem('totalCost'));

    //get the value of totalCost that has already been created with the alert
    let vatTotal = JSON.parse(sessionStorage.getItem('totalCost')) * 1.15;
    vatTotal = Math.round(vatTotal * 100) / 100;
    let subtotal = document.getElementById('subtotal');
    let vatFinal = document.getElementById('vatTotal');

    subtotal.innerHTML = getTotal;
    vatFinal.innerHTML = vatTotal;
}
//use JSON parse to get the value of totalCost and display it on the checkout page, also use the amount and add VAT of 15% on it, can do it in the same function
//use Math.found() function to round to the 2 closest decimal points


const nums = ['A', 'B', 'C', 'D', 'E', 'F', 1, 2, 3, 4, 5, 6, 7, 8, 9];

function refNumbers() {

    let x = document.querySelector('body');
    x.innerHTML = "";
    let post = document.createElement('p')
    post.style.color = 'white';
    x.appendChild(post);

    let number = "#";
    for (let k = 0; k < 8; k++) {
        number += nums[getRandomNumber()];

    }

    post.innerHTML = "Congrats, your order has been placed, your reference is " + number;


}

function getRandomNumber() {
    return Math.floor(Math.random() * nums.length);
}

/* when button is clicked then the body of the page is cleared so it looks like a new, empty page
found this way using an array to print random number to use as a reference number. 
first create an array of values to put in reference number, 
then create a loop to loop through array and determine how long it should be, in this case 7 units long
then create another function and use the math.random () and also the math.floor to round down to closest integer
 */

$('.moreInfo').click(function () {

    $('.productInfo').show();
});

let locations = ['Durbanville', 'Stellenbosch', 'Hout Bay'];

function locationsOpts() {
    let options = document.getElementById('options');
    options.style.visibility = 'visible';
    let delivery = document.querySelector('.deliv');
    delivery.style.visibility = 'hidden';


    for (j = 0; j < locations.length; j++) {
        let shop = document.createElement('option');

        shop.innerHTML = locations[j];
        options.appendChild(shop);

        //created a dropdown menu in JS when customer chooses they want to pick up order

    }
    alert("Great, please choose collection area");

}

function buttonLocations() {
    let options = document.getElementById('buttonPlace');

    let locationsButton = document.createElement('button');
    locationsButton.innerHTML = "Click to confirm";
    locationsButton.type = "button";
    options.appendChild(locationsButton);

    locationsButton.addEventListener('click', function () {
        let finalTotal = document.getElementById('finalTotal');
        let vatFinal = document.getElementById('vatTotal');
        let couponNumber = document.getElementById('couponNumber');
        let totalCoupon = vatFinal.innerHTML;
        totalCoupon = Number(totalCoupon);
        totalCoupon = (totalCoupon / 100) * 80;
        totalCoupon = Math.round(totalCoupon * 100) / 100;


        if (couponNumber.innerHTML === "") {
            finalTotal.innerHTML = vatFinal.innerHTML;
        } else {
            alert('Your coupon is valid, you can enjoy 20% off from your purchase');
            finalTotal.innerHTML = totalCoupon;
        }
    });
} //if customer chose pick up but with no coupon then they just pay the amount of products total but if they also entered a coupon then it is valid and they get 20% taken off 

function coupon() {
    let couponInput = document.querySelector('.discInput').value;
    let couponNumber = document.getElementById('couponNumber');
    alert('Please fill out the rest of the form to see if your coupon is valid')

    couponNumber.innerHTML = "Your coupon number: " + couponInput;
    //captures the coupon number that the customer inserted and displays it on webpage
}

function deliveries() {

    let showForm = document.getElementById('deliveryOpts');
    let collect = document.querySelector('.collect');
    showForm.style.visibility = "visible";
    collect.style.visibility = "hidden";
}
//created a delivery address form that only appears if customer chose delivery option
//#deliveryOpts is originally hidden in css

function totalDelivery() {
    let vatFinal = document.getElementById('vatTotal');
    let couponNumber = document.getElementById('couponNumber');
    let finalTotal = document.getElementById('finalTotal');

    if (couponNumber.innerHTML === "") {
        finalTotal.innerHTML = vatFinal.innerHTML;
    } else {

        alert('Sorry coupons do not apply to home deliveries');
        finalTotal.innerHTML = vatFinal.innerHTML;
        //alert only shows if customer did try to enter a coupon
    }

}
//coupons do not apply on deliveries so the price of the products is the final price


onLoadCartNumbers();
displayCart();
//call these functions, could have called them onload in html too

$('#intro').hover(function () {
    $(this).hide();
    $('#slogan').show();
    //jquery to hide a line and replace it with the slogan, intro is 100% width in css to increase hover space
});

$('.animatePic').mouseenter(function () {

    $(this).animate({
        left: '-=50px'
    });
    $(this).animate({
        top: '50px'
    });
    $(this).animate({
        left: '50px'
    });
    $(this).animate({
        top: '-=50px'
    });
    $(this).animate({
        left: '-=50px'
    });

    $(this).stop();
});
//animation created so image moves when being mouse is on it but stops once it is back in original position and mouse is not on image anymore