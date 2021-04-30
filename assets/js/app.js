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

function isItemInCart(productID){
    return localStorage.getItem(productID);
}


function showCartItems(){
    const fragment = document.createDocumentFragment();

    for(i=0;i<5;i++){
        let box= document.createElement('div');
        box.classList.add('cart__item');
        let name= document.createElement('span');
        let quantity= document.createElement('b');
        let total = document.createElement('strong');

        name.innerHTML = 'Product Name';
        quantity.innerHTML = '5';
        total.innerHTML = '$5000';

        box.appendChild(name);
        box.appendChild(quantity);
        box.appendChild(total);
        fragment.appendChild(box);
    }

    shoppingList.appendChild(fragment);

}

showCartItems();