<script lang="ts">
	export let label: string;
	export let value = '';
	export let placeholder = '';
	export let min = 1;
	export let step = '1';
</script>

<label
	>{label}<input
		type="number"
		{min}
		max="1000000"
		{step}
		inputmode={step === '1' ? 'numeric' : 'decimal'}
		{placeholder}
		{value}
		on:input={(e) => (value = e.currentTarget.value)}
	/></label
>
