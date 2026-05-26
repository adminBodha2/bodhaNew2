<script lang="ts">
  type Severity = 'critical' | 'high' | 'medium' | 'low';

  let { severity }: { severity: Severity } = $props();
</script>

<span class={`sev ${severity}`}>{severity.toUpperCase()}</span>

<span class={cls}>{label}</span>

<style>
  .sev {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.5px;
    padding: 2px 8px;
    border-radius: 4px;
    text-transform: uppercase;
  }
  .critical { background: #ef4444; color: white; }
  .high     { background: #f59e0b; color: #1f2937; }
  .medium   { background: #eab308; color: #1f2937; }
  .low      { background: #64748b; color: #e6e8ec; }
</style>
