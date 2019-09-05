<template>
    <div class="login">
        aaaaaaaa
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {

            }
        },
        mounted(){
            this.$axios.get('/users').then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
