const hamburger= document.querySelector('.toggle');
const btnCloseModal =  document.getElementById('btnCloseModal');
const modalBox= document.querySelector('.modal');
const btnsAddtoCart= document.querySelectorAll('.btn-cart');
const modalForm = document.getElementById('modalForm');
const shoppingList = document.getElementById('shopping-list');

let actualProduct;
const tBQuantity = document.getElementById('quantity');

hamburger.addEventListener('click',()=>{
    hamburger.classList.toggle('active');
});

btnCloseModal.addEventListener('click',()=>{
    actualProduct = null;
    modalBox.classList.toggle('hidden');
});

btnsAddtoCart.forEach(btn => btn.addEventListener('click',(e)=>{
    actualProduct = e.target.dataset.id;
    modalBox.classList.toggle('hidden');
}));

modalForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(actualProduct){
        saveItem(actualProduct,tBQuantity.value);
    }
});


function saveItem(productID,quantity){
    quantity = parseInt(quantity);
    let quantityInCart =  isItemInCart(productID);
    if(quantityInCart){
        quantity += parseInt(quantityInCart);
    }
    console.log(quantity);
    localStorage.setItem(productID,quantity);

}

async function getCart(){
    let cart= await fetch('https://fakestoreapi.com/carts/1')
    .then(res=>res.json()) 
    .then(json=> {return json;});
    return cart;
}

function isItemInCart(productID){
    return localStorage.getItem(productID);
}

 function showCartItems(){
     shoppingList.innerHTML = '';
     getCart()//getting cart info as a promise
     .then(cart=> {
         const fragment = document.createDocumentFragment();
         for(cartItem of cart.products){
             let itemDiv= document.createElement('div');
             itemDiv.classList.add('cart__item');

            let name = document.createElement('span');
            let quantity = document.createElement('b');
            let total = document.createElement('strong');
            let btnDelete = document.createElement('button');

            name.innerHTML = cartItem.productId;
            quantity.innerHTML = cartItem.quantity;
            total.innerHTML = '$'+ 100* cartItem.quantity;
            btnDelete.setAttribute('data-id',cartItem.productId);
            btnDelete.innerHTML = '&#10006';
            itemDiv.appendChild(name);
            itemDiv.appendChild(quantity);
            itemDiv.appendChild(total);
            itemDiv.appendChild(btnDelete);
            fragment.appendChild(itemDiv);
         }
         shoppingList.appendChild(fragment);
     });
}


const btnCloseCart = document.getElementById("btnCloseCart");
const cartBox = document.querySelector(".cart");

btnCloseCart.addEventListener("click",()=>{
    cartBox.classList.toggle("cart-hide")
    if(!cartBox.classList.contains("cart-hide")){
        btnCloseCart.style.background = "url(/assets/img/icons/cancel.png)";
        showCartItems();
    }else{
        btnCloseCart.style.background = "url(/assets/img/icons/shopping-cart.png)";
    }
    btnCloseCart.style.backgroundSize = "cover";
});
