'use-strict';


let keyWord = [];
let cards = [];

  $.ajax('./data/page-1.json')
  .then((data) => {
    data.forEach(item => {
      let imgs = new Img(item);
  
      imgs.toHtml();
    });
    rendKeyWrd();
  });

let page1 = $(`<button> page 1 </button>`)
$('#pages').append(page1)

$(page1).click(function (){
$('section').empty();
cards = [];
keyWord = [];
$('#select').children().not(':first-child').remove();


  $.ajax('./data/page-1.json')
  .then((data) => {
    data.forEach(item => {
      let imgs = new Img(item);
  
      imgs.toHtml();
    });
    rendKeyWrd();
  });
})

let page2 = $(`<button > page 2 </button>`)
$('#pages').append(page2)
$(page2).click(function (){
  $('section').empty();
  cards = [];
  keyWord = [];
  $('#select').children().not(':first-child').remove();

  $.ajax('./data/page-2.json')
  .then((data) => {
    data.forEach(item => {
      let imgs = new Img(item);
  
      imgs.toHtml();
    });
    rendKeyWrd();
  });
})

function Img (value) {
  this.image_url = value.image_url;
  this.title = value.title;
  this.description = value.description;
  this.keyword = value.keyword;
  this.horns = value.horns;
  
  cards.push(this);
}

Img.prototype.toHtml = function () {
  let template = $('#container').html();
  let newObj = Mustache.render(template, this);
  // console.log(this);
  $('#photo-container').append(newObj);

  if (!(keyWord.includes(this.keyword))){
    keyWord.push(this.keyword);
    // console.log(keyWord);
  }
}

function rendKeyWrd () {
  keyWord.forEach(element => {
    $('#select').append(`<option value ="${element}">${element}</option>`)
  });
}

$('#select').on('change' , function (){
  $('div').hide();
  let selectOption = $(this).val();
  $(`.${selectOption}`).fadeIn(800);
  if (this.value == "all" ){
    for (let index = 0; index < cards.length; index++) {
       cards[index].toHtml();
      
    }
  }
})

$('#select2').append(`<option value ="number">by number of horns</option>`)
$('#select2').append(`<option value ="title"> A-Z </option>`)

function sortTitle(){
  cards.sort((a,b) => {
    if(a.title < b.title){
      return -1;
    }
    if(a.title > b.title){
      return 1;
    }
    return 0;
  });
}

function sortHorns(){
  cards.sort((a,b) => {
    if (a.horns < b.horns){
  
      return 1;
    }
     else if (a.horns > b.horns) return -1;
  });
}
$('#select2').on('change', function (){
  $('#photo-container').children().remove();
  if(this.value == 'title'){
    sortTitle();
    for (let index = 0; index < cards.length; index++) {
      cards[index].toHtml();
     
   }
    

  }else if(this.value == 'number'){
    sortHorns();
    for (let index = 0; index < cards.length; index++) {
      cards[index].toHtml();
     
   }
  }
});

