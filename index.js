let template_card=document.getElementById('template-cards').content
const template_footer=document.getElementById('template-footer').content
const template_carrito=document.getElementById('template-carrito').content
let template_card_lf=document.getElementById('template-cards-lf').content
let cards=document.getElementById('cards')
let items=document.getElementById('items')
let footer=document.getElementById('footer')
let input = document.getElementById('input')
let collapse = document.getElementById('collapse')
let element = document.getElementById('letrero')
let coll=document.getElementById('coll')
//let pay=document.getElementById('pay')
let cambio=false
const fragmnto=document.createDocumentFragment()
let carrito={}
let arr=[
      1402,
      534,
      1458,
      659,
      1058,
      1048,
      826,
      964,
      1277,
      1021,
      321,
      564,
      216,
      748,
      1081,
      1367,
      222,
      1366,
      911,
      766,
      1110,
      1123,
      1390,
      1414,
      1048,
      278,
      642,
      766,
      1274,
      1147,
      275,
      727,
      760,
      861,
      1358,
      1426,
      1093,
      283,
      657,
      397,
      1482,
      288,
      808,
      609,
      789,
      444,
      1168,
      939,
      588,
      379,
      1475,
      1342,
      1290,
      398,
      1100,
      540,
      704,
      470,
      697,
      542,
      603,
      644,
      435,
      1410,
      942,
      896,
      285,
      659,
      1222,
      251,
      476,
      458,
      1234,
      1203,
      1424,
      855,
      1301,
      1052,
      347,
      1483,
      369,
      968,
      1015,
      1245,
      928,
      1029,
      1314,
      953,
      1249,
      764,
      1119,
      242,
      1457,
      1292,
      1105,
      1126,
      1285
]
document.addEventListener('DOMContentLoaded',()=>{
      datosFetch()            
      if (localStorage.getItem('carrito')) {
            carrito=JSON.parse(localStorage.getItem('carrito'))            
            pintarCarrito()
      }
})
coll.addEventListener('click',e=>{
      aniadir(e)
})
cards.addEventListener('click',e=>{
      aniadir(e)
})
items.addEventListener('click',e=>{
      btnAccion(e)
})

const datosFetch= async () => {
      try {
            const res = await fetch('https://www.freetogame.com/api/games?platform=pc&category=shooter', { 
                  method: 'GET',
                  headers: new Headers({
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'GET',                         
                        'Content-type': 'application/json'
                  }),
                  mode: 'cors',
            })
            const data = await res.json()            
            pintar_tarjeta(data)
            return data
      } catch (error) {
            console.error(error)
      }      
}
async function rec(){
      coll.innerHTML=''
      let datos=await datosFetch()
      let data=[]
      let juego=datos.find(item=>item.title.trim().toLowerCase()===input.value.trim().toLowerCase())
      console.log(juego)
      if(juego===undefined){
            coll.innerHTML=''
      }
      data[0]=juego            
      template_card_lf.querySelector('.card-text').textContent = data[0].short_description
      template_card_lf.querySelector('h5').textContent = data[0].title
      template_card_lf.querySelector('p').textContent = '$'+data[0].precio
      template_card_lf.querySelector('img').setAttribute('src', data[0].thumbnail)            
      template_card_lf.querySelector('#btn-dark').dataset.id=data[0].id
      const clon=template_card_lf.cloneNode(true)
      fragmnto.appendChild(clon)
      coll.appendChild(fragmnto)       
      
}
const pintar_tarjeta=data=>{ 
      let prec=arr      
      let i=0
      data.forEach(producto=>{             
            producto.precio= prec[i]
            i++
            template_card.querySelector('.card-text').textContent = producto.short_description
            template_card.querySelector('h5').textContent = producto.title
            template_card.querySelector('p').textContent = '$'+producto.precio
            template_card.querySelector('img').setAttribute('src', producto.thumbnail)            
            template_card.querySelector('#btn-dark').dataset.id=producto.id
            const clon=template_card.cloneNode(true)
            fragmnto.appendChild(clon)
      })
      cards.appendChild(fragmnto)
}

const aniadir=(e)=>{      
      if(e.target.classList.contains('btn-dark')){            
            setCarrito(e.target.parentElement)
      }
      e.stopPropagation()
}
const setCarrito=(objeto)=>{            
      const producto={                        
            title:objeto.querySelector('h5').textContent,
            precio:objeto.querySelector('p').textContent,
            id:objeto.querySelector('button').dataset.id,
            cantidad:1

      }
      if(carrito.hasOwnProperty(producto.id)){
            producto.cantidad=carrito[producto.id].cantidad+1
      }
      carrito[producto.id]= {...producto}      
      pintarCarrito()
}
const pintarCarrito=()=>{
                 
      items.innerHTML=''
      Object.values(carrito).forEach(producto=>{
            template_carrito.querySelector('th').textContent= producto.id
            template_carrito.querySelectorAll('td')[0].textContent = producto.title
            template_carrito.querySelectorAll('td')[1].textContent=producto.cantidad
            template_carrito.querySelector('.btn-primary').dataset.id = producto.id
            template_carrito.querySelector('.btn-danger').dataset.id=producto.id                        
            template_carrito.querySelector('span').textContent = producto.precio.slice(1,) * producto.cantidad
            const clon=template_carrito.cloneNode(true)
            fragmnto.appendChild(clon)            
      })
      items.appendChild(fragmnto)      
      pintarFooter()

      localStorage.setItem('carrito',JSON.stringify(carrito))
}
const pintarFooter=()=>{
      footer.innerHTML=''
      if(Object.keys(carrito).length===0){
            footer.innerHTML=`
                  <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
            `
            return
      }
      const nCantidad=Object.values(carrito).reduce((acc,{cantidad})=>acc+cantidad,0)
      const nPrecio=Object.values(carrito).reduce((acc,{cantidad,precio})=>acc+cantidad*precio.slice(1,),0)      
      template_footer.querySelectorAll('td')[0].textContent=nCantidad
      template_footer.querySelector('span').textContent=nPrecio
      const clone= template_footer.cloneNode(true)
      fragmnto.appendChild(clone)
      footer.appendChild(fragmnto) 
      
      
      const vaciar=document.getElementById('vaciar')           
      vaciar.addEventListener('click',()=>{
            carrito={}
            pintarCarrito()
      })
}
const btnAccion=e=>{
      if(e.target.classList.contains('btn-primary')){
            const producc=carrito[e.target.dataset.id]            
            producc.cantidad=carrito[e.target.dataset.id].cantidad+1
            carrito[e.target.dataset.id]={...producc}
            pintarCarrito()
      }
      if(e.target.classList.contains('btn-danger')){
            const producc=carrito[e.target.dataset.id]            
            producc.cantidad=carrito[e.target.dataset.id].cantidad-1
            if (producc.cantidad===0) {
                  
                  delete carrito[e.target.dataset.id]
            }
            //carrito[e.target.dataset.id]={...producc}
            pintarCarrito()
      }
      e.stopPropagation()
}
function confirmar(){
      setTimeout(()=>{
            collapse.classList.remove('bg-warning')
            collapse.classList.add('bg-success')
            element.innerHTML="Pago existoso en breve le enviaremos un correo con instrucciones para descarga"
      },3000)      
}
