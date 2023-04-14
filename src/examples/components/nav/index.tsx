
import React, { useState } from 'react'
import styles from './index.module.less'
import classNames from 'classnames'
import { Popover, Modal, Input, Dropdown, Button } from 'antd'
interface NavProps {
    handleClick: () => void
}


const Nav = (props: NavProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [onEditTitle, setOnEditTitle] = useState(false)
    const langItems = [
        {
            key: '1',
            label: (
                <p>
                    中文
                </p>
            ),
        },
        {
            key: '2',
            label: (
                <p>
                    English
                </p>
            ),
        },
    ]
    const rolesLeft = [
        {
            key: 'home',
            name: '主页',
            info: '返回主页',
            execute: (key: string) => handleHome(key)
        },
        {
            key: 'chart',
            name: '图表',
            info: '图表组件',
            execute: (key: string) => function (key: string) { }
        },
        {
            key: 'layout',
            name: '图层',
            info: '图层控制',
            execute: (key: string) => function (key: string) { }
        },
        {
            key: 'options',
            name: '配置',
            info: '配置设置',
            execute: (key: string) => function (key: string) { }
        },
        {
            key: 'setting',
            name: '基本设置',
            info: '设置',
            execute: (key: string) => function (key: string) { }
        },
        {
            key: 'null',
            name: '|',
            execute: (key: string) => function (key: string) { }
        },
        {
            key: 'left',
            name: '<',
            info: '前进',
            execute: (key: string) => function (key: string) { }
        },
        {
            key: 'right',
            name: '>',
            info: '撤回',
            execute: (key: string) => function (key: string) { }
        },
    ]

    const rolesRight = [
        {
            key: 'preview',
            name: '预览',
            execute: (key: string) => handleHome(key)
        },
        {
            key: 'release',
            name: '发布',
            execute: (key: string) => handleHome(key)
        },
        {
            key: 'lang',
            name: <Dropdown menu={{ items: langItems }} placement="bottomLeft">
                <Button size='small'>Text</Button>
            </Dropdown>,
            execute: (key: string) => handleHome(key)
        },

        {
            key: 'theme',
            name: '颜色',
            execute: (key: string) => handleHome(key)
        },
        {
            key: 'colors',
            name: '颜色',
            execute: (key: string) => handleHome(key)
        },
        {
            key: 'avatar',
            name: <img width='30px' height='100%'></img>,
            execute: (key: string) => handleHome(key)
        },
    ]


    const beforClose = async () => {

        return new Promise((resolve, reject) => {
            resolve(1)
        })
    }
    const handleHome = async (key) => {
        setIsModalOpen(true)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleOk = async () => {
        const isClose = await beforClose()
        console.log(isClose)
        setIsModalOpen(false)
    }
    return (
        <div className={styles.head}>
            {/* 项目基础操作 */}
            <div className={classNames(styles.headItem, styles.headLeft)}>
                {
                    rolesLeft.map(role => (
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
                    onEditTitle ? <Input defaultValue={'01'} onBlur={() => setOnEditTitle(!onEditTitle)} style={{ width: 200 }}></Input> : <span onClick={() => setOnEditTitle(!onEditTitle)}>01</span>
                }
            </div>

            {/* 个人及全局配置 */}
            <div className={classNames(styles.headItem, styles.headRight)}>
                {
                    rolesRight.map(role => (
                        <div key={role.key}
                            className={classNames(styles.headItemRoles, styles.headItemRolesLeft)}
                            onClick={() => role.execute(role.key)}>
                            {role.name}

                        </div>
                    ))
                }
            </div>
            <Modal title="确认离开吗？" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>请保存当前页面</p>
            </Modal>
        </div>
    )
}

export default Nav