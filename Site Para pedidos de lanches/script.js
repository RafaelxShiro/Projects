// ---------- DADOS ----------
let usuarios = {"Jhessica": "senha125"};       // { "joao": "1234" }
let usuarioAtual = null; // quem está logado
let carrinho = [];       // itens do pedido

const cardapio = [
  { nome: "Hambúrguer", preco: 15 },
  { nome: "X-Bacon", preco: 20 },
  { nome: "Cachorro-quente", preco: 10 },
  { nome: "Batata frita", preco: 12 },
  { nome: "Refrigerante", preco: 6 }
];

const app = document.getElementById("app");


// ---------- TELA DE LOGIN ----------
function telaLogin() {
  app.innerHTML = `
    <h2>Entrar ou cadastrar</h2>
    <input id="nome" placeholder="Nome de usuário">
    <input id="senha" type="password" placeholder="Senha (mín. 4)">
    <p class="erro" id="erro"></p>
    <button class="btn-principal" onclick="login()">Entrar</button>
    <button class="btn-principal" onclick="cadastro()">Cadastrar</button>
  `;
  document.body.className = "login";
}

function cadastro() {
  const nome = document.getElementById("nome").value.trim();
  const senha = document.getElementById("senha").value;

  if (nome === "" || senha.length < 4) {
    document.getElementById("erro").textContent = "Preencha nome e senha (mín. 4).";
    return;
  }
  if (usuarios[nome]) {
    document.getElementById("erro").textContent = "Nome já cadastrado.";
    return;
  }
  usuarios[nome] = senha;
  usuarioAtual = nome;
  telaCardapio();
}

function login() {
  const nome = document.getElementById("nome").value.trim();
  const senha = document.getElementById("senha").value;

  if (usuarios[nome] === senha) {
    usuarioAtual = nome;
    telaCardapio();
  } else {
    document.getElementById("erro").textContent = "Nome ou senha incorretos.";
  }
}


// ---------- TELA DE CARDÁPIO ----------
function telaCardapio() {
  let html = `<h2>Olá, ${usuarioAtual}!</h2><h3>O que você quer?</h3>`;

  cardapio.forEach(function (item, i) {
    html += `<div class="item" onclick="adicionar(${i})">
               ${item.nome} — R$ ${item.preco.toFixed(2)}
             </div>`;
  });

  if (carrinho.length > 0) {
    html += `<button class="btn-principal" onclick="telaCarrinho()">Ver carrinho (${carrinho.length})</button>`;;
  }

  app.innerHTML = html;
  document.body.className = "interno";
}

function adicionar(i) {
  const item = cardapio[i];
  const obs = prompt("Alguma observação? (ex: sem cebola)", "");
  carrinho.push({ nome: item.nome, preco: item.preco, obs: obs || "" });
  alert(item.nome + " adicionado!");
  telaCardapio();
}


// ---------- TELA DE CARRINHO ----------
function telaCarrinho() {
  let html = "<h2>Seu carrinho</h2>";
  let total = 0;

  carrinho.forEach(function (item, i) {
    html += `<div class="item">
               ${item.nome} — R$ ${item.preco.toFixed(2)}
               ${item.obs ? "<br><small>" + item.obs + "</small>" : ""}
               <button class="btn-secundario" onclick="remover(${i})">Remover</button>
             </div>`;
    total += item.preco;
  });

  html += `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
  html += `<button class="btn-principal" onclick="telaEntrega()">Continuar</button>`;
html += `<button class="btn-principal" onclick="telaCardapio()">Adicionar mais</button>`;

  app.innerHTML = html;
  document.body.className = "interno";
}

function remover(i) {
  carrinho.splice(i, 1);
  telaCarrinho();
}


// ---------- TELA DE ENTREGA ----------
function telaEntrega() {
  app.innerHTML = `
    <h2>Entrega</h2>
    <input id="endereco" placeholder="Endereço completo">
    <input id="telefone" placeholder="Telefone">
    <select id="pagamento">
      <option>Pix</option>
      <option>Cartão</option>
      <option>Dinheiro</option>
    </select>
    <p class="erro" id="erro"></p>
    <button class="btn-principal" onclick="finalizar()">Finalizar pedido</button>
    <button class="btn-secundario" onclick="telaCarrinho()">Voltar</button>
  `;
  document.body.className = "interno";
}


// ---------- TELA FINAL ----------
function finalizar() {
  const endereco = document.getElementById("endereco").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const pagamento = document.getElementById("pagamento").value;

  if (endereco === "" || telefone === "") {
    document.getElementById("erro").textContent = "Preencha tudo.";
    return;
  }

  const tempo = 20 + carrinho.length * 5;
  const total = carrinho.reduce(function (s, i) { return s + i.preco; }, 0);

  document.body.className = "interno";
  
  app.innerHTML = `
    <h2>Pedido confirmado! 🎉</h2>
    <p>Obrigado, ${usuarioAtual}!</p>
    <p>Endereço: ${endereco}</p>
    <p>Pagamento: ${pagamento}</p>
    <p>Total: R$ ${total.toFixed(2)}</p>
    <h3>Tempo estimado de entrega:</h3>
    <div class="tempo">${tempo} min</div>
    <button class="btn-principal" onclick="novoPedido()">Novo pedido</button>
    <button class="btn-secundario" onclick="encerrar()">Encerrar atendimento</button>
  `;

  carrinho = [];
}

function encerrar() {
  usuarioAtual = null;
  carrinho = [];

  app.innerHTML = `
    <h2>Programa encerrado!</h2>
    <p>Obrigado por utilizar o Lanche Fácil.</p>
  `;
}

function novoPedido() {
  telaCardapio();
}


// ---------- INÍCIO ----------
telaLogin();