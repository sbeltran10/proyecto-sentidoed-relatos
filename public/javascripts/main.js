function init() {
    var containerDiv = $("<div id='current' class='container'></div>");

    var imagenes1 = $("<div class ='row'></div>");
    var titulo = $("<div class ='row titulo'>RELATOS SALVAJES - LA PROPUESTA</div>");
    var imagenes2 = $("<div class ='row'></div>");
    var descripcion = $("<div class ='row descripcion'><p>La siguiente es una historia interactiva del relato salvaje “La propuesta” en la cual un joven llamado Santiago va a un bar a tomarse unos tragos, a continuación, usted tendrá el control de decir cómo se desenlaza esta historia.</p></div>");
    var imagenFiscal = $("<div class='col-md-4'><div class='image-relato'><img src='images/relatos-fiscal.png' class='rounded-image'></div></div>");
    var imagenJose = $("<div class='col-md-4'><div class='image-relato'><img src='images/relatos-jose.png' class='rounded-image'></div></div>");
    var imagenMauricio = $("<div class='col-md-4'><div class='image-relato'><img src='images/relatos-mauricio.png' class='rounded-image'></div></div>");


    var imagenOsmar = $("<div class='col-md-4'><div class='image-relato'><img src='images/relatos-osmar.png' class='rounded-image'></div></div>");
    var imagenSantiago = $("<div class='col-md-4'><div class='image-relato'><img src='images/relatos-santiago.png' class='rounded-image'></div></div>");
    var imagenSenora = $("<div class='col-md-4'><div class='image-relato'><img src='images/relatos-senora.png' class='rounded-image'></div></div>");

    imagenes1.append(imagenSantiago);
    imagenes1.append(imagenMauricio);
    imagenes1.append(imagenSenora);
    imagenes2.append(imagenOsmar);
    imagenes2.append(imagenJose);
    imagenes2.append(imagenFiscal);

    containerDiv.append(imagenes1);
    containerDiv.append(titulo);
    containerDiv.append(imagenes2);
    containerDiv.append(descripcion);
    var textoReinicio = $("<div class ='row'><div class ='col-md-12 reiniciar'>Iniciar</div></div>");
    containerDiv.append(textoReinicio);
    containerDiv.append($('<a id="abajo-inicio" href="#" class="arrow down"></a>'));

    


    $("#main").append(containerDiv);

    $("#abajo-inicio").click(function (e) { e.preventDefault(); loadChoice(0); return false; });

    $("html, body").animate({
            scrollTop: 0
        }, 1000);
}

function loadChoice(numChoice) {
    console.log("wa");
    $.getJSON("pantallas/choices.json", function (json) {

        var choice = json[numChoice];
        var containerDiv = $("<div id='current' class='container'></div>");
        var titulo = $("<div class ='row titulo'>" + choice.titulo + "</div>");
        var imagenes = $("<div class ='row'></div>");
        for (var i = 0; i < choice.imagenes.length; i++) {
            var imagenPersonaje = $("<div class='col-md-" + (12 / choice.imagenes.length) + "'><div class='image-relato'><img src='images/" + choice.imagenes[i] + "' class='rounded-image'></div></div>");
            imagenes.append(imagenPersonaje);
        }
        var descripcion = $("<div class ='row descripcion'><p>" + choice.descripcion + "</p></div>");

        var rowFlechas = $("<div class ='row'></div>");
        var arrowLeft = $('<div class="col-md-1"><a id="izquierda" href="#" class="arrow left"></a></div>');
        var textoLeft = $('<div class="col-md-5 descripcion-opcion-izquierda"><p>' + choice.opcion1 + '</p></div>');
        var textoRight = $('<div class="col-md-5 descripcion-opcion-derecha"><p>' + choice.opcion2 + '</p></div>');
        var arrowRight = $('<div class="col-md-1"><a id="derecha" href="#" class="arrow right"></a></div>');

        rowFlechas.append(arrowLeft);
        rowFlechas.append(textoLeft);
        rowFlechas.append(textoRight);
        rowFlechas.append(arrowRight);

        containerDiv.append(titulo);
        containerDiv.append(imagenes);
        containerDiv.append(descripcion);
        containerDiv.append(rowFlechas);

        $("#current").replaceWith(containerDiv);

        $("html, body").animate({
            scrollTop: 0
        }, 1000);

        if (choice.redir1.startsWith("c")) {
            $("#izquierda").click(function (e) { e.preventDefault(); loadChoice(choice.redir1.substring(1, 2)); return false; });
        }
        else {
            $("#izquierda").click(function (e) { e.preventDefault(); loadEnding(choice.redir1.substring(1, 2)); return false; });
        }

        if (choice.redir2.startsWith("c")) {
            $("#derecha").click(function (e) { e.preventDefault(); loadChoice(choice.redir2.substring(1, 2)); return false; });
        }
        else {
            $("#derecha").click(function (e) { e.preventDefault(); loadEnding(choice.redir2.substring(1, 2)); return false; });
        }

    })
}

function loadEnding(numEnding) {
    $.getJSON("pantallas/endings.json", function (json) {
        var ending = json[numEnding];
        var containerDiv = $("<div id='current' class='container'></div>");
        var titulo = $("<div class ='row titulo'>" + ending.titulo + "</div>");
        var imagenes = $("<div class ='row'></div>");
        var imagenPersonaje = $("<div class='col-md-12'><div class='image-relato'><img src='images/" + ending.imagen + "' class='rounded-image'></div></div>");
        imagenes.append(imagenPersonaje);
        var descripcion = $("<div class ='row descripcion'><p>" + ending.descripcion + "</p></div>");

        var textoReinicio = $("<div class ='row'><div class ='col-md-12 reiniciar'>Reiniciar</div></div>");
        var flechaReinicio = $("<div class ='row'><div class ='col-md-12'><a id='arriba' href='#' class='arrow up'>Arriba</a></div></div>");

        containerDiv.append(titulo);
        containerDiv.append(imagenes);
        containerDiv.append(descripcion);
        containerDiv.append(flechaReinicio);
        containerDiv.append(textoReinicio);

        $("#current").replaceWith(containerDiv);

        $("html, body").animate({
            scrollTop: 0
        }, 1000);

        $("#arriba").click(function (e) { e.preventDefault(); loadChoice(0); return false; });

    })
}