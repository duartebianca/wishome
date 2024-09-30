# 🎁 Wishome - Lista de Presentes

**Wishome** é uma aplicação para criar e gerenciar listas de presentes, onde há dois tipos de usuários: **wisher** e **gifters**. A wisher pode adicionar uma lista de presentes que deseja receber, enquanto os gifters podem marcar produtos como "pensando" ou "comprado". A wisher tem controle sobre quem pode visualizar seu endereço e acompanhar quem comprou ou está pensando em comprar determinados produtos.

## 🛠 Funcionalidades

- **Wisher**:
  - Único usuário responsável por criar e gerenciar a lista de presentes.
  - Pode visualizar quem está pensando ou quem comprou cada item.
  - Valida os gifters para que possam visualizar o endereço de entrega.
- **Gifters**:
  - Podem se registrar na plataforma e visualizar a lista de presentes.
  - Podem marcar produtos como "pensando" ou "comprado".
  - Podem copiar o endereço da wisher (somente após serem validados).
- **Produtos**:
  - Todos os usuários podem ver o status dos produtos: **disponível**, **pensando**, ou **comprado**.
  - A wisher pode ver quais gifters estão associados a produtos marcados como "pensando" ou "comprado".

## 🚀 Tecnologias Utilizadas

### Frontend:

- **React** com **React Router**: Navegação entre páginas.
- **Chakra UI**: Biblioteca de componentes de interface.
- **Firebase Authentication SDK**: Para autenticação dos usuários (gifters e wisher).

### Backend:

- **Node.js** com **Firebase Functions** (ou Express.js) para gerenciar lógica de backend.
- **Firebase Firestore**: Banco de dados NoSQL para armazenar informações de usuários e produtos.
- **Firebase Admin SDK**: Para gerenciar autenticação e comunicação segura com o Firestore.

## 📂 Estrutura de Pastas

```
/src
│
├── /app
│   ├── /home         # Página principal
│   ├── /login        # Página de login de gifters
│   ├── /register     # Página de registro de gifters
│   ├── /list         # Página da lista de presentes
│   ├── /password
│   │   ├── /recover  # Página de recuperação de senha
│   │   └── /reset    # Página de redefinição de senha
│   └── /notFound     # Página 404
│
├── /firebase-config.js   # Configuração do Firebase SDK
├── App.tsx               # Arquivo principal da aplicação React
└── index.tsx             # Ponto de entrada da aplicação React
```

## 🏗 Funcionalidades do Backend

- **Criação de Gifters**: Os gifters podem se registrar na plataforma, e suas informações são armazenadas no Firebase Authentication e Firestore.
- **Autenticação**: Utilizamos o Firebase Authentication para gerenciar o login e a criação de usuários.
- **Gestão de Produtos**:
  - Gifter pode marcar produtos como "pensando" ou "comprado".
  - A wisher pode visualizar todos os gifters associados a um produto.
- **Segurança**: Todas as interações são autenticadas com tokens JWT gerados pelo Firebase, e os dados são protegidos por regras de segurança no Firestore.

## 📝 Instalação e Execução

### Pré-requisitos

- **Node.js**: [Download](https://nodejs.org/)
- **npm** ou **yarn**

### Passos para Executar o Projeto

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/wishome.git
cd wishome
```

2. Instale as dependências:

```bash
npm install
```

3. Configuração do Firebase:

   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/).
   - Ative **Firebase Authentication** e **Cloud Firestore**.
   - Baixe o arquivo `serviceAccountKey.json` da conta de serviço e coloque-o na pasta `/firebase`.
   - Configure o arquivo `firebase-config.js` com as credenciais do seu projeto.

4. Inicie a aplicação:

```bash
npm start
```

### Deployment com Firebase Hosting (Opcional)

1. Instale as ferramentas do Firebase:

```bash
npm install -g firebase-tools
```

2. Autentique-se no Firebase:

```bash
firebase login
```

3. Inicialize o Firebase Hosting no projeto:

```bash
firebase init hosting
```

4. Faça o deploy:

```bash
firebase deploy
```

## 📚 Regras de Segurança no Firestore

Aqui está um exemplo das regras de segurança que garantem que apenas usuários autorizados possam modificar ou visualizar dados:

```plaintext
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /products/{productId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && (request.auth.uid in resource.data.thinkers || resource.data.buyer == request.auth.uid || resource.data.status == "disponível");
    }

    match /wishers/{wisherId} {
      allow read, write: if request.auth != null && request.auth.token.role == 'wisher';
    }
  }
}
```

## 🔐 Segurança

- **Senhas Criptografadas**: As senhas dos gifters são gerenciadas pelo Firebase Authentication, que já lida com a criptografia de maneira segura.
- **Dados dos Usuários Protegidos**: Somente o próprio usuário ou o wisher pode acessar ou modificar seus dados.
- **Tokens de Autenticação**: O acesso às rotas protegidas é controlado por tokens JWT gerados pelo Firebase.

## 🎯 Funcionalidades Futuras

- **Autenticação de Dois Fatores** para maior segurança.
- **Notificações por Email** para notificar o wisher quando um produto for marcado como "comprado".
- **Integração com APIs de Pagamento** para compras diretas através da plataforma.

## 👨‍💻 Contribuições

1. Faça um fork do projeto.
2. Crie uma branch com sua nova funcionalidade: `git checkout -b nova-funcionalidade`.
3. Faça o commit: `git commit -m 'Adiciona nova funcionalidade'`.
4. Faça o push: `git push origin nova-funcionalidade`.
5. Crie um Pull Request.

---

Espero que esse **README** te ajude a organizar e documentar bem o seu projeto. Se precisar de mais alguma coisa, estou à disposição!
