import styles from './index.module.less'
import classNames from 'classnames';
import { List } from '../editor'

import { useContext } from 'react';


const Blocks = (props: any) => {
  const { style, type, focus, onMousedown } = props
  const componentsList = useContext(List)
  const Component = componentsList[type]
  return (
    <div
      className={classNames(styles.block, focus ? styles['blockFocus'] : '')}
      style={{ ...style }}
      onMouseDown={(e) => onMousedown(e, { ...props })}
    >
      <Component.render {...props}></Component.render>
    </div>
  )
}

export default Blocks