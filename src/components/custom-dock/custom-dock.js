import React, { PureComponent } from 'react'
import Dock from 'react-dock';

export default class CustomDock extends PureComponent {
    render() {
        const { children, position, isVisible, size, zIndex } = this.props;
        return (
            <Dock position={position || 'right'} isVisible={isVisible || true} size={size || 0.5} zIndex={zIndex || 200} isVisible={true}>
                {children}
            </Dock>
        )
    }
}