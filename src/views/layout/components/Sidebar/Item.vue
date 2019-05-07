<script lang="ts">
import { Component, Vue ,Prop} from "vue-property-decorator";

@Component({name:'MenuItem'})
export default class MenuItem extends Vue{
  @Prop(String) icon!:any
  @Prop(String) title!:any

  private render(h:any,context:any){
    const {icon,title} = context.props
    const vnodes:any[] = []
    if(icon){
      vnodes.push(<svg-icon icon-class={icon}/>)
    }
    if(title){
      vnodes.push(<span slot='title'>{{title}}</span>)
    }
  }
}
</script>
