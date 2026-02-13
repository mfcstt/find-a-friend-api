# 🐾 FindAFriend API

API para um sistema de adoção de animais, desenvolvida seguindo os princípios **SOLID** e com **testes automatizados**.

A aplicação permite o cadastro de **ORGs** e **pets**, além da listagem de animais disponíveis para adoção por **cidade**, com filtros por características.  
O contato para adoção é feito diretamente via **WhatsApp** com a ORG responsável pelo pet.

---

## ✨ Funcionalidades da Aplicação

- [x] Cadastro de pets  
- [ ] Listagem de pets disponíveis para adoção por cidade  
- [ ] Filtro de pets por características (idade, porte, energia, etc.)  
- [x] Visualização dos detalhes de um pet específico  
- [x] Cadastro de ORGs (organizações)  
- [x] Autenticação/login de ORGs no sistema  

---

## 📋 Regras de Negócio

As seguintes regras devem ser respeitadas:

- [ ] A cidade é obrigatória para listar os pets  
- [x] Uma ORG deve possuir, obrigatoriamente:
  - Endereço
  - Número de WhatsApp  
- [x] Todo pet cadastrado deve estar vinculado a uma ORG  
- [ ] O contato do usuário interessado na adoção é feito diretamente com a ORG via WhatsApp  
- [ ] Todos os filtros de características do pet são opcionais, **exceto a cidade**  
- [ ] Para que uma ORG tenha acesso administrativo à aplicação, ela deve estar autenticada  

---

## 🧪 Qualidade de Código

- Princípios **SOLID**
- Testes automatizados
- Separação de responsabilidades
- Arquitetura pensada para fácil manutenção e escalabilidade

---

## 🚀 Objetivo do Projeto

Este projeto tem como objetivo praticar boas práticas de desenvolvimento back-end, arquitetura de software e testes, simulando um cenário real de uma API para adoção de animais.
