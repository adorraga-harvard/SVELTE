<script lang="ts">
	/**
	 * This component is auto-generated.
	 * Props are defined in the 'props' object below.
	 */

	// A single export 'props' for easy management.
	export let props = {
		customClass: '',
		faqItems: [] as { question: string; answer: string }[] // Added type for better safety
	};
</script>

<div class="project-card">
	<div class="project-card-body">
		<h2 class="card-title">Frequently Asked Questions</h2>
		<div class="join join-vertical w-full">
			{#if props.faqItems && props.faqItems.length > 0}
				{#each props.faqItems as faq, i}
					<div class="collapse collapse-arrow join-item border border-base-200">
						<!-- THE FIX: Corrected the boolean attribute syntax -->
						<input type="radio" name="faq-accordion" checked={i === 0} />
						<div class="collapse-title text-md font-medium">{faq.question}</div>
						<div class="collapse-content project-prose">
							<p>{@html faq.answer}</p>
						</div>
					</div>
				{/each}
			{:else}
				<div class="text-center p-8 text-base-content/50">No FAQs published yet.</div>
			{/if}
		</div>
	</div>
</div>
