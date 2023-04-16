
import data from '@/configs/data.json'
import Editor from './examples/components/editor'
import style from './app.module.less'
import { componentsList } from '@/packages'

function App() {

  return (

    <div className={style.app} >
      <Editor widgetList={componentsList} data={data}>

      </Editor>
    </div>
  )
}
export default App
