async function processarFormulario() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const cpf = document.getElementById("cpf").value;
    const celular = document.getElementById("celular").value;
    const agendamento = document.getElementById("agendamento").value;
    const observacoes = document.getElementById("observacoes").value;
    //const pagamento = document.getElementById("pagamento").value;    
    
    const categorias = Array.from(document.querySelectorAll('input[name="categorias"]:checked')).map(el => el.value);
    const produtos = Array.from(document.querySelectorAll('input[name="produtos"]:checked')).map(el => el.value);
    //inserido por mim
    // Captura a forma de pagamento selecionada
    const pagamento = Array.from (document.querySelector('input[name="pagamento"]:checked') ? document.querySelector('input[name="pagamento"]:checked').value : "Não selecionado");

    const texto = [
        "Pedido de Produtos - IT Chain Solutions",
        "",
        `Nome: ${nome} ${sobrenome}`,
        `CPF: ${cpf}`,
        `Celular: ${celular}`,
        `Categorias: ${categorias.join(", ")}`,
        `Produtos: ${produtos.join(", ")}`,        
        `Observações: ${observacoes}`,
        `Agendamento: ${agendamento}`,
        `Pagamento: ${pagamento.join("")}` //inserido por mim 
        

    ];

    doc.setFontSize(12);
    texto.forEach((line, i) => doc.text(line, 10, 10 + i * 10));
    //Substituição para deixar o nome do PDF mais dinâmico (abre)
    const agora = new Date();
    const timestamp = agora.toLocaleDateString("pt-BR").replace(/\//g, "-") + "_" +
                    agora.toLocaleTimeString("pt-BR").replace(/:/g, "-");
    const nomeArquivo = `pedido_${nome}_${sobrenome}_${timestamp}.pdf`;
    doc.save(nomeArquivo);
    //Substituição para deixar o nome do PDF mais dinâmico (fecha)

    const pedido = { nome, sobrenome, cpf, celular, categorias, produtos, observacoes, agendamento, pagamento };
    const banco = JSON.parse(localStorage.getItem("pedidos")) || [];
    banco.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(banco));
}