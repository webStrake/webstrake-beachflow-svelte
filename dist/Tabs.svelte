<script>export let tabs = [];
export let activeTab = tabs[0]?.id || "";
export let color = "primary";
let tabsContainer;
function setActiveTab(tabId) {
  activeTab = tabId;
}
$: if (tabsContainer && activeTab) {
  const activeTabElement = tabsContainer.querySelector(`[data-tab-id="${activeTab}"]`);
  if (activeTabElement) {
    const { offsetLeft, offsetWidth } = activeTabElement;
    const indicator = tabsContainer.querySelector(".tab-indicator");
    indicator.style.left = `${offsetLeft}px`;
    indicator.style.width = `${offsetWidth}px`;
  }
}
</script>

<div class="fluid-tabs-container {color}" bind:this={tabsContainer}>
  {#each tabs as tab}
    <button
      class="tab-item"
      class:active={activeTab === tab.id}
      on:click={() => setActiveTab(tab.id)}
      data-tab-id={tab.id}
    >
      {tab.label}
    </button>
  {/each}
  <div class="tab-indicator"></div>
</div>

<div class="tab-content">
  <slot {activeTab}></slot>
</div>