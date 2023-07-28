<script lang="ts">
	import { css } from 'styled-system/css';
	import { vstack } from 'styled-system/patterns';
</script>

<div>
	<div>
		<h1 class={css({ fontSize: 'xl' })}>Log in on Y</h1>
		<form method="POST" class={vstack({})}>
			<input type="text" name="username" placeholder="Username" class={css({})} />
			<input type="password" name="password" placeholder="Password" class={css({})} />
			<input type="submit" value="Log in" />
		</form>
	</div>
</div>
