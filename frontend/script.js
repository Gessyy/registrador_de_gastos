const api = "http://127.0.0.1:5000";



async function carregarDados(){

    
    const respostaSaldo = await fetch(`${api}/saldo`);

    const saldo = await respostaSaldo.json();

    document.getElementById("total-receitas").innerText =
        `R$ ${saldo.total_receitas}`;

    document.getElementById("total-despesas").innerText =
        `R$ ${saldo.total_despesas}`;

    document.getElementById("saldo-total").innerText =
        `R$ ${saldo.saldo}`;



    const respostaReceitas =
        await fetch(`${api}/receitas`);

    const receitas =
        await respostaReceitas.json();

    const listaReceitas =
        document.getElementById("lista-receitas");

    listaReceitas.innerHTML = "";

    receitas.forEach(receita => {

        listaReceitas.innerHTML += `

            <li>

                <span>
                    ${receita.descricao}
                    (${receita.categoria})
                </span>

                <div>

                    <strong>
                        R$ ${receita.valor}
                    </strong>

                    <button onclick="deletarReceita(${receita.id})">
                        ❌
                    </button>

                </div>

            </li>

        `;

    });




    const respostaDespesas =
        await fetch(`${api}/despesas`);

    const despesas =
        await respostaDespesas.json();

    const listaDespesas =
        document.getElementById("lista-despesas");

    listaDespesas.innerHTML = "";

    despesas.forEach(despesa => {

        listaDespesas.innerHTML += `

            <li>

                <span>
                    ${despesa.descricao}
                    (${despesa.categoria})
                </span>

                <div>

                    <strong>
                        R$ ${despesa.valor}
                    </strong>

                    <button onclick="deletarDespesa(${despesa.id})">
                        ❌
                    </button>

                </div>

            </li>

        `;

    });

}




async function cadastrarReceita(){

    const descricao =
        document.getElementById("descricao").value;

    const valor =
        document.getElementById("valor").value;

    const categoria =
        document.getElementById("categoria").value;


    await fetch(`${api}/receitas`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            descricao,
            valor: Number(valor),
            categoria

        })

    });



    
    document.getElementById("descricao").value = "";

    document.getElementById("valor").value = "";

    document.getElementById("categoria").value = "";



    carregarDados();
}




async function cadastrarDespesa(){

    const descricao =
        document.getElementById("descricao-despesa").value;

    const valor =
        document.getElementById("valor-despesa").value;

    const categoria =
        document.getElementById("categoria-despesa").value;


    await fetch(`${api}/despesas`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            descricao,
            valor: Number(valor),
            categoria

        })

    });



    
    document.getElementById("descricao-despesa").value = "";

    document.getElementById("valor-despesa").value = "";

    document.getElementById("categoria-despesa").value = "";



    carregarDados();
}





async function deletarReceita(id){

    await fetch(`${api}/receitas/${id}`, {

        method: "DELETE"

    });

    carregarDados();
}





async function deletarDespesa(id){

    await fetch(`${api}/despesas/${id}`, {

        method: "DELETE"

    });

    carregarDados();
}




carregarDados();