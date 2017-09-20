
function charCount() {
  let content = $('textarea[name=text]');
  content.on('keyup', function(event) {
    let currentCount = 140 - $(this).val().length;
    console.log(currentCount);
    const counter = $(this).siblings('.counter');
    if (currentCount < 0) {
      counter.text(currentCount).addClass('hasError');
    } else {
        counter.text(currentCount).removeClass('hasError');
      }
  });
}

$(charCount);

// document.addEventListener('DOMContentLoaded', function(event) {
//   charCount();
// });
// $(document).ready(charCount);


