<template>
  <div place="start" aria-label="strategies summary"
   class="rowHeaderGridStyle" type="row"
   :style="{'grid-area': gridArea, 'place-self':  placeSelf, 'position': position}"
   >
    <div>
        {{title}}<small>{{subtitle}}</small>
    </div>
  </div>
</template>

<script>
export default {
    props:["gridArea", "placeSelf", "title", "subtitle", "position"],
    data() {
    return {
       
    }
    }
};
</script>

<style></style>
