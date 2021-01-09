const express = require("express");

const hbs = require("hbs");

const app = express();

const folder = require("./folder");

const multer = require("multer");

const upload = multer({ dest: "files" });

const storageConfig = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, "files")
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        }
    }
);

app.set("view engine", "hbs");

app.use(express.static(__dirname));

app.use(multer({storage: storageConfig}).single("filedata"));

hbs.registerPartials(__dirname + "/views/partial");


app.get("/", function(request, response){
    let links = folder.getFiles("./files/");
    response.render("index", {
        title: "Главная страница",
        description: "Вывод хранимых файлов",
        links: links,
    });
})

app.get("/upload", function(request, response){
    response.render("upload", {
        title: "Загрузка файлов",
        buttonName: "Загрузить файл",
    });
})

app.post("/upload", upload.single("filedata"), function(request, response, next){
    let filedata = request.file;
    if (!filedata) response.send("Ошибка при загрузке файла")
    else
        response.render("upload", {
            title: "Загрузка файла",
            buttonName: "Загрузить файл",
        })

});
/** multer */
app.listen(3000, function(){
    console.log("Запущен сервер по порту 3000")
});

