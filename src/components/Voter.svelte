<script>
  import { createEventDispatcher } from "svelte";
  import { stores } from "@sapper/app";

  const dispatch = createEventDispatcher();

  const { session } = stores();

  export let score = 0;
</script>

<style>
  .voter {
    display: flex;
    flex-direction: column;
  }

  .score {
    text-align: center;
  }
</style>

<div class="voter">
  {#if $session.user}
    <span
      class="upvoter"
      style="cursor: pointer;"
      on:click={() => dispatch('upvote')}>
      <span class="arrow">🔺</span>
    </span>
  {/if}
  <span class="score">{score}</span>
  {#if $session.user}
    <span
      class="upvoter"
      style="cursor: pointer;"
      on:click={() => dispatch('upvote')}>
      <span class="arrow">🔻</span>
    </span>
  {/if}
</div>
