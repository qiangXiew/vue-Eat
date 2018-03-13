<template>
    <div>
        <h1>home{{ msg }}</h1>
        <p>{{$route.params.id}}</p>
    </div>
</template>
<script>
export default {
  data() {
    return {
      msg: 'hi'
    };
  }
};
</script>
