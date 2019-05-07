
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class redirect extends Vue{
 private beforeCreate () {
   const {params,query}:any = this.$route
   const {path}:any = params
   this.$router.replace({path:'/' + path,query})
 } 

 private render(h:any){
   return h() // avoid warning message
 }
}
</script>
