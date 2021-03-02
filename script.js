// PAGINA PRODOTTI

fetch("./data.json")
    .then(risposta => risposta.json())
    .then(data =>{
      

      function init() {
        popolaCategorieFiltrate(data)
        popolaPrezziFiltrati(data)
        filtraPerCategoria(data)
        filtraPerPrezzo(data)
        filtraParola(data)
        mostraProdotti(data)
      }
      init()
      
      
      
      // funzione per popolare le categorie 
      
      function popolaCategorieFiltrate(dataInput){
        let categoria = Array.from(new Set(data.map(el => el.category))).sort()
        let filtroCategorie = document.querySelector("#filtroCategorie")
        
        categoria.forEach(categoria =>{
          
          let div = document.createElement("div")
          div.classList.add("custom-control", "custom-radio")
          div.innerHTML = 
          `
          <input type="radio" id="${categoria}" name="categoria" class="custom-control-input">
          <label class="custom-control-label text-accent" data-categorie="${categoria.toLowerCase()}" for="${categoria}">${categoria}</label>
           
          
          `
          filtroCategorie.appendChild(div)
        })
        
        let tutteCategorie = document.createElement("div")
        tutteCategorie.classList.add("custom-control", "custom-radio", "my-3")
        tutteCategorie.innerHTML= 
        `
        <input type="radio" id="tutte" name="categoria" class="custom-control-input">
        <label class="custom-control-label text-accent" for="tutte">Tutte</label>
        
        
        `
        filtroCategorie.appendChild(tutteCategorie)
        
      }
      
      // funzione per popolare prezzo
      
      function popolaPrezziFiltrati(dataInput) {
        let maxPrezzo = document.querySelector("#maxPrezzo")
        let max = Math.max(...dataInput.map(el => Number(el.jPrezzo)))
        console.log(max);
        
        maxPrezzo.innerText = max + "$"
        
        let sliderPrezzo = document.querySelector("#sliderPrezzo")
        sliderPrezzo.max = max
        sliderPrezzo.min = 0
        sliderPrezzo.value = max
        
        
      }
      

      // funzioni per filtrare
      
      function filtraPerCategoria(dataInput){
        let cliccabile = document.querySelectorAll('[data-categorie]') 
        
        cliccabile.forEach(el => {
          el.addEventListener('click', ()=>{
            let selezionaCategoria = el.dataset.categorie
            let filtraProdotti = dataInput.filter(el => el.category.toLowerCase() == selezionaCategoria)

            mostraProdotti(filtraProdotti)
            
            console.log(selezionaCategoria);
            
            
          })
          
          
          
        })
      }
      


     
      function filtraPerPrezzo(dataInput){
        let sliderPrezzo = document.querySelector('#sliderPrezzo')
        
        sliderPrezzo.addEventListener('input', ()=>{
          console.log(Number(sliderPrezzo.value))
          let prezzoScelto = document.querySelector('#prezzoScelto')
          prezzoScelto.innerText = sliderPrezzo.value + "$";
          
          let filtraProdotti = dataInput.filter(el => Number(el.jPrezzo) <= sliderPrezzo.value)
          console.log(filtraProdotti);
          
          mostraProdotti(filtraProdotti);
          
          
        })
      } 
      
       
      function filtraParola(dataInput){
        let filtraPerParola = document.querySelector('#filtraPerParola')
        filtraPerParola.addEventListener('input', ()=>{
          if (filtraPerParola.value.length > 3){
            let filtraProdotti = dataInput.filter(el => el.jNome.toLowerCase().includes(filtraPerParola.value.toLowerCase()))
            
            
            mostraProdotti(filtraProdotti)
          }
          
        })
      }
      

      // prodotti da mostrare
      
      function mostraProdotti(dataInput) {
        let wrapperProducts = document.querySelector("#wrapperProducts")
        wrapperProducts.innerHTML = ""
        
        
        dataInput.forEach(el => {
          let col =document.createElement("div")
          col.classList.add("col-12","col-md-6", "col-lg-4", "mb-4")
          col.innerHTML=
          `
          <div class="card-group">
            <div class="card shadow">
              <img class="card-img-top img-fluid" src="https://source.unsplash.com/user/erondu/1600x${900 + el.id}" alt="">
              <div class="card-body">
                <h5 class="card-title">${el.jNome}</h5>
                <p class="card-text font-italic text-sec small">${el.category}</p>
                <p class="text-main font-weight-bold">${el.jPrezzo} $</p>
                <p class="card-text"><small class="text-muted"></small></p>
              </div>
            </div>
          </div>
          
          `
          wrapperProducts.appendChild(col)
        })

        let numeroProdotti = document.querySelector("#numeroProdotti")
        numeroProdotti.innerText = dataInput.length
        
      }
      
    })
    
    //chiusura
  

    
    
