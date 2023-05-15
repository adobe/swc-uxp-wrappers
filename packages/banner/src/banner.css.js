import { unsafeCSS } from '@spectrum-web-components/base';
import styles from '@swc-uxp-internal/banner/src/banner.css.js';

import uxpStyles from './uxp-banner.css.js';

const finalStyles = unsafeCSS(styles.toString(), uxpStyles.toString());

export default finalStyles;
