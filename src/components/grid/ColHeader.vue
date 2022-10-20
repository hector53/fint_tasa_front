<template>
    <div place="center start" 
        type="column"
     class="colHeaderGridStyle"
     :style="{'grid-area': gridArea, 'place-self':  placeSelf}"
     >
      <div>
          {{title}}
      </div>
    </div>
  </template>
  
  <script>
  export default {
      props:["gridArea", "placeSelf", "title"],
      data() {
      return {
         
      }
      }
  };
  </script>
  
  <style></style>
  