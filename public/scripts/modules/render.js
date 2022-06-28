
export const renderObjetos = (node,arrObjeto,accion,titulo)=>{


    if(accion === "Eliminar"){
        node.innerHTML =`<h2>${titulo}</h2> <input type="button" name="comprar" id="btn-procesar-compra" value="Enviar Pedido">`;  
    }
    else{
        node.innerHTML =`<h2>${titulo}</h2>`;
    }
    node.appendChild(createTable(arrObjeto,accion));
}

const createTable =(arrObjetos,accion)=>{
    const table = document.createElement("table");
    table.appendChild(createThead(arrObjetos));
    table.appendChild(createTbody(arrObjetos,accion));
    return table;
}
const createThead = (arrObjetos)=>{
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    if(Array.isArray(arrObjetos))
    {   
        for (const iterator in arrObjetos[0]){
            if(iterator === "id"){
                tr.innerHTML+= `<th>ACCION</th>`;
            }
            else if(iterator == "desc"){
                continue;
            }
            else if(iterator === "urlImg"){
                tr.innerHTML+= `<th>FOTO</th>`;
            }else{
                tr.innerHTML+= `<th>${iterator.toUpperCase()}</th>`;
            }
           
        }
    }

    thead.appendChild(tr);
    return thead;
}
const createTbody = (arrObjetos,accion)=>{
    const tbody = document.createElement("tbody");
    
    if(Array.isArray(arrObjetos))
    {
        arrObjetos.forEach(element=>{
            const tr = document.createElement("tr");
            for (const iterator in element) {
                if(iterator === "id"){

                    tr.setAttribute("data-id",element[iterator]);
                    tr.innerHTML+= `<td><button class="btn-${accion}">${accion}</button></td>`;
                }else if(iterator === "urlImg"){
                    tr.innerHTML+=`<td><img src="${element[iterator]}" alt="${element["title"]}"></td>`
                }else if(iterator === "desc"){
                   continue;
                }
                else{
                    tr.innerHTML+=`<td>${element[iterator]}</td>`
                }
            }
            tbody.appendChild(tr);
        });
    }
    return tbody;
}