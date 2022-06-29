$(document).ready(function(){
    $('form').submit(function(e){
        e.preventDefault();
        let numeroBuscadorSuperHero = $('#numeroBuscadorSuperHero').val();

        validation = /[a-zA-Z]/gim;

        if(numeroBuscadorSuperHero.match(validation) || numeroBuscadorSuperHero > 700) {
            alert('Debes Ingresar un Número menor a 701');
        } else {
            $.ajax({
                url:"https://www.superheroapi.com/api.php/4905856019427443/" + numeroBuscadorSuperHero,
                success: function(data) {

                    /* Datos Generales del SuperHero */
    
                    let {name: name} = data;
                    let {url: imageURL} = data.image;
                    let {'group-affiliation': connections} = data.connections;
                    let {'publisher': publishedBy} = data.biography;
                    let {'occupation': occupation} = data.work;
                    let {'first-appearance': firstAppearance} = data.biography;
                    let {height: height} = data.appearance;
                    let heightJoin = height.join(" - ")
                    let {weight: weight} = data.appearance;
                    let weightJoin = weight.join(" - ")
                    let {aliases: aliases} = data.biography;
                    let aliasesJoin = aliases.join(", ");
                    
                    /* Stats del SuperHero */
    
                    let {'intelligence': intelligence} = data.powerstats;
                    let {'strength': strength} = data.powerstats;
                    let {'speed': speed} = data.powerstats;
                    let {'durability': durability} = data.powerstats;
                    let {'power': power} = data.powerstats;
                    let {'combat': combat} = data.powerstats;

                    $('#generalData').html(`<h4 class = "text-center mb-3"> SuperHero encontrado </h4>
                    <div class="card mb-3">
                        <div class="row no-gutters">
                          <div class="col-md-5">
                            <img class="card-img-top" src="${imageURL}">
                          </div>
                          <div class="col-md-7">
                            <div class="card-body">
                              <h4 class="card-title text-center"><strong>${name}</strong></h4>
                              <p class="card-text"><strong>Conexiones:</strong></br>
                              ${connections}
                              </p>
                              <ul class="list-group list-group-flush">
                                <li class="list-group-item"><strong>Ocupación:</strong></br>${occupation}</li>
                                <li class="list-group-item"><strong>Primera Aparición:</strong></br> ${firstAppearance}</li>
                                <li class="list-group-item"><strong>Altura:</strong></br> ${heightJoin}</li>
                                <li class="list-group-item"><strong>Peso:</strong></br> ${weightJoin}</li>
                                <li class="list-group-item"><strong>Alianzas:</strong></br> ${aliasesJoin}</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div class="card-footer text-right">
                            Publicado por: ${publishedBy}
                        </div>
                    </div>
                    `)

                    let settings = {
                        animationEnabled: true,
                        title: {
                            text: `Estadísticas de poder para: ${name}`
                        },
                        data: [
                            { 
                                type: 'pie',
                                sstartAngle: 25,
                                toolTipContent: "<b>{label}</b>: ({y})",
                                showInLegend: "true",
                                legendText: "{label}",
                                indexLabelFontSize: 16,
                                indexLabel: "{label} - ({y})",
                                dataPoints: [
                                    {y: intelligence, label: "Inteligencia"},
                                    {y: strength, label: "Fuerza"},
                                    {y: speed, label: "Velocidad"},
                                    {y: durability, label: "Durabilidad"},
                                    {y: power, label: "Poder"},
                                    {y: combat, label: "Combate"},
                                ],
                            },  
                        ],
                    };
                    let chart = new CanvasJS.Chart("grafic", settings);
                    chart.render();
                }
            })
        
        }
    })
})