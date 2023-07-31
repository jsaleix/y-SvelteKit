import { cva } from 'styled-system/css';

export const button = cva({
	base: {
		bg: 'primary',
		w: 'full',
		rounded: '2xl',
		py: '2',
		px: 5,
		textTransform: 'capitalize',
		transition: '0.2s',
		fontWeight: 'bold',
		userSelect: 'none',
		_disabled: {
			bg: 'gray',
			cursor: 'not-allowed'
		},
		_focus: {
			opacity: 0.75,
			color: 'white'
		},
		_hover: {
			opacity: 0.75,
			cursor: 'pointer'
		}
	},
	variants: {
		size: {
			sm: {
				fontSize: 'sm'
			},
			md: {
				fontSize: 'md'
			},
			lg: {
				fontSize: 'lg'
			}
		},
		width: {
			full: {
				w: 'full'
			},
			auto: {
				w: 'auto'
			}
		},
		color: {
			primary: {
				bg: 'primary'
			},
			danger: {
				bg: 'red'
			}
		}
	},
	defaultVariants: {
		size: 'sm',
		width: 'full',
		color: 'primary'
	}
});
