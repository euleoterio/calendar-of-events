### Backend do Calendário de Eventos

Este é o backend do projeto de calendário de eventos, desenvolvido com Quarkus. Ele fornece uma API RESTful para gerenciar eventos e instituições.

### Tecnologias Utilizadas

- **Quarkus:** Framework Java para construção de aplicações nativas em nuvem.
- **Hibernate ORM with Panache:** Facilita o acesso e manipulação de dados no banco de dados usando o padrão Active Record.
- **Quarkus JDBC PostgreSQL:** Integração com o PostgreSQL para persistência de dados.
- **Quarkus RESTEasy:** Utilizado para criar endpoints RESTful na aplicação.
- **Quarkus Hibernate Validator:** Utilizado para validar as entradas dos usuários de acordo com as regras definidas.
- **Lombok:** Biblioteca para reduzir o código boilerplate em classes Java.
- **Jakarta WS RS API:** API padrão para criar serviços web RESTful em Java.
- **Quarkus Scheduler:** Utilizado para agendar tarefas de forma programática.

### Como Executar o Projeto

1. Certifique-se de ter o Java JDK 17 instalado em sua máquina.
2. Clone este repositório em sua máquina local.
3. Navegue até o diretório do projeto backend.
4. Execute o comando `./mvnw compile quarkus:dev` para iniciar o servidor Quarkus em modo de desenvolvimento.
5. A aplicação estará disponível em `http://localhost:8080`.