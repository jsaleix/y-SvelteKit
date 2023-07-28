<script lang="ts">
	import { css } from 'styled-system/css';
	import { hstack, vstack } from 'styled-system/patterns';
</script>

<div
	class={hstack({
		rounded: '2xl',
		p: 2,
		w: 'full',
		bg: 'transparent',
		overflow: 'hidden',
		_hover: {
			cursor: 'pointer',
			bg: 'gray:400'
		}
	})}
>
	<div class={css({ overflow: 'hidden', borderRadius: '45px', h: '45px', w: '45px' })}>
		<img
			class={css({ w: 'full', h: 'full', objectFit: 'cover' })}
			src="https://images.unsplash.com/photo-1690552404017-8f262bf8658b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
			alt="Profile"
		/>
	</div>
	<div class={vstack({ bg: 'none', gap: 0, alignItems: 'start', w: '60%', maxW: '60%' })}>
		<h3 class={css({ fontSize: 'sm', bg: 'none', m: 0, p: 0, fontWeight: 'bold' })}>Username</h3>
		<p class={css({ fontSize: 'sm', bg: 'none', m: 0, p: 0, color: 'gray' })}>@YourPseudo</p>
	</div>
</div>
