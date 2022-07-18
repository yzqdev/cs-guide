<template>
  <h3>css demo</h3>
  <div class=" css-demo">

    <div class="css-block">

      <div class="left-select" :class="[active==index?'active':'']" v-for="(item,index) in cssList"
           @click="setActive(index)">
       <pre>
        <code> {{ setCss(item) }}</code>
       </pre>
      </div>
    </div>
    <div class="  sample">
      <div v-if="!image" class="rect"  :style="style">
      <span class="font" v-if="showFont">This is css demo</span></div>
      <div v-if="image"   :style="style"><img :src="image" /></div>
    </div>
  </div>


</template>

<script setup lang="ts">
import {defineProps,ref,onBeforeMount} from 'vue'
let props = defineProps(['cssList','image','showFont'] )
let style = ref({})
let active = ref(false)

function setActive(index) {
  active.value = index
  style.value = props.cssList[index]
}


function setCss(item:  any) {

  console.log(item )
  return Object.keys(item)[0] + ":" + Object.values(item)[0]
}

onBeforeMount(() => {
  style.value = props.cssList[0]
})
</script>
<style lang="scss" scoped>
.css-demo {
  border: 1px solid #cdcdcd;
  display: flex;

}

.css-block {
  width: 100%;
}

.flex-1 {

}

.left-select {
  cursor: pointer;

  transition: all .5s;

  align-items: center;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;

  margin: 0.5rem;
  width: 100%;
  border: 1px solid #cdcdcd;
  border-radius: 0.25rem;
  pre{
    display: flex;
    justify-content: center;
    margin:1rem 0;padding:0;
  }
}

.left-select.active {
  border-color: #0085f2;
  box-shadow: 0px 0px 0px 3px rgba(0, 144, 237, 0.4);
}

@keyframes slidein {
  from {
    font-size: 12px;
    border: 2px solid red;
  }
  to{
    border: 2px solid yellow;
    font-size: 30px;
  }
}
.sample {
  width: 100%;
  
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  .font{
    font-size:2rem;
  }
img{
  width: 6rem;
}
  .rect {

    margin: 20px;
    background:#cdcdcd;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
}
.exp{
  animation: slidein 3s infinite;
}
</style>
