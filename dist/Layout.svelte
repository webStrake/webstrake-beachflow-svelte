<script>export let styles = {};
</script>
  
  <div class="layout-container flex flex-col h-screen overflow-hidden {styles.container || ''}">
    {#if $$slots.header}
      <header class="layout-header flex-shrink-0 {styles.header || ''}">
        <slot name="header" />
      </header>
    {/if}
  
    <div class="layout-body flex flex-1 overflow-hidden">
      {#if $$slots.sidebarLeft}
        <aside class="layout-sidebar-left flex-shrink-0 overflow-y-auto {styles.sidebarLeft || ''}">
          <slot name="sidebarLeft" />
        </aside>
      {/if}
  
      <main class="layout-main flex flex-col flex-1 overflow-hidden {styles.main || ''}">
        {#if $$slots.pageHeader}
          <div class="layout-page-header flex-shrink-0 {styles.pageHeader || ''}">
            <slot name="pageHeader" />
          </div>
        {/if}
  
        <div class="layout-page-content flex-1 overflow-y-auto {styles.pageContent || ''}">
          <slot />
        </div>
  
        {#if $$slots.pageFooter}
          <div class="layout-page-footer flex-shrink-0 {styles.pageFooter || ''}">
            <slot name="pageFooter" />
          </div>
        {/if}
      </main>
  
      {#if $$slots.sidebarRight}
        <aside class="layout-sidebar-right flex-shrink-0 overflow-y-auto {styles.sidebarRight || ''}">
          <slot name="sidebarRight" />
        </aside>
      {/if}
    </div>
  
    {#if $$slots.footer}
      <footer class="layout-footer flex-shrink-0 {styles.footer || ''}">
        <slot name="footer" />
      </footer>
    {/if}
  </div>