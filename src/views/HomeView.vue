<template>
  <main class="py-5">
    <div class="grid grid-cols-2 divide-x divide-gray-400">
      <div class="flex flex-col p-4">
        <div class="mb-5">
          <span class="mr-4">Digite o valor a pagar</span>
          <el-input v-model="value" label="XXXX" style="width: 240px" placeholder="Ex: 20.000" />
          <!-- :formatter="formatter.format" :parser="parser" /> -->
        </div>
        <span class="mr-4">Escolha o tipo de pessoa</span>
        <el-radio-group v-model="people_type" class="mb-4">
          <el-radio value="fisica" size="large">Pessoa Física</el-radio>
          <el-radio value="juridica" size="large">Pessoa Jurídica</el-radio>
        </el-radio-group>
        <el-button class="mb-8" type="primary" :disabled="!is_valid_fields" @click="calculate">Calcular
          doação</el-button>
        <template v-if="show_projects">
          <h2 class="text-2xl font-semibold mb-2">Valor máximo permitido para doação: R$ {{ donation_value }}</h2>
          <span class="text-sm text-slate-500 mb-8">Clique nos projetos abaixo para simular quanto doar para cada
            um</span>
          <el-card v-for="(p, i) in projects[people_type]" :key="i" style="max-width: 480px" class="mb-4 cursor-pointer"
            :body-class="{ 'border-solid border-2 border-sky-500': !!selected_projects.find(s => s.id == p.id) }"
            @click="on_select(p)">
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
        </template>
      </div>
      <div class="flex flex-col p-4 divide-y divide-gray-400">
        <div v-for="(p, i) in selected_projects" :key="`don-${i}`" class="mb-4 pt-4">
          <h4 class="text-xl">{{ p.name }}</h4>
          <div class="text-md">Valor: R$ {{ p.donate_value }}</div>
          <a href="/como-doar" class="underline text-sky-500 cursor-pointer">Clique aqui para aprender como doar</a>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import { PROJECTS_BY_PEOPLE_TYPE, MAX_PERCENT_BY_PEOPLE_TYPE } from "@/constants";

const value = ref('')
const people_type = ref('')
const donation_value = ref('-')
const show_projects = ref(false)
const selected_projects = ref([])
const is_valid_fields = computed(() => value.value && people_type.value)
const projects = PROJECTS_BY_PEOPLE_TYPE;

// const formatter = new Intl.NumberFormat('en-US', {
//   style: 'currency',
//   currency: 'BRL'
// });

// const parser = value => value.replace(/R\$ [A-Za-z0-9]+/g, '');

watch(people_type, val => {
  donation_value.value = (100 * MAX_PERCENT_BY_PEOPLE_TYPE[val]) / value.value;
  selected_projects.value = [];
})

const calculate = () => {
  if (people_type.value && value.value) {
    donation_value.value = (MAX_PERCENT_BY_PEOPLE_TYPE[people_type.value] / 100) * value.value;
    show_projects.value = true;
  }
};

const on_select = project => {
  if (selected_projects.value.find(p => p.id == project.id)) {
    selected_projects.value = selected_projects.value.filter(p => p.id !== project.id);
  } else {
    selected_projects.value.push({
      ...project,
      donate_value: (project.percent / 100) * donation_value.value
    });
  }
}
</script>
