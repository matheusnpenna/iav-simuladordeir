<template>
  <main class="py-5">
    <div class="grid grid-cols-2 divide-x divide-gray-400">
      <div class="flex flex-col p-4">
        <div class="mb-5">
          <span class="mr-4">Digite o valor a pagar</span>
          <el-input v-model="value" label="XXXX" style="width: 240px" placeholder="Ex: 20.000"
            :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')"
            :parser="(value) => value.replace(/\$\s?|(,*)/g, '')" />
        </div>
        <span class="mr-4">Escolha o tipo de pessoa</span>
        <el-radio-group v-model="people_type" class="mb-4">
          <el-radio value="fisica" size="large">Pessoa Física</el-radio>
          <el-radio value="juridica" size="large">Pessoa Jurídica</el-radio>
        </el-radio-group>
        <el-button type="primary">Calcular doação</el-button>
      </div>
      <div class="flex flex-col p-4">
        <h2 class="text-2xl font-semibold mb-2">Valor permitido para doação: {{ donation_value }}</h2>
        <span class="text-sm text-slate-500 mb-8">Clique nos projetos abaixo para simular quanto doar para cada
          um</span>
        <el-card v-for="(p, i) in projects" :key="i" style="max-width: 480px" class="mb-4 cursor-pointer"
          :class="{ 'border-solid border-2 border-teal-400': selected_projects.find(s => s.id == p.id) }"
          @click="select(p)">
          <div class="grid grid-cols-2 divide-x divide-gray-400">
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
  </main>
</template>
<script setup>
import { ref } from 'vue'
const value = ref('')
const people_type = ref('')
const donation_value = ref('-')
const selected_projects = ref([])
const projects = [
  {
    id: 1,
    percent: 4,
    area: "Cultura",
    name: "Plano anual educação/cultura",
    data: {
      cnpj: 22941057000632,
      bank: "Banco do Brasil",
      ag: "3431-2",
      cc: "6.286-3"
    }
  },
  {
    id: 2,
    percent: 1,
    area: "Fundo Criança",
    name: "Odontovan Reter-cisternas apicultura esporte",
    data: {
      cnpj: 33853909000141,
      bank: "Banco do Brasil",
      ag: "34.257-2",
      cc: "1110-X"
    }
  },
  {
    id: 3,
    percent: 1,
    area: "Fundo Idoso",
    name: "Odontovan Reter-cisternas apicultura esporte",
    data: {
      cnpj: 48992364000121,
      bank: "Banco do Brasil",
      ag: "1011-1",
      cc: "24.351-5"
    }
  },
  {
    id: 4,
    percent: 2,
    area: "Lei Desporto",
    name: "Esporte para criança e adolescente",
    data: {
      cnpj: 22941057000128,
      bank: "Banco do Brasil",
      ag: "3431-2",
      cc: "6.328-2"
    }
  },
]
</script>
