# Sistema de Gestão de Turmas e Alunos

Este projeto é um sistema de gerenciamento de turmas e alunos, dividido em dois módulos: **backend** (Node.js com TypeScript) e **frontend** (React com TypeScript). O sistema permite criar, editar e gerenciar turmas, alunos e suas respectivas notas e frequência.

## Descrição do Minimundo

O sistema foi desenvolvido para gerenciar as seguintes entidades:
- **Alunos**: Cada aluno tem um nome, uma imagem associada, uma frequencia e está automaticamente inscrito em todas as turmas disponíveis.
- **Turmas**: As turmas contêm alunos.
- **Notas**: As notas e a frequência são atribuídas a um aluno em uma turma específica.

O backend organiza e expõe uma API RESTful para, por parte de um Professor com acesso a tal, a gestão das turmas, alunos, notas e frequência. O frontend consome essa API para exibir e permitir o gerenciamento das entidades.

### Caso de Uso

Após uma maratona de provas de um semestre, o Professor Carlos abre o **Sistema de Gestão de Turmas e Alunos** para lançar as notas dos seus alunos. Logo ao abrir a página, ele percebe que algumas médias do sistema ainda estão nulas, o que indica que ele ainda não lançou notas para algumas de suas turmas. Então, ele navega até as abas da turma específica e edita a nota dos alunos restantes.

Posterior a isso, lembra que esse período está dando aula em uma turma nova, e decide adicioná-la logo ao sistema. Tendo adicionado-a ao sistema, cadastra cada um de seus alunos com as notas para cada uma das turmas (note que, aqui, os termos "turma" e "disciplina" são quase intercambiáveis, onde todos os alunos pertencem à todas as turmas). Como ele é bem atencioso, não precisa recorrer à aba de Resumo de Todas as Turmas para editar os dados de um aluno que possam ter sido eventualmente cadastrados erroneamente.

Preocupado com seus alunos, ele navega pelas abas de Turmas verificando quais frequências estão abaixo da média. Incentivador, também verifica quem são os alunos com as notas melhores que a média da turma, para poder parabenizá-los de alguma forma.

### Detalhes de Implementação
* Um professor pode possuir N turmas.
* Um aluno pertence à todas as N turmas. Associado às N turmas, um aluno possui N notas.
* Um aluno possui uma frequência que considera todas as turmas da qual faz parte. Um aluno possui 1 frequência.

### Funcionalidades

- Criar, editar e remover **turmas**.
- Adicionar, editar e remover **alunos** e **notas para cada uma de suas turmas**.
- Editar **notas** dos alunos.
- Filtrar alunos por **frequência e notas mínimas**.

### Tecnologias Utilizadas

#### Backend (Node.js com TypeScript)
- **Node.js**: Ambiente de execução para o JavaScript.
- **Express.js**: Framework para a criação da API RESTful.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.

#### Frontend (React com TypeScript)
- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Tipagem estática para garantir a integridade dos dados.
- **Material UI**: Componentes estilizados para o React.
- **Axios**: Biblioteca para fazer requisições HTTP ao backend.
- **Context API**: Utilizado para gerenciar o estado global da aplicação.

### Estrutura do Projeto

O projeto está dividido em duas pastas principais:
- **/backend**: Contém o servidor Node.js com a API e a lógica do banco de dados.
- **/frontend**: Contém o aplicativo React que consome a API e exibe a interface para o usuário.

### Funcionalidades Capturadas

#### Backend:
- **Alunos**: Cada aluno contém `id`, `nome`, e `image_url`.
- **Turmas**: Cada turma tem um `id` e um `nome`.
- **Notas**: As notas de cada aluno incluem `nota` e `frequência`, e estão associadas a um aluno e a uma turma específica.
  
#### Frontend:
- **CRUD de Turmas**: Criar, editar e excluir turmas.
- **CRUD de Alunos**: Adicionar, editar e excluir alunos.
- **Gerenciamento de Notas e Frequência**: Atualizar as notas e frequência dos alunos em cada turma.

### Pré-requisitos

- **Node.js** (v12+)
- **npm** ou **yarn**

### Como Rodar o Projeto

#### Backend:
1. Navegue até a pasta `backend`:
   ```bash
   cd backend
    ```

### Instale as dependências:
```bash
npm install
```

Inicie o servidor:
```bash
npm run dev
```
Frontend:
Navegue até a pasta frontend:
```bash
cd frontend
```
Instale as dependências:
```bash
npm install
```
Inicie o aplicativo React:
```bash
npm start
```

Desenvolvido por Victor Martins.