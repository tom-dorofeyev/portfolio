var gId = 1;
var gProjects = [];

function generateProjects(){
    
    //pushing all projects to array gProjects
    gProjects.push(new Project(gId++, 'bookShop', 'Book Shop', 'manage your own book shop',
    'projects/proj-bookshop/index.html', '27/05/2019', 'bootstrap, jQuery, shop', 'img/portfolio/book-shop-full.png'));

    gProjects.push(new Project(gId++, 'mineSweeper', 'Mine Sweeper' , 'my own mine sweeper',
    'projects/proj-minesweeper/index.html', '16/05/2019', 'recursion, game', 'img/portfolio/mine-sweeper-full.png'));

    gProjects.push(new Project(gId++, 'guessMe', 'Guess Me', 'think of a character and the site will guess',
    'projects/proj-guessMe/index.html', '25/05/2019', 'local storage, objects'));

    gProjects.push(new Project(gId++, 'touchTheNum', 'Touch The Num',
    'touch the number from 1 to the number of nums by order', 'projects/proj-touch-the-num/index.html',
    '10/05/2019', 'game'));
}

function getProjById(id){
    return gProjects.find((proj)=>{
        return proj.id === +id;
    })
}

function Project(id, name, title, description, url, publishedAt, labels, imgUrl){
    this.id = id,
    this.name = name,
    this.title = title,
    this.description = description,
    this.url = url,
    this.publishedAt = publishedAt,
    this.labels = labels,
    this.imgUrl = imgUrl
}