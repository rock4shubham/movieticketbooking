const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieselect = document.getElementById('movie');
let ticketprice=+movieselect.value;

populateui();


function setMovieData(selectedmovie,selectedprice){
    localStorage.setItem('selectedmovieindex',selectedmovie);
    localStorage.setItem('selectedmovieprice',selectedprice);
}

function updateSelectedCount(){
    const select=document.querySelectorAll('.row .seat.selected');//yahan p dusre class k bich me spaceni le rha h aur first k baad le rha h
    const seatsindex=[...select].map((seat)=>[...seats].indexOf(seat));
    localStorage.setItem('select',JSON.stringify(seatsindex));

    const temp=select.length;
    
    count.innerText=temp;
    total.innerText=temp * ticketprice;
}

function populateui(){
    const select=JSON.parse(localStorage.getItem('select'));
    if(select!==null && select.length>0){
        seats.forEach((seat,index)=>{
            if(select.indexOf(index)>-1)
            seat.classList.add('selected');
        });
    }
    const selectedmovieindex=localStorage.getItem('selectedmovieindex');
    if(selectedmovieindex!==null){
        movieselect.selectedIndex=selectedmovieindex;
    }
}

//movie select event
movieselect.addEventListener('change',e=>{
    ticketprice=+e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelectedCount();
})

//seat click event
container.addEventListener('click',e =>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');

        updateSelectedCount();
        
    }
    
});
updateSelectedCount();//initial call if page reloads