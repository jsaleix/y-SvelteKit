<script lang="ts">
	import TweetListItem from '$lib/components/tweet/TweetListItem.svelte';
	import { css } from 'styled-system/css';
	import { hstack, vstack } from 'styled-system/patterns';
	import { fade, fly } from 'svelte/transition';
	import type { PageServerData } from './$types';

	let selected = 1;

	export let data: PageServerData;

	const { tweets } = data;
</script>

<svelte:head>
	<title>Home / Y</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class={css({ w: 'full', fontSize: 'xl', position: 'relative' })}>
	<div
		class={vstack({
			position: 'sticky',
			top: '0',
			left: '0',
			w: 'full',
			bg: 'none',
			gap: '0'
		})}
	>
		<h2 class={css({ p: 3, fontWeight: 'bold', fontSize: 'xl', w: 'full', bg: 'black' })}>Home</h2>
		<div
			class={hstack({
				opacity: '0.8',
				borderBottom: '1px solid gray',
				w: 'full'
			})}
		>
			<div
				on:click={() => (selected = 0)}
				aria-selected={selected === 0}
				class={hstack({
					py: 2,
					flex: '1',
					h: 'full',
					w: 'full',
					justifyContent: 'center',
					cursor: 'pointer',
					color: 'gray',
					_selected: { color: 'white', fontWeight: 'bold' },
					_hover: { color: 'white', bg: '#252525' }
				})}
			>
				<p class={css({ fontSize: 'lg', bg: 'none' })}>For You</p>
			</div>
			<div
				on:click={() => (selected = 1)}
				aria-selected={selected === 1}
				class={hstack({
					py: 2,
					flex: '1',
					h: 'full',
					w: 'full',
					justifyContent: 'center',
					cursor: 'pointer',
					color: 'gray',
					_selected: { color: 'white', fontWeight: 'bold' },
					_hover: { color: 'white', bg: '#252525' }
				})}
			>
				<p class={css({ fontSize: 'lg', bg: 'none' })}>Following</p>
			</div>
		</div>
	</div>
	<div class={css({ p: 3 })}>
		{#if selected === 0}
			<div
				in:fly={{ y: 20, duration: 1000 }}
				out:fade
				class={css({ display: 'flex', flexDirection: 'column' })}
			>
				<h1>
					to your new<br />SvelteKit app
				</h1>

				<h2>
					try editing <strong>src/routes/+page.svelte</strong>
				</h2>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse auctor vel risus ac efficitur.
				Nam bibendum elit at tempus interdum. Vivamus scelerisque sem ut posuere semper. Aliquam erat
				volutpat. Curabitur a ullamcorper quam. Vestibulum dictum libero augue, vel ullamcorper neque
				sodales et. Cras auctor, dui nec laoreet sagittis, orci justo sodales enim, eu elementum tortor
				libero quis nunc. Proin lacus nibh, accumsan et sodales quis, mollis non ipsum. Maecenas id tellus
				posuere, rutrum enim et, facilisis diam. Fusce ut lacus et arcu sollicitudin consequat at rutrum
				massa. Morbi iaculis velit non urna ullamcorper fermentum. Quisque lectus massa, posuere sit
				amet tempor in, ornare eu ligula. Duis blandit neque eros. Donec consequat neque arcu, a hendrerit
				ipsum lacinia ac. Vivamus tempor lacus eu sem dapibus semper. Integer eu mollis ante. Proin in
				libero erat. Vestibulum feugiat volutpat nisl vel porttitor. Fusce ipsum urna, vestibulum in
				suscipit eget, gravida at ex. Vivamus posuere felis accumsan arcu tincidunt, a dapibus justo
				mollis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
				Mauris in semper tellus. Cras ac convallis diam. Cras sodales consequat arcu eu commodo. Duis
				in euismod nibh, id venenatis metus. Nunc suscipit ornare massa vel eleifend. Aliquam quis massa
				vel justo tempor tincidunt id et lectus. Mauris vitae sem id augue tristique laoreet sed sit
				amet ligula. Pellentesque ornare arcu vitae magna tincidunt, ac consectetur velit feugiat. Duis
				suscipit nisl purus. Curabitur a odio sagittis, maximus quam ut, ultricies libero. Nulla facilisi.
				Aenean nunc metus, vulputate eget pharetra eu, consequat in turpis. Morbi neque quam, pulvinar
				ac velit nec, bibendum iaculis orci. Nulla aliquet eu diam vel pretium. Suspendisse eleifend
				pulvinar sodales. Donec fermentum urna ut tincidunt rutrum. Suspendisse eu lacus porta, rutrum
				mi id, finibus lacus. Pellentesque sit amet laoreet nulla. Nunc tincidunt auctor urna, eu interdum
				erat bibendum at. Praesent laoreet pharetra velit id porta. Fusce dapibus quam quis risus consectetur,
				vitae sollicitudin tellus consequat. Donec id efficitur eros, at accumsan sem. Aliquam pretium
				diam vitae enim rutrum tincidunt. Pellentesque sollicitudin lectus vel ultrices posuere. Aenean
				sit amet justo et magna convallis scelerisque. Quisque faucibus molestie quam a luctus. Praesent
				in tristique diam. Sed nec varius mauris. Nulla convallis, quam a vulputate rutrum, sapien mauris
				consequat augue, vitae feugiat nisl enim non urna. Integer urna ipsum, vulputate a ex eget, vestibulum
				tempus leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
				egestas. Donec posuere eget ipsum sed lacinia. Suspendisse sed nisl ac lorem placerat suscipit.
				Proin tempor nibh nec finibus dapibus. Aliquam consectetur sed augue quis dictum. Donec eu lectus
				quam. Quisque congue mauris leo, et accumsan eros ultrices sed. Fusce sodales a massa a mollis.
				Curabitur dolor dui, vestibulum ac bibendum in, porttitor at massa. Vivamus feugiat, odio eget
				commodo ornare, tortor ex fermentum orci, dapibus tristique est mi eget ante. Nam dignissim odio
				a ante commodo, a malesuada nibh convallis. Donec enim lorem, congue id sodales ac, pellentesque
				et sem. Integer ac scelerisque tortor, sed placerat enim. Nam et felis sapien. Morbi mattis facilisis
				mi, pharetra auctor orci dignissim in. Ut massa tellus, cursus sed egestas at, malesuada ut nunc.
				Morbi non vehicula magna, rhoncus ornare nisl. Quisque congue interdum erat. Donec felis lorem,
				vulputate nec ex vitae, tristique pretium augue. Nullam sodales neque diam, id varius ex dapibus
				vel. Etiam non pretium lorem. In at ante tincidunt, viverra ligula eget, tincidunt odio. Vestibulum
				lacinia elit purus, at viverra lectus tempor in. Sed varius pulvinar urna placerat efficitur.
				Nulla id neque hendrerit, porttitor elit vel, feugiat risus. Pellentesque euismod dapibus sem.
				Duis tempus eget neque eget rhoncus. Mauris ac magna aliquam, sagittis nulla a, vulputate magna.
				Nunc molestie ante sit amet pretium malesuada. Maecenas auctor eu elit sed volutpat. Duis id
				condimentum arcu, quis semper neque. Aliquam erat volutpat. Duis tempor mauris et tortor venenatis,
				quis accumsan neque sollicitudin. Curabitur nec ligula nec nibh ultrices commodo ac vitae quam.
				Sed consequat nisl eget elementum semper. Aenean nisl arcu, molestie eu purus tristique, porta
				auctor neque. Donec laoreet felis vel erat tempus ullamcorper. Donec ut mi ut ex eleifend venenatis.
				Nullam et lorem eget nisl vehicula hendrerit id malesuada dolor. Maecenas rutrum faucibus mi,
				sit amet vestibulum tortor. Pellentesque eu lacinia sapien. Phasellus mollis ex sit amet tellus
				lobortis pharetra condimentum sed velit. Etiam tortor elit, aliquet condimentum bibendum sed,
				cursus vel mauris. Curabitur pellentesque porttitor est, nec interdum urna volutpat quis. Sed
				laoreet cursus ante sed suscipit. Curabitur nec vehicula sapien. Pellentesque et urna molestie,
				dapibus enim vitae, feugiat nisl. Nunc sapien quam, faucibus vitae felis eget, vulputate dapibus
				velit. Nulla felis tortor, porttitor ac venenatis id, dapibus at est. Integer consequat lorem
				ut orci blandit hendrerit. Duis efficitur eleifend eros vitae venenatis. Nam orci mauris, eleifend
				ut interdum sit amet, tincidunt in nunc. Vestibulum sagittis justo fermentum nulla imperdiet,
				vel imperdiet ante gravida. Pellentesque ornare metus in quam ullamcorper, placerat cursus eros
				malesuada. Sed molestie mi sed lacus vestibulum, a vehicula velit efficitur. Interdum et malesuada
				fames ac ante ipsum primis in faucibus. Suspendisse potenti. Vestibulum porta mattis pretium.
				Nam sit amet efficitur magna, vitae consequat ante. Duis in pulvinar turpis. Nulla porta, nibh
				eget sollicitudin pellentesque, enim ex congue lacus, ut malesuada lectus nisi quis dolor. Vivamus
				vel lectus dignissim, finibus risus quis, volutpat tortor. Praesent ut hendrerit sem. Phasellus
				ac tincidunt leo.
			</div>
		{/if}

		{#if selected === 1}
			<div
				in:fly={{ y: 20, duration: 1000 }}
				out:fade
				class={css({ display: 'flex', flexDirection: 'column' })}
			>
				{#if !tweets || tweets.length === 0}
					<div>No tweets yet</div>
				{:else}
					{#each tweets as tweet}
						<TweetListItem {tweet} />
					{/each}
				{/if}
			</div>
		{/if}
	</div>
</section>
