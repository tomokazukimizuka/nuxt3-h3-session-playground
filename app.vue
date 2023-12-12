<template>
  <div>
    <a href="/init">init</a><br /><br />
    <p>セッションID: {{ sessionId }}</p>
    <button @click="regenerate">セッション生成</button>
    <button @click="destroy">セッション破棄</button>
    <button @click="data">セッションデータ取得</button>
    <p>key:<input type="text" v-model="sessionDataKey"></p>
    <p>value:<input type="text" v-model="sessionDataValue"></p>
    <button @click="register">セッションデータ登録</button>
    <button @click="issue">issue</button>
  </div>
</template>
<script lang="ts" setup>

const sessionId: globalThis.Ref<string> = ref("");
const sessionDataKey: globalThis.Ref<string> = ref("");
const sessionDataValue: globalThis.Ref<string> = ref("");

//セッションを生成してIDを取得して表示する
const regenerate = async () => {
  const { data } = await useFetch('/api/session/regenerate', { method: 'post' });
  sessionId.value = data.value;
};

//セッションを破棄する
const destroy = async () => {
  const { data } = await useFetch('/api/session/destroy', { method: 'post' });
  sessionId.value = data.value;
};

//セッションデータを取得する
const data = async () => {
  const { data } = await useFetch('/api/session/data', { method: 'post' });
  console.log(data.value);
};

//セッションデータを登録する
const register = async () => {
  await useFetch('/api/session/register', {
    method: 'post', body: {
      key: sessionDataKey.value,
      value: sessionDataValue.value
    }
  });
};

const issue = async () => {
  const { data } = await useFetch('/api/session/issue', { method: 'post' });
  console.log(data.value.num);
};


</script>