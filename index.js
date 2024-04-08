const readline = require('readline');

// Função utilitária para criar interface de linha de comando
function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

// Função utilitária para imprimir uma mensagem e solicitar entrada do usuário
function prompt(message) {
  const rl = createInterface();
  return new Promise((resolve) => {
    rl.question(message, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Classe Contato
class Contato {
  constructor(nome, telefone, email) {
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
  }
}

// Adapter para adicionar/remover/listar contatos
class ContatoAdapter {
  constructor() {
    this.contatos = [];
  }

  adicionarContato(contato) {
    this.contatos.push(contato);
  }

  removerContato(nome) {
    this.contatos = this.contatos.filter(contato => contato.nome !== nome);
  }

  listarContatos() {
    return this.contatos;
  }
}

// Facade para buscar contatos
class BuscaContatosFacade {
  constructor(gerenciadorContatos) {
    this.gerenciadorContatos = gerenciadorContatos;
  }

  adicionarContato(contato) {
    this.gerenciadorContatos.adicionarContato(contato);
  }

  removerContato(nome) {
    this.gerenciadorContatos.removerContato(nome);
  }

  listarContatos() {
    return this.gerenciadorContatos.listarContatos();
  }

  buscarContatosPorNome(nome) {
    return this.gerenciadorContatos.listarContatos().filter(contato => contato.nome.includes(nome));
  }
}

// CLI para interação com o sistema
class CLI {
  constructor(gerenciadorContatosFacade) {
    this.gerenciadorContatosFacade = gerenciadorContatosFacade;
  }

  async adicionarContato() {
    const nome = await prompt("Nome: ");
    const telefone = await prompt("Telefone: ");
    const email = await prompt("Email: ");
    const novoContato = new Contato(nome, telefone, email);
    this.gerenciadorContatosFacade.adicionarContato(novoContato);
    console.log(`Contato ${nome} adicionado.`);
  }

  async removerContato() {
    const nome = await prompt("Nome do contato a ser removido: ");
    const contatosAntesRemocao = this.gerenciadorContatosFacade.listarContatos().length;
    this.gerenciadorContatosFacade.removerContato(nome);
    const contatosDepoisRemocao = this.gerenciadorContatosFacade.listarContatos().length;
    if (contatosAntesRemocao === contatosDepoisRemocao) {
        console.log(`Contato ${nome} não encontrado.`);
    } else {
        console.log(`Contato ${nome} removido.`);
    }
}


  listarContatos() {
    const contatos = this.gerenciadorContatosFacade.listarContatos();
    console.log("Lista de Contatos:");
    contatos.forEach(contato => console.log(contato.nome, contato.telefone, contato.email));
  }

  async buscarContatosPorNome() {
    const nome = await prompt("Nome para buscar: ");
    const contatosEncontrados = this.gerenciadorContatosFacade.buscarContatosPorNome(nome);
    if (contatosEncontrados.length === 0) {
        console.log(`Nenhum contato encontrado com o nome '${nome}'.`);
    } else {
        console.log(`Resultados da busca por '${nome}':`);
        contatosEncontrados.forEach(contato => console.log(contato.nome, contato.telefone, contato.email));
    }
}

}

// Interface para o usuário interagir
const gerenciadorContatos = new ContatoAdapter();
const buscaContatosFacade = new BuscaContatosFacade(gerenciadorContatos);
const cli = new CLI(buscaContatosFacade);

async function main() {
  while (true) {
    console.log("\nEscolha uma opção:");
    console.log("1. Adicionar Contato");
    console.log("2. Remover Contato");
    console.log("3. Listar Contatos");
    console.log("4. Buscar Contatos por Nome");
    console.log("5. Sair");

    const opcao = parseInt(await prompt("Opção: "));

    switch (opcao) {
      case 1:
        await cli.adicionarContato();
        break;
      case 2:
        await cli.removerContato();
        break;
      case 3:
        cli.listarContatos();
        break;
      case 4:
        await cli.buscarContatosPorNome();
        break;
      case 5:
        console.log("Saindo...");
        process.exit(0);
      default:
        console.log("Opção inválida!");
    }
  }
}

main();
