import React from 'react';
import { View, StyleSheet} from 'react-native';
import { Svg, Defs, Rect, Mask, Circle, Path } from 'react-native-svg';

const CameraOverlay = props => {

    return(
    <View style={style.container}>
        <Svg height="350" width="350" viewBox="0 0 350 350" aspectRatio={2}>
            <Defs>
                <Mask id="mask" x="0" y="0" height="100%" width="100%">
                    <Rect height="100%" width="100%" fill="#fff" />
                    <Rect x="55" y="55" height="240" width="240" fill=""/>
                </Mask>
            </Defs>
            <Rect height="100%" width="100%" fill="rgba(0, 0, 0, 0.7)" mask="url(#mask)" fill-opacity="0" />
            <Rect x="55" y="55" height="240" width="240" stroke={props.scanned? "#DC143C": "#7FFF00"} strokeWidth="2"/>
        </Svg>
    </View>
    )
};

const style=StyleSheet.create({
    container: {
        aspectRatio: 2,
    }
})

export default CameraOverlay