import React, { PureComponent } from 'react'
import Dock from 'react-dock';

export default class CustomDock extends PureComponent {
    render() {
        const { children, position, isVisible, size, zIndex, dimMode } = this.props;
        return (
            <Dock
                dimMode={dimMode || 'none'}
                position={position || 'right'}
                isVisible={isVisible || true}
                defaultSize={size || 0.5}
                zIndex={zIndex || 200}
                isVisible={true}
                dockStyle={{
                    position: 'fixed',
                    zIndex: 1,
                    boxShadow: 'rgba(0, 0, 0, 0.23) -0.5px 0px 10px 1px',
                    background: 'rgb(244, 248, 250)',
                    left: 0,
                    top: 50,
                    overflow: 'hidden'
                }}
            >
                {children}
            </Dock>
        )
    }
}