const hamburger= document.querySelector('.toggle');
const btnCloseModal =  document.getElementById('btnCloseModal');
const modalForm= document.querySelector('.modal');
const btnsAddtoCart= document.querySelectorAll('.btn-cart');

hamburger.addEventListener('click',()=>{
    hamburger.classList.toggle('active');
});

btnCloseModal.addEventListener('click',()=>{
    modalForm.classList.toggle('hidden');
});

btnsAddtoCart.forEach(btn => btn.addEventListener('click',(e)=>{
    console.log(e.target.dataset.id);
    modalForm.classList.toggle('hidden');
}));
