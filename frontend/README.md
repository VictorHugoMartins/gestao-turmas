# Sistema de Gestão de Turmas e Alunos

Este projeto é um sistema de gerenciamento de turmas e alunos, dividido em dois módulos: **backend** (Node.js com TypeScript) e **frontend** (React com TypeScript). O sistema permite criar, editar e gerenciar turmas, alunos e suas respectivas notas e frequência.

## Descrição do Minimundo

O sistema foi desenvolvido para gerenciar as seguintes entidades:
- **Alunos**: Cada aluno tem um nome, uma imagem associada e está automaticamente inscrito em todas as turmas disponíveis.
- **Turmas**: As turmas contêm alunos, e as **notas** e **frequências** são associadas a um aluno específico dentro de uma turma.
- **Notas e Frequência**: As notas e a frequência são atribuídas a um aluno em uma turma específica, e cada aluno tem sua frequência e nota registradas de forma independente para cada turma.

O backend organiza e expõe uma API RESTful para, por parte de um Professor com acesso a tal, a gestão das turmas, alunos, notas e frequência. O frontend consome essa API para exibir e permitir o gerenciamento das entidades.

### Funcionalidades

- Criar, editar e remover **turmas**.
- Adicionar, editar e remover **alunos**.
- Registrar e atualizar **notas** e **frequência** dos alunos em uma turma específica.
- Exibir a lista de alunos com notas e frequência. Se o aluno não tiver notas, é exibido "0" por padrão.
- Interface amigável para visualização e manipulação dos dados.

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