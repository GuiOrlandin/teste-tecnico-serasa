# Minhas Dívidas

Fluxo para escolher uma oferta, a forma de pagamento e confirmar um acordo. Os valores da tela são calculados a partir do valor negociado e do percentual de desconto.

## Como executar

Requisitos: Node.js 20.9 ou superior.

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). A listagem de ofertas abre direto, sem login.

Para ver o erro de checkout, avance até a revisão com este endereço, aceitando os termos e confirmando:

```text
/revisao?oferta=banco-horizonte&forma=pix&checkout=erro
```

A confirmação permanece na revisão e mostra o aviso. Sem `checkout=erro`, a confirmação segue para a tela de simulação do Pix ou do boleto. Essa tela deixa explícito que nenhum pagamento é cobrado.

## Testes

```bash
npm test
npm run typecheck
```

Os testes cobrem a listagem com o valor real da Conecta Telecom, a escolha do Boleto com o aceite dos termos, e o checkout quando a API responde 500.

## Resumo da solução

A aplicação é Next.js com App Router. Cada passo (`/ofertas`, `/pagamento`, `/revisao`, `/simulacao`) é renderizado no servidor, já com os valores calculados. O cliente hidrata a interação, guarda o aceite dos termos e a forma de pagamento em estado local, e usa React Query para consultar a API e confirmar o acordo. O MSW responde essa API no `npm run dev` e nos testes, com os mesmos handlers.

O código está dividido em três módulos: Catálogo (ofertas e formas de pagamento), Acordo (pagamento, revisão, checkout e simulação) e Shell (quadro da aplicação). O que as telas compartilham sem regra de negócio fica em `shared`. O contrato entre Catálogo e Acordo é a URL, com a oferta e a forma de pagamento.

### Por que renderizar no servidor

A pessoa abre a listagem para comparar valores. Se a primeira busca acontecesse só no navegador, o HTML chegaria vazio e a tela ficaria em "Carregando" até a API responder. Renderizar no servidor faz essa busca antes de enviar a página. O HTML já traz credor, valor negociado e desconto. Recarregar a revisão mostra o número na hora.

A conta em centavos e o vencimento rodam nessa mesma passagem, no fuso de Brasília. O dia do Pix e o do boleto não mudam quando o navegador hidrata a página no fuso do computador de quem abriu.

O React Query guarda o resultado. O servidor preenche o cache e o cliente hidrata com a mesma chave. Enquanto o dado está no periodo de staleTime, voltar para a listagem ou para as formas de pagamento não dispara outra busca. Rádio, aceite dos termos e confirmação ficam no navegador. O checkout confirma com um POST. Na simulação, o código Pix e o boleto são fictícios, e a tela deixa claro que nenhum pagamento é cobrado.

### Por que o monólito com módulos

Continua um processo só: um `npm run dev`, um build, um deploy. Dividir em módulos aponta quem responde por cada parte do negócio.

Catálogo possui a oferta e a conta. Acordo possui pagamento, revisão, checkout e simulação. Shell só monta o quadro. Cada um publica um `index`, e quem está fora importa só essa porta.

O ganho aparece no crescimento. Mudar o vencimento fica no Acordo e deixa a listagem quieta. Mudar o card da oferta fica no Catálogo e deixa o checkout quieto. A regra deixa de morar no componente mais próximo.

A URL, com `oferta` e `forma`, é o contrato entre Catálogo e Acordo. É também o ponto em que os dois poderiam sair deste processo mais tarde. Hoje essa divisão fica só no código.
