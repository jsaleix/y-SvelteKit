<script lang="ts">
	import { css } from 'styled-system/css';
	import { hstack } from 'styled-system/patterns';

	export let selected = 0;
	export let updateSelected: (index: number) => void;

	const containerStyle = hstack({ gap: 0, w: 'full' });

	const tabDivStyle = hstack({
		width: 'full',
		justifyContent: 'center',
		py: 4,
		cursor: 'pointer',
		transition: '0.5s',
		_hover: {
			bg: 'rgba(255, 255, 255, 0.1)'
		},
		_selected: {
			bg: 'rgba(255, 255, 255, 0.1)'
		}
	});

	const titleStyle = (selected: boolean) =>
		css({
			bg: 'none',
			borderBottom: '1px solid primary',
			color: 'white',
			fontWeight: selected ? 'bold' : 'regular'
		});
</script>

<div class={containerStyle}>
	<div
		class={tabDivStyle + ' group'}
		aria-selected={selected === 0}
		on:click={() => updateSelected(0)}
	>
		<h2 class={titleStyle(selected === 0)}>Tweets</h2>
	</div>
	<div
		class={tabDivStyle + ' group'}
		aria-selected={selected === 1}
		on:click={() => updateSelected(1)}
	>
		<h2 class={titleStyle(selected === 1)}>Tweets & replies</h2>
	</div>
</div>
