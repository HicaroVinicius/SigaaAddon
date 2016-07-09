
console.log('Sigaa Addon');
console.log(window.location.href);

function loginRoute(){
    window.onload = null;//remove popup
        var enableLogin = function(){

            var form = $("form[name='loginForm']");

            if(form && form.size() > 0){
                form.find("input[name='user.login']").prop("disabled", false);
                form.find("input[name='user.senha']").prop("disabled", false);
                form.find("input[name='entrar']").prop("disabled", false);
            }

            console.log("Enabled Login!");
        };
        enableLogin();
        setTimeout(enableLogin, 1000);
        setTimeout(enableLogin, 2000);
        setTimeout(enableLogin, 3000);
}


function studentHome(){
    console.log('route call: studentHome');
    //make courses
    var coursesEl = $("#turmas-portal").find("tbody tr:nth-child(odd)");
    var courses = [];
    coursesEl.each(function(i,e){
        courses.push( new Course($(this)) );
    });

    //add link
    var link = $("<a id='show-horario' href='#'>Ver horario</a>").css("margin-right", "10px");
    link.insertBefore($("#turmas-portal .mais:last-child a"));
    PainelSchedule.init($('#show-horario'), function(){
        $("#painel-schedules").find(".ydlg-bd").empty();
        $("#painel-schedules").find(".ydlg-bd").append(makeSchedule(courses));
    });
}

function Course(el){
    this.name = el.find("a").text();
    this.schedules = [];
    var days = el.find("td:nth-child(3) center").html().split("<br>");

    for(var i = 0; i < days.length -1; i++ ){
        var aux = days[i].split(" ");

        var day = aux[0];
        var schedules = aux[1].split("-");

        var start = parseFloat(schedules[0]);
        while(start  < parseFloat(schedules[1])){
            this.schedules.push({day: day, schedule: start+":00"});
            start += 2;    
        }
    }
}

function makeSchedule(courses){
    var days = ["SEG", "TER", "QUA", "QUI", "SEX"];
    var schedules = [];
    for(var i = 8; i < 22; i += 2)
        schedules.push(i+":00");

    var table = [[""].concat(days)];
    for(var j = 1; j < schedules.length + 1; j++){//build empty table
        table.push([]);
        table[j].push(schedules[j-1]);
        for(var i = 1; i < table[0].length;i++)
            table[j].push("");
    }


     for(var i = 0; i <  courses.length; i++){//put courses in table
        for(var j = 0; j <  courses[i].schedules.length; j++){
            var cellLabels = courses[i].schedules[j];

            var cell = findCell(table, cellLabels);
            table[cell.r][cell.c] += courses[i].name+"<br>";
        }
     }

     var tableEl = matrixToTable(table);

    //##style table##
    var headColor = "#999999",
        bodyColor = "#DDDDDD"; 
    var stlyteTable = { margin: "auto", "background-color": "white"};
    //td from head
    tableEl.find("tr:first-child").css({"font-weight": "bold", "background-color": headColor});
    tableEl.find("td:first-child").css({"font-weight": "bold", "background-color": headColor});
    tableEl.find("td:not(tr:first-child td, td:first-child)").css("background-color", bodyColor);
    
    tableEl.find("td").css("border", "1px solid black");
    tableEl.addClass("table");
    tableEl.css(stlyteTable);
   
    return tableEl;
}
function findCell(table, cellLabels){
    var r, c;
    for(var i in table[0])//find column
        if(table[0][i] == cellLabels.day)
            c = i;

    for(var i in table)//find row
        if(parseInt(table[i][0]) == parseInt(cellLabels.schedule))
            r = i;

    return {r: r, c: c};
}

function matrixToTable(matrix){
    var table = $("<table> <tbody>");
    for(var i = 0; i < matrix.length; i++){
        var line = $("<tr>");
        table.append(line);
        for(var j = 0; j < matrix[i].length; j++){
            var cell = $("<td>");
            cell.html(matrix[i][j]);
            line.append(cell);
        }
    }

    return table;
}

var PainelSchedule = function() {
    var painel, link, link2, onshow, size;
    var tries = 0;
    return {
        init: function($link, callback) {
            onShow = callback;
            link = $link;
            if (link != undefined) {
                link.bind('click', this.show);
            } else if (tries < 10) {
                setTimeout('PainelModulos.init()', 50);
                tries++;
            }
        },
        show: function() {
            if (!painel) {
                painel = new YAHOO.ext.BasicDialog("painel-schedules", {
                    autoCreate: true,
                    title: 'Horarios',
                    modal: false,
                    animateTarget: 'show-horario',
                    width: 900,
                    height: 200,
                    shadow: true,
                    resizable: true
                });
            }
            painel.show();
            painel.body.getUpdateManager()
            var mgr = painel.body.getUpdateManager();
            if (!mgr.beforeUpdate.fireDirect) {
                mgr.beforeUpdate.fireDirect = function() {}
            }

            /*mgr.update({
                url: '',
                callback: buildBody
            });*/
            onShow();
            YAHOO.ext.DialogManager.bringToFront(painel);
        }
    };
}();

function CourseFindClasses($title, $content){
    this.name = $title.find("td").text().split("-")[1].split("(")[0];
    this.schedules = [];
    var days = $content.find("td:nth-child(7)").html().split("<br>");

    for(var i = 0; i < days.length -1; i++ ){
        var aux = days[i].split(" ");

        var day = aux[0];
        var schedules = aux[1].split("-");

        var start = parseFloat(schedules[0]);
        while(start  < parseFloat(schedules[1])){
            this.schedules.push({day: day, schedule: start+":00"});
            start += 2;
        }
    }
}

function findCoursesClasses(){
    console.log("call route: busca_turma.jsf");

    //add link
    var $link = $("<a id='show-horario' href='#'>Ver horario</a>").css("margin-right", "10px");
    $(".infoAltRem").append($link);

    var $table = $("#lista-turmas");

    $table.find("tr.linhaPar, tr.linhaImpar").each(function(){//put checkbox in each class
        if($(this).css("display") != "none"){
            var checkbox = $('<input type="checkbox" class="selectClass">');
            $(this).prepend($("<td>").append(checkbox));
        }
    });

    $table.find("thead tr").prepend("<td>");//fixes titles positions in head

    var buildCourses = function(){//build courses array by table
        var courses = [];
        $table.find("tr.linhaPar, tr.linhaImpar").each(function(){//make courses
            if($(this).css("display") != "none" && $(this).find("input.selectClass:checked").length > 0){
               var $title = $(this).prevAll(".destaque:first");
                courses.push( new CourseFindClasses($title, $(this)) );

            }
        });

        return courses;
    }


    PainelSchedule.init($link, function(){
        $("#painel-schedules").find(".ydlg-bd").empty();
        $("#painel-schedules").find(".ydlg-bd").append(makeSchedule(buildCourses()));
    });
}

//Routes
var url = window.location.href;
if(url.indexOf("verTelaLogin") > -1 || url.indexOf("logar") > -1)
    loginRoute();
else if(url.indexOf("discente.jsf") > -1)
    studentHome();
else if(url.indexOf("busca_turma.jsf") > -1)
    findCoursesClasses();
