$(document).ready(()=>{
    generateProjects();
    $('.portfolio-link').click((ev)=>{
    renderProjectModal(ev.target.id);
    })
    $('.form-contact-submit').click(()=>{
        var text = $('.contact-me-text').val();
        var subject = $('.contact-me-subject').val();
        var userEmail = $('.contact-me-user-email').val();
        var url = `https://mail.google.com/mail/?view=cm&fs=1&to=${userEmail}&su=${subject}&body=${text}`
        window.open(url);
    })
})

function renderProjectModal(projectId){
    var project = getProjById(projectId);
    $('.portfolio-modal h2').text(project.title);
    $('.description-modal').text(project.description);
    $('.modal-image').html(`<img class="img-fluid d-block mx-auto"
    src="${project.imgUrl}" alt="${project.name} image" />`);
    $('.modal-project-url').html(`<a href="${project.url}"
    class="modal-project-url"><button class="btn btn btn-info">Go to project</button></a>`);
}