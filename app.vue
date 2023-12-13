<template>
  <div class="wrapper">
    <span class="message">ボタンは全て気軽に押せます</span>
    <div class="operationArea">
      <button @click="generate">セッション生成</button>
      <button @click="regenerate">セッション再生成</button>
      <button @click="reload">セッション更新</button>
      <button @click="destroy">セッション破棄</button>
      <p>
        key:<input type="text" v-model="sessionDataKey">
        value:<input type="text" v-model="sessionDataValue">
        <button @click="register" :disabled="!sessionDataKey">セッションデータ登録</button>
      </p>
      <button @click="countUp">countUp(連打用)</button>
      <button @click="fetchSessionData">セッションデータ取得(手動)</button>
      <button @click="fetchRedisData">Redisデータ取得(手動)</button>
      <button @click="flushRedisData">Redisクリア(直後に現在のセッション情報で更新)</button>
    </div>
    <div class="displayArea">
      <div class="sessionDataArea">
        <div class="header">Session</div>
        <div class="data">{{ sessionData }}</div>
      </div>
      <div class="redisDataArea">
        <div class="header">Redis</div>
        <div class="data">{{ redisData }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

const sessionDataKey: globalThis.Ref<string> = ref("");
const sessionDataValue: globalThis.Ref<string> = ref("");
const sessionData: globalThis.Ref<string> = ref("ここにセッションのデータを表示します");
const redisData: globalThis.Ref<string> = ref("ここにRedisのデータを表示します");

//各APIの呼び出し後にデータを取得し直す
const post = async (endpoint: string, body: { key: string, value: string } | undefined = undefined) => {
  await useFetch(endpoint, { method: 'post', body: body });
  fetchSessionData();
  fetchRedisData();
}

//セッションID生成
const generate = (): Promise<void> => post('/api/session/generate');
//セッションID再生成
const regenerate = (): Promise<void> => post('/api/session/regenerate');
//セッション更新
const reload = (): Promise<void> => post('/api/session/reload');
//セッション破棄
const destroy = (): Promise<void> => post('/api/session/destroy');
//セッションデータ登録
const register = (): Promise<void> => post('/api/session/register', { key: sessionDataKey.value, value: sessionDataValue.value });
//countUp
const countUp = (): Promise<void> => post('/api/session/countUp');

//セッションリポジトリーにある内容ができるか

//セッションデータを取得する
const fetchSessionData = async () => {
  const { data } = await useFetch('/api/session/data', { method: 'post' });
  sessionData.value = JSON.stringify(data.value, null, 2);
};

//Redisのデータを全て取得する
const fetchRedisData = async () => {
  const { data } = await useFetch("/api/redis/data", { method: 'post' });
  redisData.value = JSON.stringify(data.value, null, 2);
}

//Redisのデータをクリアする
const flushRedisData = async () => post('/api/redis/flush');

</script>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
}
.wrapper .message{
  color: #353535;
  font-size: 13px;
}
.wrapper .operationArea {
  padding: 8px;
  border: solid 1px #bababa;
}

.wrapper .displayArea {
  display: flex;
  white-space: pre;
  min-height: 400px;
}

.wrapper .displayArea div {
  margin: 1px;
}

.wrapper .displayArea .sessionDataArea {
  flex-grow: 1;
  padding: 8px;
  border: solid 1px #0852f0;
}

.wrapper .displayArea .sessionDataArea .header {
  font-weight: bold;
  border-bottom: solid 1px #0852f0;
}

.wrapper .displayArea .redisDataArea {
  flex-grow: 1;
  padding: 8px;
  border: solid 1px #f0082f;
}

.wrapper .displayArea .redisDataArea .header {
  font-weight: bold;
  border-bottom: solid 1px #f0082f;
}

button {
  margin: 0 4px;
}
</style>