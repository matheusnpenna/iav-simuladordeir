<template>
  <div class="about-view grid grid-cols-3 divide-x divide-gray-400 px-8 py-8">
    <div class="pr-4">
      <h2 class="text-3xl mb-2">Destinação Fiscal</h2>
      <p class="text-sm text-slate-500 mb-8">
        A legislação possibilita que empresas e pessoas físicas destinem parte do IR devido aos projetos sociais.
      </p>
      <h2 class="text-2xl mb-2">Quem pode?</h2>
      <p class="text-sm text-slate-500 mb-2">
        Empresas tributadas pelo lucro real e pessoas físicas que declarem o IRPF pelo formulário completo podem
        destinar. As empresas podem destinar até 8% do IR devido a projetos culturais, esportivos, na área da saúde, bem
        como aqueles que beneficiem crianças e adolescentes. Já para as pessoas físicas o limite é de 6%.
      </p>
      <h2 class="text-2xl mb-2">Quando?</h2>
      <p class="text-sm text-slate-500 mb-2">
        Empresas que apuram o lucro real trimestralmente devem destinar o IR apurado até o final do período. Já aquelas
        que apuram anualmente, podem destinar até o último dia útil bancário de cada ano. Pessoas físicas devem destinar
        até o último dia útil bancário de cada ano, com exceção do apoio a projeto com crianças e adolescentes, que
        podem receber 3% até tal data e os outros 3% até o último dia para declarar o IRPF.
      </p>
      <h2 class="text-2xl mb-2">Como?</h2>
      <p class="text-sm text-slate-500 mb-2">
        Cada modalidade de incentivo bem uma forma de receber os recursos de empresas e pessoas físicas, mas todas elas
        são seguras, seguem as normas da Receita Federal e são fiscaliza- das pelos Tribunais de Contas.
      </p>
      <h2 class="text-2xl mb-2">Exemplo</h2>
      <table class="mb-4">
        <tr class="text-sm text-slate-500 ">
          <td>Lucro</td>
          <td>R$ 1.000.000,00</td>
        </tr>
        <tr class="text-sm text-slate-500 ">
          <td>Imposto normal (R$ Lucro x 15%)</td>
          <td>R$ 150.000,00</td>
        </tr>
        <tr class="text-sm text-slate-500 ">
          <td>Incentivo (Imposto normal x 8%)</td>
          <td>R$ 12.000,00</td>
        </tr>
      </table>
      <p class="text-sm text-slate-500 ">
        Adicional do IRPJ de 10% sobre o lucro superior a R$ 240.000,00 ao ano.
      </p>
    </div>
    <div class="px-8">
      <h2 class="text-3xl mb-2">Benefícios</h2>
      <ul class="list-disc text-sm text-slate-500 mb-4">
        <li>Funcionários mais comprometidos e engajados</li>
        <li>Mudança na forma como os consumidores enxergam a empresa</li>
        <li>Diferencial competitivo no mercado</li>
        <li>Alinhamento aos negócios</li>
        <li>Estímulo na área de Responsabilidade Social da empresa</li>
        <li>Acompanhamento de perto do uso dos recursos destinados</li>
        <li>Priorização da utilização do imposto para necessidades legítimas da sociedade</li>
        <li>Impacto social relevante e adesão à agenda ESG com custo zero</li>
      </ul>


      <h2 class="text-2xl mb-2">Nossa Campanha</h2>
      <p class="text-sm text-slate-500 mb-2">
        Todos anos o Instituto Água Viva Grabalha para arrecadar recursos mediante a destinação de IR de empresas e
        pessoas físicas.
        Temos grande experiência nesta modalidade de arrecadação e execução de projetos. Todas as nossas contas foram
        aprovadas até hoje e OS projetos já impactaram 154 mil pessoas.
        <br /><br />
        Caso a empresa ou pessoa física não tenha IR a ser recolhido, também recebemos doações em nossas campanhas
        recorrentes, que podem ser feitas pelo acesso ao nosso site www.institutoaguaviva.org.br.
      </p>
    </div>
    <div class="pl-4">
      <h2 class="text-3xl mb-2">Projetos</h2>
      <h2 class="text-xl mb-2">Pessoas Júridicas</h2>
      <el-card v-for="(p, i) in projects['juridica']" :key="i" class="mb-4">
        <div class="grid grid-cols-2 divide-x divide-gray-400 text-sm text-slate-500">
          <div>
            <div>
              <div>{{ p.percent }}%</div>
              <div>{{ p.area }}</div>
            </div>
            <div>
              {{ p.name }}
            </div>
          </div>
          <div class="pl-3">
            <h5 class="text-md mb-2">Dados</h5>
            <div>CNPJ: {{ p.data.cnpj }}</div>
            <div>{{ p.data.bank }}</div>
            <div>cc: {{ p.data.cc }}</div>
            <div>ag: {{ p.data.ag }}</div>
          </div>
        </div>
      </el-card>
      <h2 class="text-xl mb-2">Pessoas Físicas</h2>
      <el-card v-for="(p, i) in projects['fisica']" :key="i" class="mb-4">
        <div class="grid grid-cols-2 divide-x divide-gray-400 text-sm text-slate-500">
          <div>
            <div>
              <div>{{ p.percent }}%</div>
              <div>{{ p.area }}</div>
            </div>
            <div>
              {{ p.name }}
            </div>
          </div>
          <div class="pl-3">
            <h5 class="text-md mb-2">Dados</h5>
            <div>CNPJ: {{ p.data.cnpj }}</div>
            <div>{{ p.data.bank }}</div>
            <div>cc: {{ p.data.cc }}</div>
            <div>ag: {{ p.data.ag }}</div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script setup>
import { PROJECTS_BY_PEOPLE_TYPE } from "@/constants";
const projects = PROJECTS_BY_PEOPLE_TYPE;
</script>
<style scoped>
table,
th,
td {
  border: 1px solid black;
}
</style>