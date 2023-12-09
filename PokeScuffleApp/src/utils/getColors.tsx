import { getColors } from 'react-native-image-colors'

const DEFAULT_COLOR = '#f44336'

export const getImageColors = async (uri: string) => {
    if (uri.length === 0) {
        return [DEFAULT_COLOR, DEFAULT_COLOR];
    }
    try {
        const colors = await getColors(uri, {
            fallback: DEFAULT_COLOR
        });

        let primary: string, secondary: string;

        if (colors.platform === 'android') {
            primary = colors.dominant;
            secondary = colors.darkMuted;
        } else if (colors.platform === 'ios') {
            primary = colors.primary;
            secondary = colors.secondary;
        }
        return [primary, secondary];
    } catch (error) {
        console.error('Error fetching image colors:', error);
        return [DEFAULT_COLOR, DEFAULT_COLOR];
    }
}