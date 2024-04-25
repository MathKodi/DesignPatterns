# Sistema de Gerenciamento de Contatos - LISTA 2 SOLID

Um sistema simples de gerenciamento de contatos . Ele permite adicionar, remover, listar e buscar contatos pelo nome através de uma interface de linha de comando (CLI). O código foi refatorado utilizando os padrões de projeto SOLID.
Disciplina de Arquitetura de Software (AS64B), ministrada pelo professor Diego Addan.

## Funcionalidades

O sistema possui tais funcionalidades:

- Adicionar contatos
- Remover contatos
- Listar contatos
- Buscar contatos por nome

## UML Design Pattern

A classe Contato possui atributos para nome, telefone e email.
A classe ContatoAdapter possui uma relação de composição com Contato, pois é composta por uma lista de contatos.
A classe BuscaContatosFacade possui uma relação de associação com ContatoAdapter, utilizando-o para gerenciar os contatos.
A classe CLI possui uma relação de associação com BuscaContatosFacade, utilizando-a para interagir com os contatos.

## UML SOLID

Contato: Representa um contato com nome, telefone e email.
ContatoManager: Define a interface para gerenciamento de contatos, com métodos para adicionar, remover, listar e buscar contatos.
ContatoAdapter: Implementa ContatoManager, adaptando as operações de gerenciamento de contatos para uma lista de contatos.
BuscaContatosFacade: Fornece uma interface simplificada para buscar contatos, utilizando um ContatoManager.
CLI: Classe para interação com o usuário, depende de um ContatoManager para realizar operações de gerenciamento de contatos.

## Refatorações Utilizadas

### 1. Princípio da Responsabilidade Única (SRP)

O SRP afirma que uma classe deve ter apenas uma razão para mudar. Vamos separar a responsabilidade de interação com o usuário da lógica de gerenciamento de contatos.

### 2. Princípio Aberto/Fechado (OCP)

O OCP preconiza que as classes devem ser abertas para extensão, mas fechadas para modificação. Vamos criar uma interface ContatoManager para abstrair as operações de gerenciamento de contatos e permitir a extensão através de diferentes implementações.

### 3. Princípio da Inversão de Dependência (DIP)

O DIP sugere que as classes de alto nível não devem depender de classes de baixo nível, mas sim de abstrações. Vamos aplicar esse princípio na classe CLI para que ela dependa da interface ContatoManager em vez de depender diretamente do ContatoAdapter.

## Como Usar

1. Baixe o código.
2. Certifique-se de que você tem o Node.js instalado em seu sistema. Você pode baixá-lo e instalá-lo a partir do site oficial. <https://nodejs.org/en>
3. Execute o arquivo com o comando no terminal `node index.js`.
4. Interaja com o menu de opções, digitando o número correspondente à opção desejada.
