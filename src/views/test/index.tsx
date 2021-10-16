import { defineComponent } from 'vue'
import './index.less'
import Test from '../../components/Test'

export default defineComponent({
    name: 'test',
    props: {
        name: {
            type: String,
            required: true
        }
    },
    setup(props) {
        return () => (
            <>
                <Test />
                <div class={'a'}>{props.name}测试内容</div>
            </>
        )
    }
})
