<script lang="ts">
	export let value: any;
	export let label = 'Data';
</script>
  
<details open>
	<summary style="font-weight:bold; cursor:pointer">{label}</summary>
	<pre style="background:#f5f5f5; padding:1rem; overflow:auto">
	  {JSON.stringify(value, (key, val) => 
		typeof val === 'function' ? '[Function]' : 
		val instanceof Map ? { _type: 'Map', value: Array.from(val) } :
		val instanceof Set ? { _type: 'Set', value: Array.from(val) } :
		val, 2)}
	</pre>
</details>