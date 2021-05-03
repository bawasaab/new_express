
function userGet(elm,id){
   let name =  $(elm).find('.userName').text();
   $('.list-group-item.active').removeClass('active').addClass('list-group-item-light').removeClass('text-white');
   $(elm).addClass('active').removeClass('list-group-item-light').addClass('text-white');
   $('.heading-name').find('.heading-name-meta').html(name);
}