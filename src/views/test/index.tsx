import { defineComponent } from 'vue'
import './index.less'
import Test from '../../components/Test'
import test from '@/assets/imgs/test.png'
import logo from '@/assets/imgs/logo.png'

export default defineComponent({
    name: 'test',
    props: {
        name: {
            type: String
        }
    },
    setup(props) {
        return () => (
            <>
                <Test />
                <img src={test} />
                <img src={logo} />
                <div class={'a'}>{props.name}测试内容</div>
            </>
        )
    }
})
