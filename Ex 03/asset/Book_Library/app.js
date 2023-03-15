const form=document.querySelector('form')
const dashboard=document.querySelector('.dashbord')
var number;
const getData=()=>{
    fetch("https://jsonplaceholder.typicode.com/photos").then(res=>res.json()).then(data=>{
    Books=data;
    number=Books.length;
    Render()
})
}
number=window.localStorage.getItem('BooksOriginalLength')!=null && !isNaN(Number(window.localStorage.getItem('BooksOriginalLength')))?Number(window.localStorage.getItem('BooksOriginalLength')):getData()

var Books=window.localStorage.getItem('Books')!=null?JSON.parse(window.localStorage.getItem('Books')):getData()



const Render=()=>{
    dashboard.innerHTML=`<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
    let tmpHtml="";
    let isready=true;
    Books.forEach((item)=>{

        
        
        tmpHtml+=`<div id=${item.id} class="card">
        
        <div class="infor">
        <img src="${item.thumbnailUrl}" alt="image" >
        <div class="book_infor">
        <p>
        title: ${item.title}
        </p>
        <p>albumId: ${item.albumId}</p>
        <a href="/detail/${item.id}">See</a>
        </div>
        </div>
        </div>
        `
        
    })
    
    dashboard.innerHTML=tmpHtml;
    dashboard.addEventListener('loaded',()=>{
        document.querySelector('.lds-roller').remove()
    })
    Save()
}
window.addEventListener('load',()=>{
    Render()
    Save()
})



form.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    fetch('https://jsonplaceholder.typicode.com/photos', {
    method: 'POST',
    body: JSON.stringify({
        title: document.querySelector('#Name').value,
        albumId:document.querySelector('#Category').value,
        thumbnailUrl: document.querySelector('#imageInput').value,
        url: document.querySelector('#imageInput').value
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
.then((response) => response.json())
.then((json) =>{
    json.id=Number(Books[Books.length-1].id)+1
    Books=[...Books,json]
    // dashboard.innerHTML=`<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;


    let tmpHtml=`<div id=${json.id} class="card">
    
    <div class="infor">
    <img src="${json.thumbnailUrl}" alt="image" >
    <div class="book_infor">
    <p>
    title: ${json.title}
    </p>
    <p>albumId: ${json.albumId}</p>
    <a href="/detail/${json.id}">See</a></div>
    </div>
    </div>
    </div>
    `
    
    
    
    dashboard.innerHTML+=tmpHtml;

    
    Save()
    // console.log(json);
});

document.querySelector('#name').value=""
document.querySelector('#category').value=""
document.querySelector('#imageInput').value=""
document.querySelector('#Add').value="Add";

})
const Save=()=>{
    window.localStorage.setItem('Books',JSON.stringify(Books))
    window.localStorage.setItem('BooksOriginalLength',(number))
}