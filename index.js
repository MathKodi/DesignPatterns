//Matheus Kodi Y. RA: 2503557

const readline = require('readline');

function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function prompt(message) {
  const rl = createInterface();
  return new Promise((resolve) => {
    rl.question(message, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

class Contato {
  constructor(nome, telefone, email) {
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
  }
}

class ContatoManager {
  adicionarContato(contato) {}
  removerContato(nome) {}
  listarContatos() {}
  buscarContatosPorNome(nome) {}
}

class ContatoAdapter extends ContatoManager {
  constructor() {
    super();
    this.contatos = [];
  }

  adicionarContato(contato) {
    this.contatos.push(contato);
  }

  removerContato(nome) {
    this.contatos = this.contatos.filter((contato) => contato.nome !== nome);
  }

  listarContatos() {
    return this.contatos;
  }

  buscarContatosPorNome(nome) {
    return this.contatos.filter((contato) => contato.nome.includes(nome));
  }
}

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
    return this.gerenciadorContatos.buscarContatosPorNome(nome);
  }
}

class CLI {
  constructor(contatoManager) {
    this.contatoManager = contatoManager;
  }

  async executar() {
    while (true) {
      console.log('\nEscolha uma opção:');
      console.log('1. Adicionar Contato');
      console.log('2. Remover Contato');
      console.log('3. Listar Contatos');
      console.log('4. Buscar Contatos por Nome');
      console.log('5. Sair');

      const opcao = parseInt(await prompt('Opção: '));

      switch (opcao) {
        case 1:
          await this.adicionarContato();
          break;
        case 2:
          await this.removerContato();
          break;
        case 3:
          this.listarContatos();
          break;
        case 4:
          await this.buscarContatosPorNome();
          break;
        case 5:
          console.log('Saindo...');
          process.exit(0);
        default:
          console.log('Opção inválida!');
      }
    }
  }

  async adicionarContato() {
    const nome = await prompt('Nome: ');
    const telefone = await prompt('Telefone: ');
    const email = await prompt('Email: ');
    const novoContato = new Contato(nome, telefone, email);
    this.contatoManager.adicionarContato(novoContato);
    console.log(`Contato ${nome} adicionado.`);
  }

  async removerContato() {
    const nome = await prompt('Nome do contato a ser removido: ');
    const contatosAntesRemocao = this.contatoManager.listarContatos().length;
    this.contatoManager.removerContato(nome);
    const contatosDepoisRemocao = this.contatoManager.listarContatos().length;
    if (contatosAntesRemocao === contatosDepoisRemocao) {
      console.log(`Contato ${nome} não encontrado.`);
    } else {
      console.log(`Contato ${nome} removido.`);
    }
  }

  listarContatos() {
    const contatos = this.contatoManager.listarContatos();
    console.log('Lista de Contatos:');
    contatos.forEach((contato) =>
      console.log(contato.nome, contato.telefone, contato.email),
    );
  }

  async buscarContatosPorNome() {
    const nome = await prompt('Nome para buscar: ');
    const contatosEncontrados = this.contatoManager.buscarContatosPorNome(nome);
    if (contatosEncontrados.length === 0) {
      console.log(`Nenhum contato encontrado com o nome '${nome}'.`);
    } else {
      console.log(`Resultados da busca por '${nome}':`);
      contatosEncontrados.forEach((contato) =>
        console.log(contato.nome, contato.telefone, contato.email),
      );
    }
  }
}

async function main() {
  const gerenciadorContatos = new ContatoAdapter();
  const buscaContatosFacade = new BuscaContatosFacade(gerenciadorContatos);
  const cli = new CLI(buscaContatosFacade);
  await cli.executar();
}

main();
