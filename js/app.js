'use-strict';

let gallery = [];
let keyWord =[];

function itemList() {
  var unique = [];
  $.each(keyWord, function (i, el) {
      if ($.inArray(el, unique) === -1) unique.push(el);
  });

  for (let index = 0; index < unique.length; index++) {
    $('#select').append(`<option value="${unique[index]}">${unique[index]}</option>`)
    
  }
}

function filter() {
  $('#select').on('change', function(){
    $('#container').children().not(':first-child').remove();

    for (let index = 0; index < gallery.length; index++) {
      
      if (this.value == gallery[index].keyword) {
        gallery[index].render();
        
      }
      
    }
  })
}

function Img (image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;

  gallery.push(this);
  keyWord.push(this.keyword);
}

Img.prototype.render = function(){
  let template = $('#photo-template').clone();

//  console.log(template);

  template.html(`<h2>${this.title}</h2>
      <img src="${this.image_url}" alt="${this.keyword}">
      <p>${this.description}</p>`);
      template.removeAttr('id');
      $('section').append(template);
}

$.ajax('./data/page-1.json').then((data) => {
  console.log(data);
  data.forEach(element => {
    let imgs = new Img(element.image_url, element.title, element.description, element.keyword, element.horns);

    imgs.render();
  });
  filter();
  itemList();
});




