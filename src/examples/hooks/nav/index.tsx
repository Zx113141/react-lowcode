
import React, { useContext, useState } from 'react'
import styles from './index.module.less'
import classNames from 'classnames'
import { Popover, Modal, Input, Dropdown, Button } from 'antd'
import Colors from './components/colors';
import { EditorContext, EditorContextProps } from '@/examples/components/editor';
import { langItems, rolesLeft, rolesRight, type Roles, } from '@/configs/buttons';

interface NavProps {
    handleClick: () => void
}

const Nav = (props: NavProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [title, setTitle] = useState('01')
    const [onEditTitle, setOnEditTitle] = useState(false)
    const { theme, configs, language } = useContext<EditorContextProps>(EditorContext)
    console.log('nav 渲染了', theme, configs, language)
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleOk = async () => {
        setIsModalOpen(false)
    }

    const handleOnRolesRight = (role: Roles) => {
        switch (role.key) {
            case 'preview':
                // role.execute(role.key)(setIsModalOpen)
                break;
            case 'release':
                // role.execute(role.key)(setIsModalOpen)
                break;
            case 'lang':
                // role.execute(role.key)(setIsModalOpen)
                break;
            case 'theme':
                // const 
                
                // role.execute(role.key)(setIsModalOpen)
                break;
            case 'colors':
                const execute = role.execute as (key: string) => (params: any) => void
                execute(role.key)(setIsModalOpen)
                break;
            case 'avatar':
                // role.execute(role.key)(setIsModalOpen)
                break;
        }
    }
    return (
        <div className={styles.head}>
            {/* 项目基础操作 */}
            <div className={classNames(styles.headItem, styles.headLeft)}>
                {
                    rolesLeft.map((role: Roles) => (
                        role.info ?
                            <div key={role.key}
                                className={classNames(styles.headItemRoles, styles.headItemRolesLeft)}
                                onClick={() => role.execute(role.key)}>
                                <Popover content={role.info}>
                                    {role.name}
                                </Popover>

                            </div> :
                            role.name
                    ))
                }
            </div>
            {/* 项目名称 */}
            <div className={classNames(styles.headItem, styles.headCenter)}>
                <span>
                    工作空间-
                </span>
                {
                    onEditTitle ? <Input defaultValue={title} onInput={(e: React.FormEvent<HTMLInputElement>) => setTitle(e.target.value)} onBlur={() => setOnEditTitle(!onEditTitle)} style={{ width: 200 }}></Input> : <span onClick={() => { setOnEditTitle(!onEditTitle) }}>{title}</span>
                }
            </div>

            {/* 个人及全局配置 */}
            <div className={classNames(styles.headItem, styles.headRight)}>
                {
                    rolesRight.map((role: Roles) => (
                        <div key={role.key}
                            className={classNames(styles.headItemRoles, styles.headItemRolesLeft)}
                            onClick={() => handleOnRolesRight(role)}>
                            {role.name}

                        </div>
                    ))
                }
            </div>
            <Modal title="主题颜色选择"
                centered
                open={isModalOpen}
                onCancel={handleCancel}
                keyboard
                footer={[]}
                width={1850}
            >
                <div className={styles.color}>
                    <Colors></Colors>
                    <div className={styles.colorCurrent}>
                        <div className={styles.colorCurrentName}>
                            <p>
                                {configs.colors?.title}
                            </p>
                            <p className={styles.colorCurrentNamePinyin}>
                                {configs.colors?.pinyin}
                            </p>
                            <div style={{ width: 60, margin: '0 auto', height: 20, backgroundColor: configs.colors?.hexColor }}>

                            </div>
                        </div>
                        <div className={styles.colorCurrentValue}>
                            占位
                        </div>
                    </div>

                </div>
            </Modal>
        </div>
    )
}

export default React.memo(Nav)