<script>
	import { css } from 'styled-system/css';
	import { vstack } from 'styled-system/patterns';
</script>

<div class={vstack({ borderLeft: '1px solid gray', w: '15%', p: '5em' })}>
	<input
		placeholder="yo"
		class={css({ rounded: 'xl', bg: 'gray', p: 2, color: 'black', outline: 'none' })}
	/>
</div>
