
import data from '@/configs/data.json'
import Editor from './examples/components/editor'
import style from './app.module.less'
import { componentsList } from '@/packages'
function App() {

  return (

    <div className={style.app} >
      <Editor widgetList={componentsList} >

      </Editor>
    </div>
  )
}
export default App
