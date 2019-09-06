<template>
    <div class="login" ref="login">
        <canvas
            id="canvas"
            ref="canvas"
            :width="canvasWidth"
            :height="canvasHeight">
        </canvas>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                canvasWidth: 0,
                canvasHeight: 0
            }
        },
        mounted(){
            // this.$axios.get('/users').then(res=>{
            //     console.log(res)
            // }).catch(err=>{
            //     console.log(err)
            // })
            this.canvasWidth = this.$refs.login.getBoundingClientRect().width;
            this.canvasHeight = this.$refs.login.getBoundingClientRect().height;
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .login{
        width: 100%;
        height: 100%;
        #canvas{
            display: block;
        }
    }
</style>
