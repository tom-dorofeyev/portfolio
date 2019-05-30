$(document).ready(() => {
  generateProjects();
  //make function renderProjectGrid()
  // renderProjectGrid();
  renderProjects(gProjects);
  $('.portfolio-link').click((ev) => {
    renderProjectModal(ev.target.id);
  })
  $('.form-contact-submit').click(() => {
    var text = $('.contact-me-text').val();
    var subject = $('.contact-me-subject').val();
    var userEmail = $('.contact-me-user-email').val();
    var url = `https://mail.google.com/mail/?view=cm&fs=1&to=${userEmail}&su=${subject}&body=${text}`
    window.open(url);
  })
})

function renderProjects(projects) {
  var strHtml = '';
  projects.forEach((project) => {
    strHtml += `<div class="col-md-4 col-sm-6 portfolio-item">
                <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
                  <div class="portfolio-hover">
                    <div class="portfolio-hover-content">
                      <i id="${project.id}" class="fa fa-plus fa-3x"></i>
                    </div>
                  </div>
                  <img class="img-fluid" src="${project.imgUrl}" alt="">
                </a>
                <div class="portfolio-caption">
                  <h4>${project.title}</h4>
                  <p class="text-muted">${project.labels}</p>
                </div>
                </div>`
    return strHtml;
  })
  $('.portfolio-grid').html(strHtml);
}

function renderProjectModal(projectId) {
  var project = getProjById(projectId);
  $('.portfolio-modal h2').text(project.title);
  $('.description-modal').text(project.description);
  $('.modal-image').html(`<img class="img-fluid d-block mx-auto"
    src="${project.imgUrl}" alt="${project.name} image" />`);
  $('.modal-project-url').html(`<a href="${project.url}"
    class="modal-project-url"><button class="btn btn btn-info">Go to project</button></a>`);
}
