$(document).ready(function(){
  
  
  /*$.getJSON('http://localhost:5000/api/news', (data) => {
    var index = 0;
    data.articles.forEach(article => {
      $( ".add" ).append( `
      <div class="row mt-2 mb-4">
      <div class="container">
      <div class="get-news${index}">
      <div class="container">
        <div class="card-group vgr-cards">
          <div class="card">
            <div class="card-body">
              <div class="media">
                <img src="./img/card-clear.png" class="align-self-center mr-3 card-img " id="news-img${index}" alt="...">
                <div class="media-body">
                  <h5 class="mt-0" id="news-title${index}"></h5>
                  <p class="news-description"></p>
                  <div class="row">
                    <div class="col-4 white-text">
                      <a class="btn btn-primary" id="news-url${index}">More</a>
                    </div>
                    <div class="col mt-2">
                      <strong class="mr-sm-4">Published on</strong><span id="news-date${index}"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>` );
      
      $(`#news-img${index}`).attr("src", article.urlToImage); 
      $(`#news-title${index}`).append(article.title);
      $(`#news-date${index}`).append(article.publishedAt);
      index++;
    });
  })*/


  $( "form" ).submit(function() {
    event.preventDefault();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "http://ec2co-ecsel-1mrxus4anm99i-655009201.ap-southeast-1.elb.amazonaws.com:5000/api/news",
        data: JSON.stringify({news_searching: `${$('input').val()}`}),
        success: function (data) {
            $('input').val('');
            var index = 0;
            data.articles.forEach(article => {
              $( `.delete-${index}` ).remove();
              $( ".add" ).append( `
              <div class="row mt-2 mb-4 delete-${index}">
              <div class="container">
              <div class="get-news-${index}">
              <div class="container">
                <div class="card-group vgr-cards">
                  <div class="card">
                    <div class="card-body">
                      <div class="media">
                        <img src="./img/card-clear.png" class="align-self-center mr-3 card-img " id="news-img-${index}" alt="...">
                        <div class="media-body">
                          <h5 class="mt-0" id="news-title-${index}"></h5>
                          <p class="news-description"></p>
                          <div class="row">
                            <div class="col-4 white-text">
                              <a class="btn btn-primary" id="news-url-${index}">More</a>
                            </div>
                            <div class="col mt-2">
                              <strong class="mr-sm-2">Published on</strong><span id="news-date-${index}"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              </div>
              </div>` );
              
              $(`#news-img-${index}`).attr("src", article.urlToImage); 
              $(`#news-title-${index}`).append(article.title);
              $(`#news-date-${index}`).append(()=> {
                                                      return article.publishedAt.slice(0, 10)
                                                    });
              $(`#news-url-${index}`).attr("href", article.url);

              index++;
            });
        },
        dataType: "json"
      });

    return false;
  });


});