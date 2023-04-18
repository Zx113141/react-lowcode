

export const Resize = () => {

    const resizeWidget = [
        {
            key: 'lt',
            position:{
                left:0,
                top:0
            },
        },
        {
            key: 'rt',
            position:{
                right:0,
                top:0
            },
        },
        {
            key: 'lb',
            position:{
                left:0,
                bottom:0
            },
        },
        {
            key: 'rb',
            position:{
                right:0,
                bottom:0
            },
        }
    ]
    return (
        <>
         {
            resizeWidget.map((widget) => {
                return (
                    <div style={{position:'absolute', ...widget.position}} key={widget.key} >

                    </div>
                )
            })
         }
        </>
    )
}