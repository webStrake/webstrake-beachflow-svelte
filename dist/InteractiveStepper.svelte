<script>export let steps;
export let currentStep;
export let isStepComplete;
</script>

<div class="stepper-container">
	{#each steps as step, index}
		{@const isCompleted = index < currentStep}
		{@const isActive = index === currentStep}
		<div class="step-item">
			<div
				class="step-circle"
				class:active={isActive}
				class:completed={isCompleted}
                class:material-symbols-rounded={isCompleted}
			>
				{isCompleted ? 'check':index + 1}
			</div>
			<div
				class="step-label"
				class:active={isActive}
				class:completed={isCompleted}
			>
				{step}
			</div>
			{#if index < steps.length - 1}
				<div class="step-connector" class:completed={isCompleted}></div>
			{/if}
		</div>
	{/each}
</div>
