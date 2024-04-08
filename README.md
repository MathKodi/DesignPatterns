# Sistema de Gerenciamento de Contatos - Design Pattern 

Um sistema simples de gerenciamento de contatos . Ele permite adicionar, remover, listar e buscar contatos pelo nome através de uma interface de linha de comando (CLI). O código foi estruturado utilizando os padrões de projeto: Adapter e Facade.
Disciplina de Arquitetura de Software (AS64B), ministrada pelo professor Diego Addan.

## Funcionalidades

O sistema possui tais funcionalidades:
- Adicionar contatos
- Remover contatos
- Listar contatos
- Buscar contatos por nome

## Padrões de Projeto Utilizados

### Adapter

Adapter: Utilizado para adaptar a classe Contato para o GerenciadorContatos existente (representado pela classe ContatoAdapter). Isso permite que a adição, remoção e listagem de contatos sejam realizadas sem modificar a classe Contato. Se futuramente houver necessidade de mudança no modo como os contatos são armazenados ou gerenciados, apenas a implementação do adapter precisa ser alterada.

### Facade

Facade: Utilizado para simplificar a interface do GerenciadorContatos para a busca de contatos. Isso permite que a lógica de busca seja isolada do restante do sistema. Se mudanças forem necessárias na forma como os contatos são buscados, apenas a implementação da fachada precisa ser alterada, sem afetar o restante do código.

## Como Usar

1. Baixe o código.
2. Certifique-se de que você tem o Node.js instalado em seu sistema. Você pode baixá-lo e instalá-lo a partir do site oficial. <https://nodejs.org/en>
3. Execute o arquivo com o comando no terminal `node index.js`.
4. Interaja com o menu de opções, digitando o número correspondente à opção desejada.
